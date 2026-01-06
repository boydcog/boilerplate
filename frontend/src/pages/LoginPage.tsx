import { FormEvent, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const LoginPage = (): JSX.Element => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const from = (location.state as { from?: string })?.from || '/';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login({ email, password }, () => navigate(from));
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-sm border border-gray-200 rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">로그인</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          로그인
        </Button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        계정이 없나요?{' '}
        <Link className="text-blue-600 hover:underline" to="/register">
          회원가입
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
