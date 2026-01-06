import { useState, useCallback } from 'react';
import { z } from 'zod';
import { formatFormDataError, createFormDataValidator } from '@/validators/formData';

interface FormDataValidationError {
  field: string;
  message: string;
}

interface UseFormDataValidationOptions<T> {
  schema: z.ZodType<T>;
  onSubmit: (formData: FormData) => Promise<void>;
  onSuccess?: () => void;
  onError?: (errors: FormDataValidationError[]) => void;
}

export function useFormDataValidation<T extends Record<string, unknown>>({
  schema,
  onSubmit,
  onSuccess,
  onError,
}: UseFormDataValidationOptions<T>) {
  const [errors, setErrors] = useState<FormDataValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = useCallback((data: unknown) => {
    const validator = createFormDataValidator(schema);
    const result = validator(data);

    if (!result.success) {
      const formattedErrors = formatFormDataError(result.error);
      const errorArray = Object.entries(formattedErrors).map(([field, message]) => ({
        field,
        message,
      }));
      setErrors(errorArray);
      return { isValid: false, errors: errorArray };
    }

    setErrors([]);
    return { isValid: true, errors: [], data: result.data };
  }, [schema]);

  const handleSubmit = useCallback(async (data: T) => {
    const validation = validate(data);

    if (!validation.isValid) {
      onError?.(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = createFormDataFromData(validation.data!);
      await onSubmit(formData);
      onSuccess?.();
      setErrors([]);
    } catch (error) {
      // You can add server error handling here
    } finally {
      setIsSubmitting(false);
    }
  }, [validate, onSubmit, onSuccess, onError]);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const getFieldError = useCallback((field: string) => {
    return errors.find(error => error.field === field)?.message;
  }, [errors]);

  return {
    errors,
    isSubmitting,
    validate,
    handleSubmit,
    clearErrors,
    getFieldError,
    hasErrors: errors.length > 0,
  };
}

// Helper function (import from validators or duplicate here if needed)
function createFormDataFromData<T extends Record<string, unknown>>(data: T): FormData {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === 'object' && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
}