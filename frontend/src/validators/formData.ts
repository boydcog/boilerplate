import { z } from 'zod';

// Base validation schema for file uploads
export const fileSchema = z.object({
  file: z.instanceof(File, {
    message: "파일이 필요합니다",
  }),
}).refine(
  (data) => {
    const file = data.file;
    // Check file size (max 5MB by default)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return false;
    }

    // Check file type (adjust as needed)
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
      'text/plain',
    ];

    return allowedTypes.includes(file.type);
  },
  {
    message: "파일 크기는 최대 5MB여야 하며, JPEG, PNG, WebP, PDF, TXT만 허용됩니다",
    path: ['file'],
  }
);

// FormData validation schema example for item creation with file
export const createItemWithFileSchema = z.object({
  title: z.string().min(1, "제목은 필수입니다").max(255, "제목은 최대 255자입니다"),
  description: z.string().max(1000, "설명은 최대 1000자입니다").optional(),
  is_active: z.boolean().default(true),
  file: fileSchema.shape.file,
});

// FormData validation schema for multiple files
export const createItemWithMultipleFilesSchema = z.object({
  title: z.string().min(1, "제목은 필수입니다").max(255, "제목은 최대 255자입니다"),
  description: z.string().max(1000, "설명은 최대 1000자입니다").optional(),
  is_active: z.boolean().default(true),
  files: z.array(fileSchema).min(1, "최소 1개의 파일이 필요합니다").max(5, "최대 5개의 파일만 업로드할 수 있습니다"),
});

// Generic FormData validator factory
export function createFormDataValidator<T extends z.ZodTypeAny>(schema: T) {
  return (data: unknown) => {
    return schema.safeParse(data);
  };
}

// Error message formatter for Zod errors
export function formatFormDataError(error: z.ZodError<unknown>): Record<string, string> {
  const errors: Record<string, string> = {};

  error.issues.forEach((issue: any) => {
    const path = issue.path.join('.');
    errors[path] = issue.message;
  });

  return errors;
}

// Transform validated data to FormData
export function createFormDataFromData<T extends Record<string, unknown>>(
  data: T,
  fileKeys: string[] = []
): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (fileKeys.includes(key) && value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === 'object' && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
}