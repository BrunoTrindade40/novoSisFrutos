import { Box } from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  codigo: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .regex(/^\d{3}-\d{3}\.\d{3}\.\d{3}$/, 'Formato inválido'),
});
type FormValues = z.infer<typeof formSchema>;
export function FormRastreamento() {
  const {
    register,
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
          <input
            type="text"
            {...register('codigo', { required: 'Campo obrigatório' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            id="codigo"
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
