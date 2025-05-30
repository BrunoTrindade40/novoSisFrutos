import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { type InputBaseComponentProps } from '@mui/material/InputBase'; // Importe o tipo correto

// Definir a interface para o componente de máscara
// Estenda InputBaseComponentProps para incluir todas as props que o TextField pode passar
interface CustomMaskInputProps extends InputBaseComponentProps {
  // IMaskInput specific props (if not covered by InputBaseComponentProps)
  mask: string | (string | RegExp)[];
  unmask?: boolean;
  onAccept?: (value: string, mask: any, e: any) => void;
  overwrite?: boolean;
  // O 'name' já vem de InputBaseComponentProps, mas garantimos que está aqui se IMaskInput precisar dele.
  // Você pode adicionar props que são **específicas** do IMaskInput e não do InputBaseComponentProps
}

// Criar um componente de máscara que pode ser passado para o TextField
const MaskedInput = React.forwardRef<HTMLInputElement, CustomMaskInputProps>(function MaskedInput(props, ref) {
  const { onChange, ...other } = props;

  return (
    <IMaskInput
      {...other}
      mask="000-000.000.000"
      unmask={false}
      onAccept={(value: string, _mask: any, _e: any) => {
        if (onChange) {
          onChange({ target: { name: props.name, value: value } as HTMLInputElement }); // Assegura o tipo correto para o target
        }
      }}
      overwrite
      inputRef={ref}
    />
  );
});

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
          // Propriedades para o input interno do TextField
          InputProps={{
            inputComponent: MaskedInput, // Agora o tipo deve ser compatível
            disableUnderline: true, // Para a variante "filled"
            'aria-label': ariaLabel,
          }}
          // Estilos específicos para o TextField e seu input
          sx={{
            flexGrow: 1,
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderRadius: 1,
            '& .MuiInputBase-input': { // Estilos para o elemento <input> real
              py: 1,
              color: 'text.primary',
            },
            '& .MuiFilledInput-root': { // Estilos para a raiz do InputBase na variante 'filled'
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