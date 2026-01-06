import { User } from './user';

export type PostStatus = 'published' | 'draft' | 'private';

export interface Post {
  id: number;
  title: string;
  content: string;
  summary?: string | null;
  tags: string[];
  category?: string | null;
  status: PostStatus;
  view_count: number;
  like_count: number;
  created_at: string;
  updated_at: string;
  published_at?: string | null;
  author: Pick<User, 'id' | 'display_name' | 'avatar_url'>;
}

export interface PostCreate {
  title: string;
  content: string;
  summary?: string | undefined;
  tags?: string[] | undefined;
  category?: string | undefined;
  status?: PostStatus | undefined;
}

export interface PostUpdate extends Partial<PostCreate> {
  status?: PostStatus | undefined;
}
