type UserProfile = {
  fullName: string;
  avatar: string;
  createdAt: string;
};

type User = {
  id: string;
  email: string;
  role: string;
  profile: UserProfile;
  accessToken: string;
};

type CreateUserInput = {
  id?: string;
  email?: string;
  role?: string;
  profile?: {
    fullName?: string;
    avatar?: string;
    createdAt?: string;
  };
  token?: string;
  accessToken?: string; 
};

export function createUser(data: CreateUserInput = {}): User {
  return {
    id: data.id || "",
    email: data.email || "",
    role: data.role || "",
    profile: {
      fullName: data.profile?.fullName || "",
      avatar: data.profile?.avatar || "",
      createdAt: data.profile?.createdAt || "",
    },
    accessToken: data.accessToken || data.token || "",
  };
}