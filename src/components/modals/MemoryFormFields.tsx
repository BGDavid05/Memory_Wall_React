import { TextField, Box, Typography } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import ImagePreviewList from './ImagePreviewList';

interface MemoryFormData {
  title: string;
  content?: string;
  memoryDate?: string;
}

interface ImagePreview {
  url: string;
  publicId: string;
}

interface MemoryFormFieldsProps {
  control: Control<MemoryFormData>;
  errors: FieldErrors<MemoryFormData>;
  imagePreviews: ImagePreview[];
  isUploading: boolean;
  isRemovingImage: boolean;
  isSubmitting: boolean;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

export default function MemoryFormFields({
  control,
  errors,
  imagePreviews,
  isUploading,
  isRemovingImage,
  isSubmitting,
  onImageUpload,
  onRemoveImage,
}: MemoryFormFieldsProps) {
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            required
            error={!!errors.title}
            helperText={errors.title?.message}
            fullWidth
          />
        )}
      />

      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            error={!!errors.content}
            helperText={errors.content?.message || `${field.value?.length || 0}/2000 characters`}
            multiline
            rows={4}
            fullWidth
          />
        )}
      />

      <Controller
        name="memoryDate"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Memory Date" type="date" InputLabelProps={{ shrink: true }} fullWidth />
        )}
      />

      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Photos
        </Typography>

        <ImagePreviewList
          images={imagePreviews}
          onRemove={onRemoveImage}
          isRemoving={isRemovingImage}
          isDisabled={isUploading || isSubmitting}
        />

        <Box
          sx={{
            border: 2,
            borderColor: 'divider',
            borderStyle: 'dashed',
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
        >
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            multiple
            type="file"
            onChange={onImageUpload}
            disabled={isUploading || isSubmitting}
          />
          <label htmlFor="image-upload" style={{ cursor: 'pointer', display: 'block' }}>
            <AddPhotoAlternateIcon sx={{ fontSize: 48, color: 'action.active', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {isUploading ? 'Uploading...' : 'Click to upload images'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Max 10MB per image
            </Typography>
          </label>
        </Box>
      </Box>
    </Box>
  );
}
