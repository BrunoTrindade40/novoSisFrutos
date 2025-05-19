import { Box } from '@mui/material';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IMaskInput } from 'react-imask';

const formSchema = z.object({
  codigo: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .regex(/^\d{3}-\d{3}\.\d{3}\.\d{3}$/, 'Formato inválido'),
});
type FormValues = z.infer<typeof formSchema>;
export function FormRastreamento() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('Dados do formulário:', data);
    console.log('Código enviado:', data.codigo);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <label htmlFor="codigo" className="block text-sm font-medium">
            Código:
          </label>
          <Controller
            name="codigo"
            control={control}
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask={'000-000.000.000'}
                placeholder={'000-000.000.000'}
                unmask={false}
              />
            )}
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Enviar
          </button>
          {errors.codigo && (
            <span className="text-red-500 text-sm">
              {errors.codigo.message}
            </span>
          )}
        </Box>
      </form>
    </>
  );
}
