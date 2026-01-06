import PostCard from './PostCard';
import { Post } from '../../types/post';

interface PostListProps {
  posts: Post[];
  loading?: boolean;
  onEdit?: ((post: Post) => void) | undefined;
  onDelete?: ((post: Post) => void) | undefined;
  showActions?: boolean;
}

const PostList = ({
  posts,
  loading = false,
  onEdit,
  onDelete,
  showActions = false,
}: PostListProps): JSX.Element => {
  if (loading) {
    return <div className="text-sm text-gray-500">로딩 중...</div>;
  }

  if (posts.length === 0) {
    return (
      <div className="text-sm text-gray-500 border rounded-lg p-4 bg-white">
        아직 등록된 글이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
          showActions={showActions}
        />
      ))}
    </div>
  );
};

export default PostList;
