import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateMemory, useUpdateMemory } from '../../hooks/useMemories';
import { useToast } from '../../contexts/ToastContext';
import type { Memory } from '../../types/memory';
import MemoryFormFields from './MemoryFormFields';
import { useMemoryImageUpload } from '../../hooks/useMemoryImageUpload';

const memorySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  content: z.string().max(2000, 'Content must be less than 2000 characters').optional(),
  memoryDate: z.string().optional(),
});

type MemoryFormData = z.infer<typeof memorySchema>;

interface CreateMemoryModalProps {
  open: boolean;
  onClose: () => void;
  wallId: string;
  editMemory?: Memory | null;
}

export default function CreateMemoryModal({ open, onClose, wallId, editMemory = null }: CreateMemoryModalProps) {
  const createMutation = useCreateMemory();
  const updateMutation = useUpdateMemory();
  const toast = useToast();
  const { imagePreviews, isUploading, isRemovingImage, handleImageUpload, handleRemoveImage, resetImages, setImages } =
    useMemoryImageUpload();

  const isEditing = !!editMemory;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MemoryFormData>({
    resolver: zodResolver(memorySchema),
    defaultValues: {
      title: '',
      content: '',
      memoryDate: '',
    },
  });

  useEffect(() => {
    if (editMemory) {
      reset({
        title: editMemory.title,
        content: editMemory.content || '',
        memoryDate: editMemory.memoryDate ? new Date(editMemory.memoryDate).toISOString().split('T')[0] : '',
      });
      if (editMemory.assets && editMemory.assets.length > 0) {
        setImages(
          editMemory.assets.map((asset) => ({
            url: asset.url,
            publicId: asset.publicId,
          })),
        );
      }
    }
  }, [editMemory, reset, setImages]);

  const handleClose = () => {
    reset({ title: '', content: '', memoryDate: '' });
    resetImages();
    onClose();
  };

  const onSubmit = async (data: MemoryFormData) => {
    try {
      const memoryData = {
        title: data.title,
        content: data.content || undefined,
        memoryDate: data.memoryDate || undefined,
        assets: imagePreviews.map((preview) => ({
          type: 'image' as const,
          url: preview.url,
          publicId: preview.publicId,
        })),
      };

      if (isEditing && editMemory) {
        await updateMutation.mutateAsync({
          wallId,
          memoryId: editMemory._id,
          data: memoryData,
        });
        toast.success('Memory Updated', `${data.title} has been updated successfully`);
      } else {
        await createMutation.mutateAsync({
          wallId,
          data: memoryData,
        });
        toast.success('Memory Created', `${data.title} has been created successfully`);
      }

      handleClose();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        isEditing ? 'Update Failed' : 'Creation Failed',
        err.response?.data?.message || `Unable to ${isEditing ? 'update' : 'create'} memory`,
      );
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{isEditing ? 'Edit Memory' : 'Create New Memory'}</Typography>
          <IconButton onClick={handleClose} size="small" disabled={isSubmitting}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <MemoryFormFields
            control={control}
            errors={errors}
            imagePreviews={imagePreviews}
            isUploading={isUploading}
            isRemovingImage={isRemovingImage}
            isSubmitting={isSubmitting}
            onImageUpload={handleImageUpload}
            onRemoveImage={handleRemoveImage}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleClose} color="inherit" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting || isUploading}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting && 'Saving...'}
            {!isSubmitting && isEditing && 'Update Memory'}
            {!isSubmitting && !isEditing && 'Create Memory'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
