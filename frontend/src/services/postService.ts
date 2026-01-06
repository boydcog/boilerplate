import { api } from './api';
import { Post, PostCreate, PostUpdate, PostStatus } from '../types/post';

export interface PostQueryParams {
  skip?: number | undefined;
  limit?: number | undefined;
  status?: PostStatus | undefined;
  search?: string | undefined;
  tag?: string | undefined;
  mine?: boolean | undefined;
}

export const postService = {
  getPosts: async (params?: PostQueryParams): Promise<Post[]> => {
    const response = await api.get('/posts', { params });
    return response.data;
  },

  getPost: async (id: number): Promise<Post> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  createPost: async (payload: PostCreate): Promise<Post> => {
    const response = await api.post('/posts', payload);
    return response.data;
  },

  updatePost: async (id: number, payload: PostUpdate): Promise<Post> => {
    const response = await api.put(`/posts/${id}`, payload);
    return response.data;
  },

  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },
};
