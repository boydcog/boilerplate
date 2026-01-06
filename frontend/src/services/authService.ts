import { api } from './api';
import { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth';

export const authService = {
  register: async (payload: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', payload);
    return response.data;
  },
  login: async (payload: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', payload);
    return response.data;
  },
  me: async (): Promise<AuthResponse['user']> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
