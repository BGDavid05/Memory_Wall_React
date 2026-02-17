export interface Wall {
  _id: string;
  name: string;
  description: string;
  coverImage: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  memoryCount: number;
  memberCount: number;
}

export interface SharedWall extends Omit<Wall, 'createdBy'> {
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  role: 'admin' | 'viewer';
  createdByName: string;
}

export interface WallDetail extends Wall {
  role?: 'admin' | 'viewer';
  createdByName?: string;
}

export interface WallMember {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  role: 'admin' | 'viewer';
  createdAt: string;
}

export interface CreateWallData {
  name: string;
  description?: string;
  coverImage?: string;
}

export interface UpdateWallData {
  name?: string;
  description?: string;
  coverImage?: string;
}

export interface InviteUserData {
  email: string;
  role: 'admin' | 'viewer';
}
