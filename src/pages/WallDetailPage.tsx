import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import { useWallById } from '../hooks/useWalls';
import { useWallMemories, useDeleteMemory } from '../hooks/useMemories';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../contexts/ToastContext';
import WallHeader from '../components/walls/WallHeader';
import MemoryGrid from '../components/memories/MemoryGrid';
import InviteUserModal from '../components/modals/InviteUserModal';
import ManageMembersModal from '../components/modals/ManageMembersModal';
import CreateWallModal from '../components/modals/CreateWallModal';
import CreateMemoryModal from '../components/modals/CreateMemoryModal';
import MemoryDetailModal from '../components/modals/MemoryDetailModal';
import { getErrorMessage } from '../utils/errorHandler';
import type { Memory } from '../types/memory';

export default function WallDetailPage() {
  const { id: wallId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();
  const [sortBy, setSortBy] = useState('newest');

  // Modal states
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [membersModalOpen, setMembersModalOpen] = useState(false);
  const [editWallModalOpen, setEditWallModalOpen] = useState(false);
  const [createMemoryModalOpen, setCreateMemoryModalOpen] = useState(false);
  const [editMemory, setEditMemory] = useState<Memory | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [memoryDetailModalOpen, setMemoryDetailModalOpen] = useState(false);

  const deleteMemoryMutation = useDeleteMemory();

  const { data: wall, isLoading: wallLoading, error: wallError } = useWallById(wallId!);
  const { data: memoriesData, isLoading: memoriesLoading, error: memoriesError } = useWallMemories(wallId!, 1);

  if (wallLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (wallError || !wall) {
    return (
      <Box textAlign="center" py={8}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Wall not found or you don&apos;t have access to it.
        </Alert>
        <Button variant="contained" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Box>
    );
  }

  const createdById = typeof wall.createdBy === 'string' ? wall.createdBy : (wall.createdBy as { _id: string })._id;
  const canEditWall = user ? createdById === user.id || wall.role === 'admin' : false;

  const memories = memoriesData?.memories || [];
  const totalMemories = memoriesData?.pagination.totalCount || 0;

  const sortedMemories = [...memories].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'memory-date':
        return new Date(b.memoryDate).getTime() - new Date(a.memoryDate).getTime();
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  const canEditMemory = (memory: Memory) => {
    if (!user) return false;
    if (memory.createdBy._id === user.id) return true;
    return canEditWall;
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortBy(event.target.value);
  };

  const handleOpenCreateMemory = () => {
    setEditMemory(null);
    setCreateMemoryModalOpen(true);
  };

  const handleEditMemory = (memory: Memory) => {
    setEditMemory(memory);
    setCreateMemoryModalOpen(true);
  };

  const handleDeleteMemory = async (memory: Memory) => {
    try {
      await deleteMemoryMutation.mutateAsync({
        wallId: wallId!,
        memoryId: memory._id,
      });
      toast.success('Memory Deleted', `${memory.title} has been deleted successfully`);
    } catch (error: unknown) {
      toast.error('Delete Failed', getErrorMessage(error) || 'Unable to delete memory');
    }
  };

  const handleOpenMemoryDetail = (memory: Memory) => {
    setSelectedMemory(memory);
    setMemoryDetailModalOpen(true);
  };

  const handleOpenInviteFromMembers = () => {
    setMembersModalOpen(false);
    setInviteModalOpen(true);
  };

  return (
    <Box>
      <WallHeader
        name={wall.name}
        description={wall.description}
        createdByName={wall.createdByName || 'Unknown'}
        totalMemories={totalMemories}
        createdAt={wall.createdAt}
        coverImage={wall.coverImage}
        canEdit={canEditWall || false}
        onAddMemory={handleOpenCreateMemory}
        onInvite={() => setInviteModalOpen(true)}
        onManageMembers={() => setMembersModalOpen(true)}
        onEditWall={() => setEditWallModalOpen(true)}
      />

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Memories</Typography>
        <FormControl size="small" sx={{ minWidth: 180 }}>
          <Select value={sortBy} onChange={handleSortChange}>
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
            <MenuItem value="memory-date">By Memory Date</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <MemoryGrid
        memories={sortedMemories}
        isLoading={memoriesLoading}
        error={memoriesError}
        canEdit={canEditWall || false}
        onMemoryClick={handleOpenMemoryDetail}
        onCreateMemory={handleOpenCreateMemory}
      />

      <InviteUserModal open={inviteModalOpen} onClose={() => setInviteModalOpen(false)} wallId={wallId!} />

      <ManageMembersModal
        open={membersModalOpen}
        onClose={() => setMembersModalOpen(false)}
        wallId={wallId!}
        wallName={wall.name}
        wallCreatorId={createdById}
        onOpenInvite={handleOpenInviteFromMembers}
      />

      <CreateWallModal open={editWallModalOpen} onClose={() => setEditWallModalOpen(false)} editWall={wall} />

      <CreateMemoryModal
        open={createMemoryModalOpen}
        onClose={() => {
          setCreateMemoryModalOpen(false);
          setEditMemory(null);
        }}
        wallId={wallId!}
        editMemory={editMemory}
      />

      <MemoryDetailModal
        open={memoryDetailModalOpen}
        onClose={() => {
          setMemoryDetailModalOpen(false);
          setSelectedMemory(null);
        }}
        memory={selectedMemory}
        canEdit={selectedMemory ? canEditMemory(selectedMemory) : false}
        onEdit={handleEditMemory}
        onDelete={handleDeleteMemory}
      />
    </Box>
  );
}
