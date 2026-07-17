import { useState, useCallback } from 'react';

interface UseFormConfig<T> {
  initialValues: T;
  validate?: (values: T) => Record<string, string>;
  onSubmit?: (values: T) => void;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormConfig<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const setFieldValue = useCallback((field: keyof T, value: any) => {
    setValues(prev => {
      const next = { ...prev, [field]: value };
      if (validate && touched[field as string]) {
        const nextErrors = validate(next);
        setErrors(nextErrors);
      }
      return next;
    });
  }, [validate, touched]);

  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => {
      const nextTouched = { ...prev, [field as string]: true };
      if (validate) {
        const nextErrors = validate(values);
        setErrors(nextErrors);
      }
      return nextTouched;
    });
  }, [validate, values]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const handleSubmit = useCallback(() => {
    setTouched(
      Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>)
    );

    if (validate) {
      const currentErrors = validate(values);
      setErrors(currentErrors);
      if (Object.keys(currentErrors).length > 0) {
        return { success: false, errors: currentErrors };
      }
    }

    if (onSubmit) {
      onSubmit(values);
    }
    return { success: true, errors: {} };
  }, [values, validate, onSubmit]);

  const isDirty = useMemo(() => {
    return Object.keys(values).some(key => values[key] !== initialValues[key]);
  }, [values, initialValues]);

  return {
    values,
    setValues,
    errors,
    setErrors,
    touched,
    setTouched,
    setFieldValue,
    handleBlur,
    resetForm,
    handleSubmit,
    isDirty,
  };
}

// Inline polyfill for useMemo since we didn't import it at the top
import { useMemo } from 'react';
