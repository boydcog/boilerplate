import { api } from './api';
import { User, UserProfileUpdate } from '../types/user';

export const profileService = {
  getProfile: async (): Promise<User> => {
    const response = await api.get('/profile');
    return response.data;
  },
  updateProfile: async (payload: UserProfileUpdate): Promise<User> => {
    const response = await api.put('/profile', payload);
    return response.data;
  },
};
