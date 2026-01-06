import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import Button from '../components/ui/Button';
import PostCard from '../components/posts/PostCard';
import { usePosts } from '../hooks/usePosts';

const HomePage = (): JSX.Element => {
  const { data: posts = [], isLoading, refetch } = usePosts({
    status: 'published',
    limit: 20,
  });

  const trendingTags = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach((post) => {
      (post.tags || []).forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([tag, count]) => ({ tag, count }));
  }, [posts]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <div className="bg-white/80 backdrop-blur border border-slate-200 rounded-2xl p-8 shadow-sm relative overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-sky-100/70 to-transparent pointer-events-none" />
          <div className="space-y-4 relative z-10">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-600 font-semibold">
              Community Feed
            </p>
            <h1 className="text-4xl font-bold text-slate-900 leading-tight">
              커뮤니티 피드에서 관심사를 찾아보세요
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl">
              피드에서 글을 둘러보고, 태그로 관심사를 빠르게 찾아보세요.
              최신 트렌드를 한눈에 확인할 수 있습니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/posts/new">
                <Button size="lg">글 작성하기</Button>
              </Link>
              <Link to="/posts">
                <Button variant="secondary" size="lg">
                  전체 피드 보기
                </Button>
              </Link>
              <Button variant="secondary" onClick={() => refetch()}>
                새로고침
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[2fr,1fr] gap-6 items-start">
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Live Feed
                </p>
                <h2 className="text-2xl font-bold text-slate-900">
                  커뮤니티 최신 글
                </h2>
              </div>
              <Link to="/my-posts" className="text-sm text-sky-700 hover:underline">
                내 글 관리 →
              </Link>
            </div>
            {isLoading ? (
              <div className="text-sm text-slate-500">피드를 불러오는 중...</div>
            ) : posts.length === 0 ? (
              <div className="border border-dashed border-slate-200 rounded-xl p-6 text-center bg-white/60">
                <p className="text-slate-600 mb-3">
                  아직 발행된 글이 없습니다. 첫 글을 작성해보세요!
                </p>
                <Link to="/posts/new">
                  <Button>첫 글 작성하기</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} showActions={false} />
                ))}
              </div>
            )}
          </section>

          <aside className="space-y-4">
            <div className="bg-white/80 border border-slate-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-slate-900 mb-3">
                트렌딩 태그
              </h3>
              {trendingTags.length === 0 ? (
                <p className="text-sm text-slate-500">
                  태그가 곧 채워질 거예요. 글을 발행해보세요.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((item) => (
                    <Link
                      key={item.tag}
                      to={`/posts?tag=${encodeURIComponent(item.tag)}`}
                      className="px-3 py-1.5 rounded-full bg-sky-100 text-sky-700 text-xs font-semibold hover:bg-sky-200"
                    >
                      #{item.tag}{' '}
                      <span className="text-slate-500 font-normal">
                        {item.count}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white/80 border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-semibold text-slate-900">
                빠른 액션
              </h3>
              <div className="space-y-2">
                <Link
                  to="/posts/new"
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-sky-50 text-sky-800 hover:bg-sky-100"
                >
                  새 글 작성하기 <span>→</span>
                </Link>
                <Link
                  to="/my-posts"
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 text-slate-800 hover:bg-slate-100"
                >
                  내 글 관리 <span>→</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 text-slate-800 hover:bg-slate-100"
                >
                  프로필 설정 <span>→</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
