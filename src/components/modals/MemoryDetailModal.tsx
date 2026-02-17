import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { formatDate } from '../../utils/formatters';
import type { Memory } from '../../types/memory';

interface MemoryDetailModalProps {
  open: boolean;
  onClose: () => void;
  memory: Memory | null;
  canEdit: boolean;
  onEdit?: (memory: Memory) => void;
  onDelete?: (memory: Memory) => void;
}

export default function MemoryDetailModal({
  open,
  onClose,
  memory,
  canEdit,
  onEdit = undefined,
  onDelete = undefined,
}: MemoryDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!memory) return null;

  const images = memory.assets || [];
  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleClose = () => {
    setCurrentImageIndex(0);
    onClose();
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(memory);
    }
    handleClose();
  };

  const handleDelete = () => {
    // eslint-disable-next-line no-alert
    if (onDelete && window.confirm(`Are you sure you want to delete "${memory.title}"? This cannot be undone.`)) {
      onDelete(memory);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box flex={1}>
            <Typography variant="h5" gutterBottom>
              {memory.title}
            </Typography>
            <Box display="flex" gap={1} alignItems="center">
              <Typography variant="caption" color="text.secondary">
                by {memory.createdBy.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                •
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(memory.memoryDate)}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={3}>
          {hasImages && (
            <Box position="relative">
              <Box
                component="img"
                src={images[currentImageIndex].url}
                alt={`${memory.title} - ${currentImageIndex + 1}`}
                sx={{
                  width: '100%',
                  maxHeight: 500,
                  objectFit: 'contain',
                  borderRadius: 1,
                  bgcolor: 'grey.100',
                }}
              />

              {hasMultipleImages && (
                <>
                  <IconButton
                    onClick={handlePrevImage}
                    sx={{
                      position: 'absolute',
                      left: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                    }}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleNextImage}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
                    }}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                  <Chip
                    label={`${currentImageIndex + 1} / ${images.length}`}
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      bgcolor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                    }}
                  />
                </>
              )}
            </Box>
          )}

          {memory.content && (
            <Box>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                }}
              >
                {memory.content}
              </Typography>
            </Box>
          )}

          <Box display="flex" gap={1} flexWrap="wrap">
            <Chip label={`Memory Date: ${formatDate(memory.memoryDate)}`} size="small" variant="outlined" />
            <Chip label={`Created: ${formatDate(memory.createdAt)}`} size="small" variant="outlined" />
            {hasImages && <Chip label={`${images.length} photo${images.length > 1 ? 's' : ''}`} size="small" />}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        {canEdit && (
          <>
            <Button onClick={handleDelete} color="error" startIcon={<DeleteIcon />}>
              Delete
            </Button>
            <Box flex={1} />
            <Button onClick={handleEdit} variant="outlined" startIcon={<EditIcon />}>
              Edit
            </Button>
          </>
        )}
        <Button onClick={handleClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
