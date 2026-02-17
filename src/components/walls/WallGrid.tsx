import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import WallCard from './WallCard';
import type { Wall, SharedWall } from '../../types/wall';

interface WallGridProps {
  walls: Wall[] | SharedWall[] | undefined;
  isLoading: boolean;
  // eslint-disable-next-line react/require-default-props
  type?: 'my' | 'shared';
  // eslint-disable-next-line react/require-default-props
  emptyMessage?: string;
  // eslint-disable-next-line react/require-default-props
  onCreateWall?: () => void;
}

const WallGrid = React.memo(
  ({ walls, isLoading, type = 'my', emptyMessage = 'No walls yet', onCreateWall }: WallGridProps) => {
    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
          <CircularProgress />
        </Box>
      );
    }

    if (!walls || walls.length === 0) {
      return (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {emptyMessage}
          </Typography>
          {onCreateWall && (
            <Button variant="contained" onClick={onCreateWall} sx={{ mt: 2 }}>
              Create Your First Wall
            </Button>
          )}
        </Box>
      );
    }

    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 3,
        }}
      >
        {walls.map((wall) => (
          <WallCard key={wall._id} wall={wall} type={type} />
        ))}
      </Box>
    );
  },
);

WallGrid.displayName = 'WallGrid';

export default WallGrid;
