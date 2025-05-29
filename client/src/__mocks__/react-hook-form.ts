import React from 'react';
import { vi } from 'vitest';

export const useForm = vi.fn(() => ({
  register: vi.fn(),
  handleSubmit: vi.fn((cb: any) => () => cb({ codigo: '123-456.789.012' })),
  setValue: vi.fn(),
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
      value: '',
    })),
    getValues: vi.fn(),
    setValue: vi.fn(),
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
}));

export const useFormContext = vi.fn(() => ({ control: (useForm as any)().control }));

export const Controller = ({ render }: any) => {
  return render({
    field: {
      onChange: vi.fn(),
      onBlur: vi.fn(),
      value: '',
      name: '',
      ref: vi.fn(),
    },
    fieldState: {
      error: undefined,
    },
  });
};