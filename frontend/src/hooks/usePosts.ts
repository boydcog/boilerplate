import { useMutation, useQuery, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

import { postService, PostQueryParams } from '../services/postService';
import { Post, PostCreate, PostUpdate } from '../types/post';

const QUERY_KEYS = {
  posts: (params?: PostQueryParams) => ['posts', params] as const,
  post: (id: number) => ['post', id] as const,
};

export const usePosts = (params?: PostQueryParams, options?: { enabled?: boolean }) => {
  return useQuery(QUERY_KEYS.posts(params), () => postService.getPosts(params), {
    keepPreviousData: true,
    enabled: options?.enabled ?? true,
  });
};

export const usePost = (id: number) => {
  return useQuery(QUERY_KEYS.post(id), () => postService.getPost(id), {
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<Post, unknown, PostCreate>(
    (payload) => postService.createPost(payload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
        toast.success('글이 생성되었습니다.');
      },
      onError: () => {
        toast.error('글 생성에 실패했습니다.');
      },
    }
  );
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation<Post, unknown, { id: number; payload: PostUpdate }>(
    ({ id, payload }) => postService.updatePost(id, payload),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['posts']);
        queryClient.invalidateQueries(QUERY_KEYS.post(data.id));
        toast.success('글이 업데이트되었습니다.');
      },
      onError: () => {
        toast.error('글 업데이트에 실패했습니다.');
      },
    }
  );
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation<void, unknown, number>(
    (id: number) => postService.deletePost(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['posts']);
        toast.success('글이 삭제되었습니다.');
      },
      onError: () => {
        toast.error('글 삭제에 실패했습니다.');
      },
    }
  );
};
