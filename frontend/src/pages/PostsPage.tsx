import { useState } from 'react';
import PostList from '../components/posts/PostList';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { usePosts } from '../hooks/usePosts';

const PostsPage = (): JSX.Element => {
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const { data: posts = [], isLoading, refetch } = usePosts({
    search: search || undefined,
    tag: tag || undefined,
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">블로그 글</h1>
          <p className="text-gray-600 mt-1">
            최신 글을 탐색하고 읽어보세요.
          </p>
        </div>
        <Button variant="secondary" onClick={() => refetch()}>
          새로고침
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input
          label="검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="제목/내용/요약 검색"
        />
        <Input
          label="태그 필터"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="태그 입력"
        />
      </div>
      <PostList posts={posts} loading={isLoading} />
    </div>
  );
};

export default PostsPage;
