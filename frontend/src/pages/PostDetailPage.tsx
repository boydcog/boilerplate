import { useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useDeletePost, usePost } from '../hooks/usePosts';

const PostDetailPage = (): JSX.Element => {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: post, isLoading } = usePost(postId);
  const deleteMutation = useDeletePost();

  const renderMarkdown = useMemo(() => {
    if (!post) return '';
    const escape = (text: string) =>
      text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    const html = escape(post.content || '')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br />');
    return html;
  }, [post]);

  const handleDelete = () => {
    if (!post) return;
    if (window.confirm('글을 삭제하시겠습니까?')) {
      deleteMutation.mutate(post.id, {
        onSuccess: () => navigate('/my-posts'),
      });
    }
  };

  if (isLoading || !postId) {
    return <div className="text-sm text-gray-500">불러오는 중...</div>;
  }

  if (!post) {
    return <div className="text-sm text-gray-500">불러오는 중...</div>;
  }

  const canEdit = user?.id === post.author.id;

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {new Date(post.created_at).toLocaleDateString()} ·{' '}
            {post.status.toUpperCase()}
          </p>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">
            {post.title}
          </h1>
          <p className="text-gray-600 mt-2">{post.summary}</p>
          <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
            <span>작성자: {post.author.display_name}</span>
            <span>조회수: {post.view_count}</span>
            <span>좋아요: {post.like_count}</span>
          </div>
        </div>
        {canEdit && (
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigate(`/posts/${post.id}/edit`)}
            >
              수정
            </Button>
            <Button variant="danger" size="sm" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        )}
      </div>
      {post.tags?.length ? (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/posts?tag=${encodeURIComponent(tag)}`}
              className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-700"
            >
              #{tag}
            </Link>
          ))}
        </div>
      ) : null}
      <div
        className="bg-white border border-gray-200 rounded-lg p-4 prose max-w-none"
        dangerouslySetInnerHTML={{ __html: renderMarkdown }}
      />
    </div>
  );
};

export default PostDetailPage;
