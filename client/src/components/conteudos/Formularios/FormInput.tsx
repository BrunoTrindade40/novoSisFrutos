import { Box, Button, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';

interface FormInputProps {
  control: any;
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
  loading: boolean;
}

export function FormInput({ control,
    name,
    label,
    placeholder = '000-000.000.000',
    error,
    loading, 
  }: FormInputProps) {

  return (
    <Box display="flex" gap={2} alignItems="center" justifyContent="center">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <IMaskInput
            {...field}
            mask="000-000.000.000"
            placeholder={placeholder}
            unmask={false}
            aria-label={label}
            onAccept={(value: string) => field.onChange(value)}
          />
        )}
      />
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? 'Carregando...' : 'Enviar'}
      </Button>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </Box>
  );
}