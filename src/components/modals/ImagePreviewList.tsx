import { ImageList, ImageListItem, ImageListItemBar, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ImagePreview {
  url: string;
  publicId: string;
}

interface ImagePreviewListProps {
  images: ImagePreview[];
  onRemove: (index: number) => void;
  isRemoving: boolean;
  isDisabled: boolean;
}

export default function ImagePreviewList({ images, onRemove, isRemoving, isDisabled }: ImagePreviewListProps) {
  if (images.length === 0) return null;

  return (
    <ImageList cols={3} gap={8} sx={{ mb: 2 }}>
      {images.map((preview, index) => (
        <ImageListItem key={preview.publicId || `preview-${index}`}>
          <img
            src={preview.url}
            alt={`Preview ${index + 1}`}
            loading="lazy"
            style={{ height: 150, objectFit: 'cover' }}
          />
          <ImageListItemBar
            actionIcon={
              <IconButton onClick={() => onRemove(index)} disabled={isRemoving || isDisabled} sx={{ color: 'white' }}>
                {isRemoving ? <CircularProgress size={20} color="inherit" /> : <DeleteIcon />}
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
