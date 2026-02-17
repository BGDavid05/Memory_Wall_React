import apiClient from '../client';

interface UploadResponse {
  url: string;
  publicId: string;
}

const uploadService = {
  async uploadImage(file: File): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await apiClient.post<{ success: boolean; data: UploadResponse }>('/upload/single', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.data;
  },

  async deleteImage(publicId: string): Promise<void> {
    await apiClient.delete(`/upload/${encodeURIComponent(publicId)}`);
  },
};

export default uploadService;
