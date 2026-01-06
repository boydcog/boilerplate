import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { Post } from '../../types/post';

interface PostCardProps {
  post: Post;
  onEdit?: ((post: Post) => void) | undefined;
  onDelete?: ((post: Post) => void) | undefined;
  showActions?: boolean;
}

const PostCard = ({
  post,
  onEdit,
  onDelete,
  showActions = false,
}: PostCardProps): JSX.Element => {
  const tags = post.tags ?? [];
  const createdDate = new Date(post.created_at).toLocaleDateString();

  return (
    <div className="group bg-white/80 backdrop-blur shadow-sm border border-slate-200 rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="px-2 py-1 rounded-full bg-sky-50 text-sky-700 font-semibold uppercase">
              {post.status}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span>{createdDate}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
            <span className="font-medium text-slate-700">
              {post.author.display_name}
            </span>
          </div>
          <Link
            to={`/posts/${post.id}`}
            className="text-xl font-semibold text-slate-900 hover:text-sky-600 transition-colors"
          >
            {post.title}
          </Link>
          {post.summary && (
            <p className="text-sm text-slate-700 line-clamp-2">{post.summary}</p>
          )}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-sky-100 text-sky-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        {showActions && (
          <div className="flex flex-col gap-2">
            <Button variant="secondary" size="sm" onClick={() => onEdit?.(post)}>
              수정
            </Button>
            <Button variant="danger" size="sm" onClick={() => onDelete?.(post)}>
              삭제
            </Button>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-sky-400" />
          <span>조회 {post.view_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-slate-300" />
          <span>좋아요 {post.like_count}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
