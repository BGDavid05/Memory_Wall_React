/**
 * Application-wide constants
 */

// User roles
export const ROLES = {
  ADMIN: 'admin',
  VIEWER: 'viewer',
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];

// Query keys for React Query
export const QUERY_KEYS = {
  WALLS: {
    MY: ['walls', 'my'],
    SHARED: ['walls', 'shared'],
    BY_ID: (id: string) => ['walls', id],
    MEMBERS: (wallId: string) => ['walls', wallId, 'members'],
  },
  MEMORIES: {
    BY_WALL: (wallId: string, page: number) => ['memories', wallId, page],
  },
  USER: {
    STATS: ['user', 'stats'],
  },
} as const;

// Stale time configurations (in milliseconds)
export const STALE_TIME = {
  SHORT: 2 * 60 * 1000, // 2 minutes
  MEDIUM: 5 * 60 * 1000, // 5 minutes
  LONG: 10 * 60 * 1000, // 10 minutes
} as const;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    STATS: '/auth/stats',
  },
  WALLS: {
    BASE: '/walls',
    BY_ID: (id: string) => `/walls/${id}`,
    SHARED: '/walls/shared',
    MEMBERS: (wallId: string) => `/walls/${wallId}/members`,
    INVITE: (wallId: string) => `/walls/${wallId}/invite`,
    UPDATE_ROLE: (wallId: string, userId: string) => `/walls/${wallId}/members/${userId}/role`,
    REMOVE_MEMBER: (wallId: string, userId: string) => `/walls/${wallId}/members/${userId}`,
  },
  MEMORIES: {
    BY_WALL: (wallId: string) => `/walls/${wallId}/memories`,
    BY_ID: (wallId: string, memoryId: string) => `/walls/${wallId}/memories/${memoryId}`,
  },
  UPLOAD: {
    SINGLE: '/upload/single',
    MULTIPLE: '/upload/multiple',
  },
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

// File upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  MAX_FILES: 10,
} as const;

// Theme
export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  AUTH_TOKEN: 'token',
} as const;

// Toast notification durations
export const TOAST_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 7000,
} as const;
