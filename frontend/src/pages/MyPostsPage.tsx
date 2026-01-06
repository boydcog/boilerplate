import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostList from '../components/posts/PostList';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useDeletePost, usePosts } from '../hooks/usePosts';
import { PostStatus } from '../types/post';
import Input from '../components/ui/Input';

const MyPostsPage = (): JSX.Element => {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState<PostStatus | ''>('');
  const [search, setSearch] = useState('');
  const { data: posts = [], isLoading } = usePosts(
    {
      mine: true,
      status: status || undefined,
      search: search || undefined,
    },
    { enabled: !!user }
  );
  const deleteMutation = useDeletePost();

  const handleDelete = (postId: number) => {
    if (window.confirm('글을 삭제하시겠습니까?')) {
      deleteMutation.mutate(postId);
    }
  };

  if (!authLoading && !user) {
    return <div className="max-w-5xl mx-auto">로그인이 필요합니다.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">내 글 관리</h1>
          <p className="text-gray-600 mt-1">
            {user?.display_name}님의 글을 관리하세요.
          </p>
        </div>
        <Button onClick={() => navigate('/posts/new')}>새 글 작성</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Input
          label="검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="제목/내용"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            상태
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            value={status}
            onChange={(e) => setStatus(e.target.value as PostStatus | '')}
          >
            <option value="">전체</option>
            <option value="published">발행</option>
            <option value="draft">임시저장</option>
            <option value="private">비공개</option>
          </select>
        </div>
      </div>
      <PostList
        posts={posts}
        loading={isLoading}
        showActions
        onEdit={(post) => navigate(`/posts/${post.id}/edit`)}
        onDelete={(post) => handleDelete(post.id)}
      />
    </div>
  );
};

export default MyPostsPage;
