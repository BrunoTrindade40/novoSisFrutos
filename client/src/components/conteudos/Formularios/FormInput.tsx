import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { type InputBaseComponentProps } from '@mui/material/InputBase';

interface CustomMaskInputProps extends InputBaseComponentProps {
  mask: string | (string | RegExp)[];
  unmask?: boolean;
  onAccept?: (value: string, mask: any, e: any) => void;
  overwrite?: boolean;
}

const MaskedInput = React.forwardRef<HTMLInputElement, CustomMaskInputProps>(
  function MaskedInput(props, ref) {
    const { onChange, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="000-000.000.000"
        unmask={false}
        onAccept={(value: string, _mask: any, _e: any) => {
          if (onChange) {
            onChange({
              target: { name: props.name, value: value } as HTMLInputElement,
            });
          }
        }}
        overwrite
        inputRef={ref}
      />
    );
  }
);

interface FormInputProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  error?: string;
  loading: boolean;
  ariaLabel?: string;
}

export function FormInput({
  control,
  name,
  label,
  placeholder,
  error,
  loading,
  ariaLabel,
}: FormInputProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { invalid } }) => (
        <TextField
          {...field}
          label={label}
          placeholder={placeholder}
          fullWidth
          variant="filled"
          error={invalid}
          helperText={error}
          disabled={loading}
          // SOLUÇÃO: Migração de InputProps/inputProps para slotProps
          slotProps={{
            input: {
              // Cast 'as any' para garantir compatibilidade de tipos com o componente de máscara customizado
              inputComponent: MaskedInput as any,
              disableUnderline: true,
            },
            htmlInput: {
              'aria-label': ariaLabel,
            },
          }}
          sx={{
            flexGrow: 1,
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderRadius: 1,
            '& .MuiInputBase-input': {
              py: 1,
              color: 'text.primary',
            },
            '& .MuiFilledInput-root': {
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'transparent',
              },
              '&.Mui-focused': {
                backgroundColor: 'transparent',
              },
            },
          }}
        />
      )}
    />
  );
}
