/**
 * Instagram user data structure
 */
export interface IGUser {
  id: string;
  username: string;
  profilePicUrl: string;
  fullName: string;
  followerCount: number;
  followingCount: number;
  postCount: number;
  isPrivate: boolean;
  isVerified: boolean;
  isFollowing: boolean;
  isFollowingYou: boolean;
  biography: string;
  website?: string;
}

/**
 * Filter criteria for selecting users
 */
export interface FilterCriteria {
  minFollowers: number;
  maxFollowers: number;
  followsYou: boolean | null; // null = don't filter
  youFollow: boolean | null;
  isPrivate: boolean | null;
  isVerified: boolean | null;
  hasBio: boolean | null;
  hasWebsite: boolean | null;
  searchText: string;
}

/**
 * Application state
 */
export interface AppState {
  isScanning: boolean;
  scannedUsers: IGUser[];
  filteredUsers: IGUser[];
  selectedUsers: Set<string>;
  filters: FilterCriteria;
  stats: {
    totalScanned: number;
    totalFollowing: number;
    totalFollowers: number;
    notFollowingBack: number;
    younFollowButDontFollowBack: number;
  };
}

/**
 * UI Components data
 */
export interface UIConfig {
  containerID: string;
  theme: 'light' | 'dark';
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}
