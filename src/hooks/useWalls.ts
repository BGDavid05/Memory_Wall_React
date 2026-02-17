import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import wallService from '../api/services/wallService';
import authService from '../api/services/authService';
import type {
  Wall,
  SharedWall,
  WallDetail,
  WallMember,
  CreateWallData,
  UpdateWallData,
  InviteUserData,
} from '../types/wall';

export const useMyWalls = () => {
  return useQuery<Wall[], Error>({
    queryKey: ['walls', 'my'],
    queryFn: wallService.getMyWalls,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useSharedWalls = () => {
  return useQuery<SharedWall[], Error>({
    queryKey: ['walls', 'shared'],
    queryFn: wallService.getSharedWalls,
    staleTime: 2 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useWallById = (wallId: string) => {
  return useQuery<WallDetail, Error>({
    queryKey: ['walls', wallId],
    queryFn: () => wallService.getWallById(wallId),
    enabled: !!wallId,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useWallMembers = (wallId: string) => {
  return useQuery<WallMember[], Error>({
    queryKey: ['walls', wallId, 'members'],
    queryFn: () => wallService.getWallMembers(wallId),
    enabled: !!wallId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useUserStats = () => {
  return useQuery({
    queryKey: ['user', 'stats'],
    queryFn: authService.getUserStats,
    staleTime: 1 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useCreateWall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWallData) => wallService.createWall(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['walls', 'my'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'stats'] });
    },
  });
};

export const useUpdateWall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ wallId, data }: { wallId: string; data: UpdateWallData }) => wallService.updateWall(wallId, data),
    onSuccess: (updatedWall) => {
      queryClient.invalidateQueries({ queryKey: ['walls', 'my'] });
      queryClient.invalidateQueries({ queryKey: ['walls', 'shared'] });
      queryClient.setQueryData(['walls', updatedWall._id], updatedWall);
    },
  });
};

export const useDeleteWall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wallId: string) => wallService.deleteWall(wallId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['walls', 'my'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'stats'] });
    },
  });
};

export const useInviteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ wallId, data }: { wallId: string; data: InviteUserData }) => wallService.inviteUser(wallId, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['walls', variables.wallId, 'members'],
      });
    },
  });
};

export const useUpdateMemberRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ wallId, userId, role }: { wallId: string; userId: string; role: 'admin' | 'viewer' }) =>
      wallService.updateMemberRole(wallId, userId, role),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['walls', variables.wallId, 'members'],
      });
    },
  });
};

export const useRemoveMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ wallId, userId }: { wallId: string; userId: string }) => wallService.removeMember(wallId, userId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['walls', variables.wallId, 'members'],
      });
    },
  });
};
