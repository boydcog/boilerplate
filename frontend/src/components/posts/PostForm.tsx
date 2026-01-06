import { FormEvent, useMemo, useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Post, PostCreate, PostStatus } from '../../types/post';

interface PostFormProps {
  initial?: Post | undefined;
  loading?: boolean;
  onSubmit: (payload: PostCreate) => void;
  submitLabel?: string;
}

const defaultStatus: PostStatus = 'draft';

const PostForm = ({
  initial,
  loading = false,
  onSubmit,
  submitLabel = '저장',
}: PostFormProps): JSX.Element => {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [summary, setSummary] = useState(initial?.summary ?? '');
  const [content, setContent] = useState(initial?.content ?? '');
  const [tags, setTags] = useState((initial?.tags || []).join(','));
  const [category, setCategory] = useState(initial?.category ?? '');
  const [status, setStatus] = useState<PostStatus>(initial?.status ?? defaultStatus);

  const parsedTags = useMemo(
    () =>
      tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    [tags]
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      summary: summary || undefined,
      content,
      tags: parsedTags,
      category: category || undefined,
      status,
    });
  };

  const renderMarkdown = (text: string) => {
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    const withBold = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    const withItalics = withBold.replace(/\*(.*?)\*/g, '<em>$1</em>');
    const withCode = withItalics.replace(/`(.*?)`/g, '<code>$1</code>');
    return withCode.replace(/\n/g, '<br />');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Input
        label="요약"
        value={summary || ''}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="선택 입력"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="태그(콤마로 구분)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="예: react,fastapi"
        />
        <Input
          label="카테고리"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="선택 입력"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          상태
        </label>
        <select
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={status}
          onChange={(e) => setStatus(e.target.value as PostStatus)}
        >
          <option value="draft">임시저장</option>
          <option value="published">발행</option>
          <option value="private">비공개</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          내용 (마크다운)
        </label>
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-48"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">미리보기</p>
        <div
          className="border rounded-md bg-gray-50 p-3 text-sm prose max-w-none"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content || '') }}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
