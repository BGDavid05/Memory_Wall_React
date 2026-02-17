import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import memoryService from '../api/services/memoryService';
import type { Memory, CreateMemoryData, UpdateMemoryData } from '../types/memory';

export const useWallMemories = (wallId: string, page = 1) => {
  return useQuery({
    queryKey: ['walls', wallId, 'memories', page],
    queryFn: () => memoryService.getWallMemories(wallId, page),
    enabled: !!wallId,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useMemoryById = (wallId: string, memoryId: string) => {
  return useQuery({
    queryKey: ['walls', wallId, 'memories', memoryId],
    queryFn: () => memoryService.getMemoryById(wallId, memoryId),
    enabled: !!wallId && !!memoryId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateMemory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ wallId, data }: { wallId: string; data: CreateMemoryData }) =>
      memoryService.createMemory(wallId, data),
    onSuccess: (newMemory: Memory) => {
      queryClient.invalidateQueries({
        queryKey: ['walls', newMemory.wallId, 'memories'],
      });
      queryClient.invalidateQueries({
        queryKey: ['walls', 'my'],
      });
      queryClient.invalidateQueries({
        queryKey: ['walls', 'shared'],
      });
      queryClient.invalidateQueries({
        queryKey: ['user', 'stats'],
      });
    },
  });
};

export const useUpdateMemory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ wallId, memoryId, data }: { wallId: string; memoryId: string; data: UpdateMemoryData }) =>
      memoryService.updateMemory(wallId, memoryId, data),
    onSuccess: (updatedMemory: Memory) => {
      queryClient.invalidateQueries({
        queryKey: ['walls', updatedMemory.wallId, 'memories'],
      });
      queryClient.setQueryData(['walls', updatedMemory.wallId, 'memories', updatedMemory._id], updatedMemory);
    },
  });
};

export const useDeleteMemory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ wallId, memoryId }: { wallId: string; memoryId: string }) =>
      memoryService.deleteMemory(wallId, memoryId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['walls', variables.wallId, 'memories'],
      });
      queryClient.invalidateQueries({
        queryKey: ['walls', 'my'],
      });
      queryClient.invalidateQueries({
        queryKey: ['walls', 'shared'],
      });
      queryClient.invalidateQueries({
        queryKey: ['user', 'stats'],
      });
    },
  });
};
