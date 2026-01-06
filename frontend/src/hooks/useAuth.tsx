import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import toast from 'react-hot-toast';

import { authService } from '../services/authService';
import { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth';
import { User } from '../types/user';

interface AuthContextValue {
  user: User | undefined;
  token: string | null;
  isLoading: boolean;
  login: (payload: LoginRequest, onSuccess?: () => void) => void;
  register: (payload: RegisterRequest, onSuccess?: () => void) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [token, setToken] = useState<string | null>(() =>
    typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  );
  const queryClient = useQueryClient();

  useEffect(() => {
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      localStorage.removeItem('access_token');
    }
  }, [token]);

  const { data: user, isLoading } = useQuery(
    ['me'],
    () => authService.me(),
    {
      enabled: !!token,
      retry: false,
    }
  );

  const handleAuthSuccess = (data: AuthResponse) => {
    setToken(data.access_token);
    queryClient.setQueryData(['me'], data.user);
    toast.success('로그인되었습니다.');
  };

  const loginMutation = useMutation<AuthResponse, unknown, LoginRequest>(
    (payload) => authService.login(payload),
    {
      onSuccess: (data) => {
        handleAuthSuccess(data);
      },
      onError: () => {
        toast.error('로그인에 실패했습니다.');
      },
    }
  );

  const registerMutation = useMutation<AuthResponse, unknown, RegisterRequest>(
    (payload) => authService.register(payload),
    {
      onSuccess: (data) => {
        handleAuthSuccess(data);
      },
      onError: () => {
        toast.error('회원가입에 실패했습니다.');
      },
    }
  );

  const logout = () => {
    setToken(null);
    queryClient.removeQueries(['me']);
    toast.success('로그아웃되었습니다.');
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      login: (payload: LoginRequest, onSuccess?: () => void) =>
        loginMutation.mutate(payload, {
          onSuccess: (data) => {
            handleAuthSuccess(data);
            onSuccess?.();
          },
        }),
      register: (payload: RegisterRequest, onSuccess?: () => void) =>
        registerMutation.mutate(payload, {
          onSuccess: (data) => {
            handleAuthSuccess(data);
            onSuccess?.();
          },
        }),
      logout,
    }),
    [user, token, isLoading, loginMutation, registerMutation]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
