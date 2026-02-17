import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useMyWalls } from '../hooks/useWalls';
import WallGrid from '../components/walls/WallGrid';
import CreateWallModal from '../components/modals/CreateWallModal';

export default function MyWallsPage() {
  const { data: myWalls, isLoading } = useMyWalls();
  const [createWallModalOpen, setCreateWallModalOpen] = useState(false);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">My Walls</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setCreateWallModalOpen(true)}>
          Create New Wall
        </Button>
      </Box>

      <WallGrid
        walls={myWalls}
        isLoading={isLoading}
        type="my"
        emptyMessage="You haven't created any walls yet"
        onCreateWall={() => setCreateWallModalOpen(true)}
      />

      <CreateWallModal open={createWallModalOpen} onClose={() => setCreateWallModalOpen(false)} />
    </Box>
  );
}
