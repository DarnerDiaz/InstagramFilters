import { IGUser } from './types';

/**
 * Extracts Instagram user data from the Instagram web interface
 */
export class InstagramScraper {
  /**
   * Get current authenticated user's following list
   */
  static async getFollowingList(): Promise<IGUser[]> {
    const following: IGUser[] = [];
    const processedIds = new Set<string>();

    try {
      // Navigate to following list
      const followingButton = document.querySelector('a[href*="/following"]');
      if (!followingButton) {
        throw new Error('Could not find following list. Make sure you\'re on your profile page.');
      }

      // Get modal or list container
      const modal = await this.waitForElement('[role="dialog"]', 5000);
      if (!modal) throw new Error('Failed to open following list');

      let lastHeight = 0;
      let scrollAttempts = 0;
      const maxAttempts = 50;

      while (scrollAttempts < maxAttempts) {
        // Extract user data from current view
        const userElements = modal.querySelectorAll('a[role="menuitem"]');

        for (const userEl of userElements) {
          const userId = userEl.querySelector('._afrw img')?.getAttribute('alt') || 
                        userEl.textContent?.trim() || '';
          
          if (userId && !processedIds.has(userId)) {
            processedIds.add(userId);
            const userData = this.parseUserElement(userEl);
            if (userData) {
              following.push(userData);
            }
          }
        }

        // Scroll to load more
        const scrollContainer = modal.querySelector('[role="presentation"]')?.parentElement;
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
          await this.delay(500);

          const newHeight = scrollContainer.scrollHeight;
          if (newHeight === lastHeight) break;
          lastHeight = newHeight;
        }

        scrollAttempts++;
      }
    } catch (error) {
      console.error('Error getting following list:', error);
      throw error;
    }

    return following;
  }

  /**
   * Get current authenticated user's followers list
   */
  static async getFollowersList(): Promise<IGUser[]> {
    const followers: IGUser[] = [];
    const processedIds = new Set<string>();

    try {
      const followersButton = document.querySelector('a[href*="/followers"]');
      if (!followersButton) {
        throw new Error('Could not find followers list');
      }

      const modal = await this.waitForElement('[role="dialog"]', 5000);
      if (!modal) throw new Error('Failed to open followers list');

      let lastHeight = 0;
      let scrollAttempts = 0;

      while (scrollAttempts < 50) {
        const userElements = modal.querySelectorAll('a[role="menuitem"]');

        for (const userEl of userElements) {
          const userId = userEl.textContent?.trim() || '';
          
          if (userId && !processedIds.has(userId)) {
            processedIds.add(userId);
            const userData = this.parseUserElement(userEl);
            if (userData) {
              followers.push(userData);
            }
          }
        }

        const scrollContainer = modal.querySelector('[role="presentation"]')?.parentElement;
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
          await this.delay(500);

          const newHeight = scrollContainer.scrollHeight;
          if (newHeight === lastHeight) break;
          lastHeight = newHeight;
        }

        scrollAttempts++;
      }
    } catch (error) {
      console.error('Error getting followers list:', error);
      throw error;
    }

    return followers;
  }

  /**
   * Get detailed user profile data by visiting their profile
   */
  static async getUserDetails(username: string): Promise<IGUser | null> {
    try {
      // Open user profile in new tab
      const profileUrl = `https://www.instagram.com/${username}`;
      const profileWindow = window.open(profileUrl, '_blank');
      
      if (!profileWindow) {
        console.warn(`Could not open profile for ${username}`);
        return null;
      }

      // Wait for profile to load
      await this.delay(3000);

      const userData = this.extractProfileData(profileWindow.document, username);
      profileWindow.close();

      return userData;
    } catch (error) {
      console.error(`Error getting details for ${username}:`, error);
      return null;
    }
  }

  /**
   * Extract profile data from user's profile page
   */
  private static extractProfileData(doc: Document, username: string): IGUser | null {
    try {
      const headerSection = doc.querySelector('header');
      if (!headerSection) return null;

      // Extract follower/following counts
      const statElements = doc.querySelectorAll('[role="menuitem"]');
      let followers = 0;
      let following = 0;
      let posts = 0;

      statElements.forEach((stat) => {
        const text = stat.textContent || '';
        if (text.includes('follower')) {
          followers = this.parseNumber(text);
        } else if (text.includes('following')) {
          following = this.parseNumber(text);
        } else if (text.includes('post')) {
          posts = this.parseNumber(text);
        }
      });

      // Extract bio
      const bioElement = doc.querySelector('section h1')?.parentElement?.querySelector('div');
      const bio = bioElement?.textContent?.trim() || '';

      // Check if private
      const isPrivate = doc.textContent?.includes('This profile is private') || false;

      // Check if verified
      const isVerified = doc.querySelector('svg[aria-label="Verified"]') !== null;

      // Get profile picture
      const profilePic = doc.querySelector('img[alt*="profile picture"]')?.getAttribute('src') || '';

      return {
        id: username,
        username,
        profilePicUrl: profilePic,
        fullName: doc.querySelector('h2')?.textContent?.trim() || '',
        followerCount: followers,
        followingCount: following,
        postCount: posts,
        isPrivate,
        isVerified,
        isFollowing: false, // Would need to check button state
        isFollowingYou: false, // Would need to check
        biography: bio,
      };
    } catch (error) {
      console.error('Error extracting profile data:', error);
      return null;
    }
  }

  /**
   * Parse user element from following/followers list
   */
  private static parseUserElement(element: Element): IGUser | null {
    try {
      const username = element.querySelector('a')?.textContent?.trim() || '';
      const profileImg = element.querySelector('img[alt]')?.getAttribute('src') || '';

      return {
        id: username,
        username,
        profilePicUrl: profileImg,
        fullName: '',
        followerCount: 0,
        followingCount: 0,
        postCount: 0,
        isPrivate: false,
        isVerified: false,
        isFollowing: true,
        isFollowingYou: false,
        biography: '',
      };
    } catch (error) {
      return null;
    }
  }

  /**
   * Wait for an element to appear in DOM
   */
  private static waitForElement(selector: string, timeout: number = 5000): Promise<Element | null> {
    return new Promise((resolve) => {
      const startTime = Date.now();
      
      const checkElement = () => {
        const element = document.querySelector(selector);
        if (element) {
          resolve(element);
        } else if (Date.now() - startTime < timeout) {
          setTimeout(checkElement, 500);
        } else {
          resolve(null);
        }
      };

      checkElement();
    });
  }

  /**
   * Parse number from text (e.g., "1.2M followers" -> 1200000)
   */
  private static parseNumber(text: string): number {
    const match = text.match(/([\d.]+)\s*([KMB]?)/);
    if (!match) return 0;

    let num = parseFloat(match[1]);
    const suffix = match[2];

    if (suffix === 'K') num *= 1000;
    if (suffix === 'M') num *= 1000000;
    if (suffix === 'B') num *= 1000000000;

    return Math.floor(num);
  }

  /**
   * Delay execution
   */
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
