import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = (): JSX.Element => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    register(
      { email, password, display_name: displayName },
      () => navigate('/')
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-sm border border-gray-200 rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">회원가입</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="닉네임"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
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
          가입하기
        </Button>
      </form>
      <p className="text-sm text-gray-600 mt-4">
        이미 계정이 있나요?{' '}
        <Link className="text-blue-600 hover:underline" to="/login">
          로그인
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
