import apiClient from '../client';
import type {
  Wall,
  SharedWall,
  WallDetail,
  WallMember,
  CreateWallData,
  UpdateWallData,
  InviteUserData,
} from '../../types/wall';

const wallService = {
  getMyWalls: async (): Promise<Wall[]> => {
    const response = await apiClient.get<{ success: boolean; data: Wall[] }>('/walls');
    return response.data.data;
  },

  getSharedWalls: async (): Promise<SharedWall[]> => {
    const response = await apiClient.get<{ success: boolean; data: SharedWall[] }>('/walls/shared');
    return response.data.data;
  },

  getWallById: async (wallId: string): Promise<WallDetail> => {
    const response = await apiClient.get<{ success: boolean; data: WallDetail }>(`/walls/${wallId}`);
    return response.data.data;
  },

  createWall: async (wallData: CreateWallData): Promise<Wall> => {
    const response = await apiClient.post<{ success: boolean; data: Wall }>('/walls', wallData);
    return response.data.data;
  },

  updateWall: async (wallId: string, wallData: UpdateWallData): Promise<Wall> => {
    const response = await apiClient.put<{ success: boolean; data: Wall }>(`/walls/${wallId}`, wallData);
    return response.data.data;
  },

  deleteWall: async (wallId: string): Promise<void> => {
    await apiClient.delete(`/walls/${wallId}`);
  },

  inviteUser: async (wallId: string, inviteData: InviteUserData): Promise<void> => {
    await apiClient.post(`/walls/${wallId}/members/invite`, inviteData);
  },

  getWallMembers: async (wallId: string): Promise<WallMember[]> => {
    const response = await apiClient.get<{ success: boolean; data: WallMember[] }>(`/walls/${wallId}/members`);
    return response.data.data;
  },

  updateMemberRole: async (wallId: string, userId: string, role: 'admin' | 'viewer'): Promise<void> => {
    await apiClient.put(`/walls/${wallId}/members/${userId}/role`, { role });
  },

  removeMember: async (wallId: string, userId: string): Promise<void> => {
    await apiClient.delete(`/walls/${wallId}/members/${userId}`);
  },
};

export default wallService;
