import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { type InputBaseComponentProps } from '@mui/material/InputBase';

// Nenhuma mudança necessária aqui
interface CustomMaskInputProps extends InputBaseComponentProps {
  mask: string | (string | RegExp)[];
  unmask?: boolean;
  onAccept?: (value: string, mask: any, e: any) => void;
  overwrite?: boolean;
}

// Nenhuma mudança necessária aqui
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
          // Propriedades padrão do TextField que são passadas pelo Controller
          {...field}
          // Propriedades do TextField
          label={label}
          placeholder={placeholder}
          fullWidth
          variant="filled"
          error={invalid}
          helperText={error}
          disabled={loading}
          // *** INÍCIO DA ADAPTAÇÃO ***

          // Propriedades para o COMPONENTE de input (o wrapper 'div')
          InputProps={{
            // <-- Com 'I' maiúsculo
            inputComponent: MaskedInput,
            disableUnderline: true, // Para a variante "filled"
          }}
          // Propriedades para o ELEMENTO <input> interno
          inputProps={{
            // <-- Com 'i' minúsculo
            'aria-label': ariaLabel,
          }}
          // *** FIM DA ADAPTAÇÃO ***

          // Estilos específicos para o TextField e seu input
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
