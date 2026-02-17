import apiClient from '../client';
import type { Memory, CreateMemoryData, UpdateMemoryData, MemoriesResponse } from '../../types/memory';

const memoryService = {
  async getWallMemories(wallId: string, page = 1, limit = 20): Promise<MemoriesResponse> {
    const response = await apiClient.get<{ data: MemoriesResponse }>(`/walls/${wallId}/memories`, {
      params: { page, limit },
    });
    return response.data.data;
  },

  async getMemoryById(wallId: string, memoryId: string): Promise<Memory> {
    const response = await apiClient.get<{ data: Memory }>(`/walls/${wallId}/memories/${memoryId}`);
    return response.data.data;
  },

  async createMemory(wallId: string, memoryData: CreateMemoryData): Promise<Memory> {
    const response = await apiClient.post<{ data: Memory }>(`/walls/${wallId}/memories`, memoryData);
    return response.data.data;
  },

  async updateMemory(wallId: string, memoryId: string, memoryData: UpdateMemoryData): Promise<Memory> {
    const response = await apiClient.put<{ data: Memory }>(`/walls/${wallId}/memories/${memoryId}`, memoryData);
    return response.data.data;
  },

  async deleteMemory(wallId: string, memoryId: string): Promise<void> {
    await apiClient.delete(`/walls/${wallId}/memories/${memoryId}`);
  },
};

export default memoryService;
