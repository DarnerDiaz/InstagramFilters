import { IGUser, FilterCriteria } from './types';

/**
 * Advanced filtering engine for Instagram users
 */
export class FilterEngine {
  /**
   * Apply filters to user list
   */
  static applyFilters(users: IGUser[], criteria: FilterCriteria): IGUser[] {
    return users.filter(user => this.matchesCriteria(user, criteria));
  }

  /**
   * Check if user matches all filter criteria
   */
  private static matchesCriteria(user: IGUser, criteria: FilterCriteria): boolean {
    // Followers range
    if (user.followerCount < criteria.minFollowers || 
        user.followerCount > criteria.maxFollowers) {
      return false;
    }

    // Follows you filter
    if (criteria.followsYou !== null && user.isFollowingYou !== criteria.followsYou) {
      return false;
    }

    // You follow filter
    if (criteria.youFollow !== null && user.isFollowing !== criteria.youFollow) {
      return false;
    }

    // Private profile filter
    if (criteria.isPrivate !== null && user.isPrivate !== criteria.isPrivate) {
      return false;
    }

    // Verified filter
    if (criteria.isVerified !== null && user.isVerified !== criteria.isVerified) {
      return false;
    }

    // Has bio filter
    if (criteria.hasBio !== null) {
      const hasBio = user.biography.trim().length > 0;
      if (hasBio !== criteria.hasBio) return false;
    }

    // Has website filter
    if (criteria.hasWebsite !== null) {
      const hasWebsite = user.website !== undefined && user.website.trim().length > 0;
      if (hasWebsite !== criteria.hasWebsite) return false;
    }

    // Text search
    if (criteria.searchText) {
      const searchLower = criteria.searchText.toLowerCase();
      const matchesUsername = user.username.toLowerCase().includes(searchLower);
      const matchesName = user.fullName.toLowerCase().includes(searchLower);
      const matchesBio = user.biography.toLowerCase().includes(searchLower);

      if (!matchesUsername && !matchesName && !matchesBio) {
        return false;
      }
    }

    return true;
  }

  /**
   * Get statistical analysis of users
   */
  static getStats(users: IGUser[]) {
    return {
      total: users.length,
      notFollowingBack: users.filter(u => u.isFollowing && !u.isFollowingYou).length,
      youFollowButTheyDont: users.filter(u => u.isFollowing && !u.isFollowingYou).length,
      privateProfiles: users.filter(u => u.isPrivate).length,
      verified: users.filter(u => u.isVerified).length,
      avgFollowers: users.reduce((sum, u) => sum + u.followerCount, 0) / users.length || 0,
      avgFollowing: users.reduce((sum, u) => sum + u.followingCount, 0) / users.length || 0,
    };
  }

  /**
   * Get preset filters for common scenarios
   */
  static getPreset(type: 'not-following-back' | 'ghost-followers' | 'fake-accounts' | 'inactive'): FilterCriteria {
    const baseFilter: FilterCriteria = {
      minFollowers: 0,
      maxFollowers: Number.MAX_SAFE_INTEGER,
      followsYou: null,
      youFollow: null,
      isPrivate: null,
      isVerified: null,
      hasBio: null,
      hasWebsite: null,
      searchText: '',
    };

    switch (type) {
      case 'not-following-back':
        return {
          ...baseFilter,
          youFollow: true,
          followsYou: false,
        };

      case 'ghost-followers':
        return {
          ...baseFilter,
          followsYou: true,
          youFollow: false,
          maxFollowers: 100, // Low follower count
          hasBio: false,
          hasWebsite: false,
        };

      case 'fake-accounts':
        return {
          ...baseFilter,
          isPrivate: true,
          maxFollowers: 50,
          hasBio: false,
        };

      case 'inactive':
        return {
          ...baseFilter,
          maxFollowers: 100,
          hasBio: false,
        };

      default:
        return baseFilter;
    }
  }
}
