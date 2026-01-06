import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useFormDataValidation } from '@/hooks/useFormDataValidation';
import { createItemWithFileSchema } from '@/validators/formData';
import toast from 'react-hot-toast';

interface FormDataValues {
  title: string;
  description?: string | undefined;
  is_active: boolean;
  file: File;
  [key: string]: unknown;
}

const FormDataDemo: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const { handleSubmit: handleValidationSubmit, getFieldError, clearErrors } = useFormDataValidation<FormDataValues>({
    schema: createItemWithFileSchema,
    onSubmit: async (formData) => {
      try {
        // Add loading state
        toast.loading('업로드 중...');

        // API call example
        const response = await fetch('/api/items', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('업로드 실패');
        }

        toast.success('업로드 완료!');
      } catch (error) {
        toast.error('업로드 실패했습니다');
        throw error;
      }
    },
    onError: (validationErrors) => {
      validationErrors.forEach(error => {
        toast.error(`${error.field}: ${error.message}`);
      });
    },
    onSuccess: () => {
      toast.success('폼이 성공적으로 제출되었습니다');
    },
  });

  const { register, handleSubmit: rhfHandleSubmit } = useForm<FormDataValues>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Clear file error when a new file is selected
      clearErrors();
    }
  };

  const onFormSubmit = (data: FormDataValues) => {
    // Combine file with other form data
    const formDataWithFile = {
      ...data,
      file: file!,
    };
    handleValidationSubmit(formDataWithFile);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">FormData 업로드 예제</h2>

      <form onSubmit={rhfHandleSubmit(onFormSubmit)} className="space-y-4">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            제목 *
          </label>
          <input
            {...register('title', { required: true })}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="제목을 입력하세요"
          />
          {getFieldError('title') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('title')}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            설명
          </label>
          <textarea
            {...register('description')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="설명을 입력하세요"
            rows={3}
          />
          {getFieldError('description') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('description')}</p>
          )}
        </div>

        {/* File Upload Field */}
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
            파일 *
          </label>
          <input
            {...register('file', { required: true })}
            type="file"
            onChange={onFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {file && (
            <p className="mt-1 text-sm text-gray-600">
              선택된 파일: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
          {getFieldError('file') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError('file')}</p>
          )}
        </div>

        {/* Active Checkbox */}
        <div className="flex items-center">
          <input
            {...register('is_active')}
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
            활성화
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          disabled={!file}
        >
          제출하기
        </button>
      </form>
    </div>
  );
};

export default FormDataDemo;