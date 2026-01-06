import { FormEvent, useEffect, useState } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useProfile, useUpdateProfile } from '../hooks/useProfile';

const ProfilePage = (): JSX.Element => {
  const { user, token } = useAuth();
  const { data: profile } = useProfile({ enabled: !!token });
  const updateMutation = useUpdateProfile();
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name);
      setBio(profile.bio || '');
      setAvatar(profile.avatar_url || '');
    }
  }, [profile]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      display_name: displayName,
      bio,
      avatar_url: avatar,
    });
  };

  if (!token) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">프로필 설정</h1>
        <p className="text-gray-600 mt-1">
          공개 프로필 정보를 업데이트하세요.
        </p>
      </div>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input label="이메일" value={user?.email || ''} disabled />
          <Input
            label="닉네임"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              소개
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <Input
            label="아바타 이미지 URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="https://..."
          />
          <Button type="submit" loading={updateMutation.isLoading}>
            저장
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
