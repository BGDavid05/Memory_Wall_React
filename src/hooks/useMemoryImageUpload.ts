import { useState, useCallback } from 'react';
import { useToast } from '../contexts/ToastContext';
import uploadService from '../api/services/uploadService';

interface ImagePreview {
  url: string;
  publicId: string;
}

export function useMemoryImageUpload() {
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [uploadedAssets, setUploadedAssets] = useState<ImagePreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isRemovingImage, setIsRemovingImage] = useState(false);
  const toast = useToast();

  const validateFile = (file: File): string | null => {
    if (file.size > 10 * 1024 * 1024) {
      return `${file.name} is larger than 10MB`;
    }
    if (!file.type.startsWith('image/')) {
      return `${file.name} is not an image`;
    }
    return null;
  };

  const uploadSingleFile = async (file: File): Promise<ImagePreview | null> => {
    const validationError = validateFile(file);
    if (validationError) {
      toast.error('File validation failed', validationError);
      return null;
    }

    try {
      const result = await uploadService.uploadImage(file);
      return result;
    } catch (error) {
      toast.error('Upload Failed', `Could not upload ${file.name}`);
      return null;
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files || files.length === 0) return;

    const fileArray = Array.from(files);
    setIsUploading(true);

    const uploadPromises = fileArray.map((file) => uploadSingleFile(file));
    const results = await Promise.all(uploadPromises);
    const successfulUploads = results.filter((result): result is ImagePreview => result !== null);

    if (successfulUploads.length > 0) {
      setUploadedAssets((prev) => [...prev, ...successfulUploads]);
      setImagePreviews((prev) => [...prev, ...successfulUploads]);
    }

    setIsUploading(false);
    event.target.value = '';
  };

  const handleRemoveImage = async (index: number) => {
    if (isRemovingImage) return;

    const imageToRemove = imagePreviews[index];
    if (!imageToRemove) return;

    try {
      setIsRemovingImage(true);
      await uploadService.deleteImage(imageToRemove.publicId);
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
      setUploadedAssets((prev) => prev.filter((asset) => asset.publicId !== imageToRemove.publicId));
    } catch (error) {
      toast.error('Delete Failed', 'Could not delete image from cloud storage');
    } finally {
      setIsRemovingImage(false);
    }
  };

  const resetImages = useCallback(() => {
    setImagePreviews([]);
    setUploadedAssets([]);
  }, []);

  const setImages = useCallback((images: ImagePreview[]) => {
    setImagePreviews(images);
    setUploadedAssets(images);
  }, []);

  return {
    imagePreviews,
    uploadedAssets,
    isUploading,
    isRemovingImage,
    handleImageUpload,
    handleRemoveImage,
    resetImages,
    setImages,
  };
}
