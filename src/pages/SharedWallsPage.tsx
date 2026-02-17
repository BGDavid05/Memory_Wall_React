import { Box, Typography } from '@mui/material';
import { useSharedWalls } from '../hooks/useWalls';
import WallGrid from '../components/walls/WallGrid';

export default function SharedWallsPage() {
  const { data: sharedWalls, isLoading } = useSharedWalls();

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        Shared with Me
      </Typography>

      <WallGrid
        walls={sharedWalls}
        isLoading={isLoading}
        type="shared"
        emptyMessage="No walls have been shared with you yet"
      />
    </Box>
  );
}
