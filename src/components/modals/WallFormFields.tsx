import { TextField, Box, Typography, Avatar, IconButton, CircularProgress, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Controller, Control, FieldErrors } from 'react-hook-form';

interface WallFormData {
  name: string;
  description?: string;
}

interface WallFormFieldsProps {
  control: Control<WallFormData>;
  errors: FieldErrors<WallFormData>;
  imagePreview: string | null;
  isUploading: boolean;
  isRemovingImage: boolean;
  isSubmitting: boolean;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export default function WallFormFields({
  control,
  errors,
  imagePreview,
  isUploading,
  isRemovingImage,
  isSubmitting,
  onImageUpload,
  onRemoveImage,
}: WallFormFieldsProps) {
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Wall Name"
            placeholder="Enter wall name"
            error={!!errors.name}
            helperText={errors.name?.message}
            required
            fullWidth
            autoFocus
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            placeholder="Describe your memory wall (optional)"
            error={!!errors.description}
            helperText={errors.description?.message || `${field.value?.length || 0}/500 characters`}
            multiline
            rows={3}
            fullWidth
          />
        )}
      />

      <Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Cover Image
        </Typography>

        {imagePreview ? (
          <Box position="relative" display="inline-block">
            <Avatar src={imagePreview} variant="rounded" sx={{ width: 128, height: 128 }} />
            <IconButton
              onClick={onRemoveImage}
              disabled={isRemovingImage || isUploading || isSubmitting}
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                bgcolor: 'error.main',
                color: 'white',
                '&:hover': { bgcolor: 'error.dark' },
                width: 24,
                height: 24,
              }}
              size="small"
            >
              {isRemovingImage ? <CircularProgress size={16} color="inherit" /> : <CloseIcon fontSize="small" />}
            </IconButton>
          </Box>
        ) : (
          <Box
            sx={{
              border: 2,
              borderColor: 'divider',
              borderStyle: 'dashed',
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              '&:hover': { borderColor: 'primary.main' },
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: 'action.disabled', mb: 2 }} />
            <Button component="label" variant="text" disabled={isUploading || isSubmitting}>
              Upload a cover image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={onImageUpload}
                disabled={isUploading || isSubmitting}
              />
            </Button>
            <Typography variant="caption" display="block" color="text.secondary">
              PNG, JPG, GIF up to 10MB
            </Typography>
            {isUploading && (
              <Box display="flex" justifyContent="center" alignItems="center" gap={1} mt={2}>
                <CircularProgress size={20} />
                <Typography variant="body2">Uploading image...</Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
