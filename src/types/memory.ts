export interface Memory {
  _id: string;
  wallId: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  title: string;
  content: string;
  memoryDate: string;
  assets: Array<{
    type: 'image';
    url: string;
    publicId: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMemoryData {
  title: string;
  content?: string;
  memoryDate?: string;
  assets?: Array<{
    type: 'image';
    url: string;
    publicId: string;
  }>;
}

export interface UpdateMemoryData {
  title?: string;
  content?: string;
  memoryDate?: string;
  assets?: Array<{
    type: 'image';
    url: string;
    publicId: string;
  }>;
}

export interface MemoryPagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface MemoriesResponse {
  memories: Memory[];
  pagination: MemoryPagination;
}
