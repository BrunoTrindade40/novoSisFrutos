import React, { useState } from 'react';
import { vi } from 'vitest';

export const useForm = () => {
const [values, setValues] = useState<Record<string, any>>({});

  const setValue = (name: string, value: any) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const getValue = (name: string) => values[name] || '';

  return {
    register: vi.fn((name) => ({
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(name, e),
      onBlur: vi.fn(),
      value: getValue(name),
      name,
      ref: vi.fn(),
    })),
    handleSubmit: vi.fn((cb: any) => () => cb(values)), // Passa os valores para o onSubmit
    setValue,
    reset: vi.fn(),
    control: {
      _subjects: {
        mount: { subscribe: vi.fn() },
        unmount: { subscribe: vi.fn() },
        array: { subscribe: vi.fn() },
        watch: { subscribe: vi.fn() },
        blur: { subscribe: vi.fn() },
        change: { subscribe: vi.fn() },
      },
      _removeUnmounted: vi.fn(),
      _names: {
        mount: new Set(),
        unmount: new Set(),
        array: [],
        watch: new Set(),
      },
      _state: {
        mount: false,
        watch: false,
        valid: true,
        errors: {},
        dirty: false,
        isValidating: false,
        touched: {},
        defaultValues: {},
        isSubmitting: false,
        submitCount: 0,
      },
      getFieldState: vi.fn((name) => ({
        error: undefined,
        isDirty: false,
        isTouched: false,
        isValidating: false,
        value: getValue(name),
      })),
      getValues: vi.fn(() => values),
      clearErrors: vi.fn(),
      trigger: vi.fn(),
      unregister: vi.fn(),
      watch: vi.fn(),
      reset: vi.fn(),
    },
    formState: {
      errors: {},
      isValid: true,
      isDirty: false,
      isLoading: false,
      isSubmitted: false,
      isSubmitting: false,
      isSubmitSuccessful: false,
      submitCount: 0,
      dirtyFields: {},
      touchedFields: {},
      isValidating: false,
    },
  };
};

export const useFormContext = () => useForm() as any;

export const Controller = ({ render }: any) => {
  const { field } = (useForm as any)().control.register(''); // Pass a dummy name here
  return render({ field, fieldState: { invalid: false } });
};