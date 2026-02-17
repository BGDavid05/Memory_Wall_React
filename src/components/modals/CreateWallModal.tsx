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
import { useCreateWall, useUpdateWall } from '../../hooks/useWalls';
import { useToast } from '../../contexts/ToastContext';
import type { Wall } from '../../types/wall';
import { useWallImageUpload } from '../../hooks/useWallImageUpload';
import WallFormFields from './WallFormFields';

const wallSchema = z.object({
  name: z.string().min(1, 'Wall name is required').max(100, 'Name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
});

type WallFormData = z.infer<typeof wallSchema>;

interface CreateWallModalProps {
  open: boolean;
  onClose: () => void;
  editWall?: Wall | null;
}

export default function CreateWallModal({ open, onClose, editWall = null }: CreateWallModalProps) {
  const createMutation = useCreateWall();
  const updateMutation = useUpdateWall();
  const toast = useToast();
  const {
    imagePreview,
    uploadedImage,
    isUploading,
    isRemovingImage,
    handleImageUpload,
    handleRemoveImage,
    resetImage,
    setImage,
  } = useWallImageUpload();

  const isEditing = !!editWall;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WallFormData>({
    resolver: zodResolver(wallSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (editWall) {
      reset({
        name: editWall.name,
        description: editWall.description || '',
      });
      if (editWall.coverImage) {
        setImage(editWall.coverImage);
      }
    }
  }, [editWall, reset, setImage]);

  const handleClose = () => {
    reset({ name: '', description: '' });
    resetImage();
    onClose();
  };

  const onSubmit = async (data: WallFormData) => {
    try {
      const wallData = {
        name: data.name,
        description: data.description || undefined,
        coverImage: uploadedImage?.url || (isEditing ? imagePreview : undefined),
      };

      if (isEditing && editWall) {
        await updateMutation.mutateAsync({
          wallId: editWall._id,
          data: wallData,
        });
        toast.success('Wall Updated', `${data.name} has been updated successfully`);
      } else {
        await createMutation.mutateAsync(wallData);
        toast.success('Wall Created', `${data.name} has been created successfully`);
      }

      handleClose();
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(
        isEditing ? 'Update Failed' : 'Creation Failed',
        err.response?.data?.message || `Unable to ${isEditing ? 'update' : 'create'} wall`,
      );
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 6,
          },
        },
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{isEditing ? 'Edit Wall' : 'Create New Wall'}</Typography>
          <IconButton onClick={handleClose} size="small" disabled={isSubmitting}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <WallFormFields
            control={control}
            errors={errors}
            imagePreview={imagePreview}
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
            {!isSubmitting && isEditing && 'Update Wall'}
            {!isSubmitting && !isEditing && 'Create Wall'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
