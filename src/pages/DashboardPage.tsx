import { useState } from 'react';
import { Box, Typography, Button, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useMyWalls, useSharedWalls, useUserStats } from '../hooks/useWalls';
import { useAuth } from '../hooks/useAuth';
import StatsCards from '../components/dashboard/StatsCards';
import WallGrid from '../components/walls/WallGrid';
import CreateWallModal from '../components/modals/CreateWallModal';

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: myWalls, isLoading: myWallsLoading } = useMyWalls();
  const { data: sharedWalls, isLoading: sharedWallsLoading } = useSharedWalls();
  const { data: userStats } = useUserStats();

  const [createWallModalOpen, setCreateWallModalOpen] = useState(false);

  // Preview: show max 6 walls
  const myWallsPreview = myWalls?.slice(0, 6);
  const sharedWallsPreview = sharedWalls?.slice(0, 6);

  // Fallback calculations
  const fallbackMyWallsCount = myWalls?.length || 0;
  const fallbackSharedWallsCount = sharedWalls?.length || 0;
  const fallbackTotalMemories =
    (myWalls?.reduce((sum, w) => sum + w.memoryCount, 0) || 0) +
    (sharedWalls?.reduce((sum, w) => sum + w.memoryCount, 0) || 0);
  const fallbackTotalMembers =
    (myWalls?.reduce((sum, w) => sum + w.memberCount, 0) || 0) +
    (sharedWalls?.reduce((sum, w) => sum + w.memberCount, 0) || 0);

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" gutterBottom>
            Welcome back, {user?.name}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your memory walls and explore shared collections
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} size="large" onClick={() => setCreateWallModalOpen(true)}>
          Create New Wall
        </Button>
      </Box>

      {/* Stats Cards */}
      <Box mb={6}>
        <StatsCards
          stats={userStats}
          fallbackMyWallsCount={fallbackMyWallsCount}
          fallbackSharedWallsCount={fallbackSharedWallsCount}
          fallbackTotalMemories={fallbackTotalMemories}
          fallbackTotalMembers={fallbackTotalMembers}
        />
      </Box>

      {/* My Walls Section */}
      <Box mb={6}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5">My Walls</Typography>
          {myWalls && myWalls.length > 6 && (
            <MuiLink component={Link} to="/my-walls" underline="hover">
              View all →
            </MuiLink>
          )}
        </Box>
        <WallGrid
          walls={myWallsPreview}
          isLoading={myWallsLoading}
          type="my"
          emptyMessage="No walls yet. Create your first memory wall!"
          onCreateWall={() => setCreateWallModalOpen(true)}
        />
      </Box>

      {/* Shared Walls Section */}
      {sharedWalls && sharedWalls.length > 0 && (
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5">Shared with Me</Typography>
            {sharedWalls.length > 6 && (
              <MuiLink component={Link} to="/shared-walls" underline="hover">
                View all →
              </MuiLink>
            )}
          </Box>
          <WallGrid walls={sharedWallsPreview} isLoading={sharedWallsLoading} type="shared" />
        </Box>
      )}

      <CreateWallModal open={createWallModalOpen} onClose={() => setCreateWallModalOpen(false)} />
    </Box>
  );
}
