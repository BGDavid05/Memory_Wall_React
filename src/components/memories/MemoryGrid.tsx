import React from 'react';
import { Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MemoryCard from './MemoryCard';
import type { Memory } from '../../types/memory';

interface MemoryGridProps {
  memories: Memory[];
  isLoading: boolean;
  error: Error | null;
  canEdit: boolean;
  onMemoryClick: (memory: Memory) => void;
  onCreateMemory: () => void;
}

const SKELETON_ITEMS = ['s1', 's2', 's3', 's4', 's5', 's6'];

const MemoryGrid = React.memo(
  ({ memories, isLoading, error, canEdit, onMemoryClick, onCreateMemory }: MemoryGridProps) => {
    if (isLoading) {
      return (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 3,
          }}
        >
          {SKELETON_ITEMS.map((id) => (
            <Box
              key={id}
              sx={{
                borderRadius: 2.5,
                bgcolor: 'grey.200',
                height: 360,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ))}
        </Box>
      );
    }

    if (error) {
      return <Alert severity="error">Failed to load memories</Alert>;
    }

    if (memories.length === 0) {
      return (
        <Box textAlign="center" py={8}>
          <FavoriteIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No memories yet
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Start creating memories to bring this wall to life.
          </Typography>
          {canEdit && (
            <Button variant="contained" startIcon={<AddIcon />} onClick={onCreateMemory}>
              Add First Memory
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
          gap: 2,
        }}
      >
        {memories.map((memory) => (
          <MemoryCard key={memory._id} memory={memory} onClick={() => onMemoryClick(memory)} />
        ))}
      </Box>
    );
  },
);

MemoryGrid.displayName = 'MemoryGrid';

export default MemoryGrid;
