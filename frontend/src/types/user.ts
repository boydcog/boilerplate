export interface User {
  id: number;
  email: string;
  display_name: string;
  bio?: string | null;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserProfileUpdate {
  display_name?: string;
  bio?: string;
  avatar_url?: string;
}
