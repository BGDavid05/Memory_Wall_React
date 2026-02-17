import { useState, useCallback } from 'react';
import { useToast } from '../contexts/ToastContext';
import uploadService from '../api/services/uploadService';

export function useWallImageUpload() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{ url: string; publicId: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemovingImage, setIsRemovingImage] = useState(false);
  const toast = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File too large', 'Image size must be less than 10MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type', 'Please select an image file');
      return;
    }

    try {
      setIsUploading(true);
      const result = await uploadService.uploadImage(file);
      setUploadedImage(result);
      setImagePreview(result.url);
    } catch (error) {
      toast.error('Upload Failed', 'Could not upload image');
    } finally {
      setIsUploading(false);
    }

    event.target.value = '';
  };

  const handleRemoveImage = async () => {
    if (isRemovingImage || !uploadedImage) return;

    try {
      setIsRemovingImage(true);
      await uploadService.deleteImage(uploadedImage.publicId);
      setUploadedImage(null);
      setImagePreview(null);
    } catch (error) {
      toast.error('Delete Failed', 'Could not delete image from cloud storage');
    } finally {
      setIsRemovingImage(false);
    }
  };

  const resetImage = useCallback(() => {
    setImagePreview(null);
    setUploadedImage(null);
  }, []);

  const setImage = useCallback((url: string) => {
    setImagePreview(url);
  }, []);

  return {
    imagePreview,
    uploadedImage,
    isUploading,
    isRemovingImage,
    handleImageUpload,
    handleRemoveImage,
    resetImage,
    setImage,
  };
}
