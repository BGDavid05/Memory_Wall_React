import apiClient from '../client';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface UserStats {
  myWallsCount: number;
  sharedWallsCount: number;
  totalMemoriesCount: number;
  myWallsMemoriesCount: number;
  sharedWallsMemoriesCount: number;
  totalUniqueMembersCount: number;
  myWallsTotalMembers: number;
  sharedWallsTotalMembers: number;
  sharedWallsUniqueMembers: number;
}

const authService = {
  // Register new user
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post<{ success: boolean; message: string; data: { user: User } }>(
      '/auth/register',
      data,
    );
    return { success: response.data.success, message: response.data.message, user: response.data.data.user };
  },

  // Login user
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post<{ success: boolean; message: string; data: { user: User } }>(
      '/auth/login',
      data,
    );
    return { success: response.data.success, message: response.data.message, user: response.data.data.user };
  },

  // Logout user
  logout: async (): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  // Get current authenticated user
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<{ success: boolean; data: { user: User } }>('/auth/me');
    return response.data.data.user;
  },

  // Check auth status
  getAuthStatus: async (): Promise<{ authenticated: boolean; user?: User }> => {
    const response = await apiClient.get<{ success: boolean; data: { authenticated: boolean; user?: User } }>(
      '/auth/status',
    );
    return response.data.data;
  },

  // Get user statistics
  getUserStats: async (): Promise<UserStats> => {
    const response = await apiClient.get<{ success: boolean; data: UserStats }>('/auth/stats');
    return response.data.data;
  },

  // Update password
  updatePassword: async (
    currentPassword: string,
    newPassword: string,
  ): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.put('/auth/password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },
};

export default authService;
