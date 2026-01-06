import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/posts/PostForm';
import { useCreatePost, usePost, useUpdatePost } from '../hooks/usePosts';
import { PostCreate } from '../types/post';
import { useAuth } from '../hooks/useAuth';

const PostEditorPage = (): JSX.Element => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { data: post, isLoading } = usePost(Number(id));
  const createMutation = useCreatePost();
  const updateMutation = useUpdatePost();

  useEffect(() => {
    if (!user && !authLoading) {
      navigate('/login', { state: { from: '/posts/new' } });
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = (payload: PostCreate) => {
    if (isEditing && id) {
      updateMutation.mutate(
        { id: Number(id), payload },
        {
          onSuccess: () => navigate(`/posts/${id}`),
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: (created) => navigate(`/posts/${created.id}`),
      });
    }
  };

  if (isEditing && isLoading) {
    return <div className="text-sm text-gray-500">불러오는 중...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? '글 수정' : '새 글 작성'}
        </h1>
        <p className="text-gray-600 mt-1">
          마크다운으로 내용을 작성하고 상태를 설정하세요.
        </p>
      </div>
      <PostForm
        initial={post}
        loading={createMutation.isLoading || updateMutation.isLoading}
        onSubmit={handleSubmit}
        submitLabel={isEditing ? '수정하기' : '발행하기'}
      />
    </div>
  );
};

export default PostEditorPage;
