import { useMutation, useQuery, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

import { profileService } from '../services/profileService';
import { User } from '../types/user';
import { UserProfileUpdate } from '../types/user';

export const useProfile = (options?: { enabled?: boolean }) => {
  return useQuery(['profile'], () => profileService.getProfile(), {
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation<User, unknown, UserProfileUpdate>(
    (payload) => profileService.updateProfile(payload),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['profile'], data);
        queryClient.setQueryData(['me'], data);
        toast.success('프로필이 업데이트되었습니다.');
      },
      onError: () => {
        toast.error('프로필 업데이트에 실패했습니다.');
      },
    }
  );
};
