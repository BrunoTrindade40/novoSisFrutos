import React, { useEffect, useRef } from 'react'; // Removido useState daqui
import { useNavigate, useParams } from 'react-router-dom';
import { Paper, Button, CircularProgress } from '@mui/material';
import { useForm, type SubmitHandler, type Control } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from './FormInput';

import { buscarProdutoPorCodigo } from '../../../services/api';
import type { Produto } from '../../../types/Produto';

const formSchema = z.object({
  codigo: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .regex(/^\d{3}-\d{3}\.\d{3}\.\d{3}$/, {
      message: 'Formato inválido: Ex: 000-000.000.000',
    }),
});

export type FormValues = z.infer<typeof formSchema>;

// 1. ADICIONAR a prop 'isLoading' na interface
interface FormRastreamentoProps {
  onSearchResult: (result: {
    produto: Produto | null;
    erro: string | null;
  }) => void;
  isLoading: boolean; // Prop adicionada!
  initialCodigo?: string;
}

export function FormRastreamento({
  onSearchResult,
  isLoading,
  initialCodigo,
}: FormRastreamentoProps) {
  // 2. REMOVER o estado de loading local. Ele agora vem das props.
  // const [loading, setLoading] = useState(false); // <--- LINHA REMOVIDA

  const navigate = useNavigate();
  const { codigoNaUrl } = useParams<{ codigoNaUrl?: string }>();
  const initialSubmitRef = useRef(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { codigo: '' },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    // 3. REMOVER as chamadas setLoading(). O pai agora controla isso.
    // setLoading(true); // <--- LINHA REMOVIDA
    onSearchResult({ produto: null, erro: null });

    try {
      const response = await buscarProdutoPorCodigo(data.codigo);
      if (!response.ok) {
        throw new Error('Produto não encontrado ou falha na comunicação.');
      }
      const result: Produto = await response.json();

      if (!result || Object.keys(result).length === 0) {
        onSearchResult({
          produto: null,
          erro: 'Produto não encontrado para o código informado.',
        });
      } else {
        onSearchResult({ produto: result, erro: null });
        reset({ codigo: '' });
        if (data.codigo !== codigoNaUrl) {
          navigate(`/rastrear/${data.codigo}`);
        }
      }
    } catch (error) {
      onSearchResult({
        produto: null,
        erro: error instanceof Error ? error.message : 'Ocorreu um erro.',
      });
    }
    // O 'finally' que chamava setLoading(false) também não é mais necessário aqui.
  };

  // O useEffect permanece igual
  useEffect(() => {
    if (initialCodigo && !initialSubmitRef.current) {
      const codigoRegex = /^\d{3}-\d{3}\.\d{3}\.\d{3}$/;
      if (codigoRegex.test(initialCodigo)) {
        setValue('codigo', initialCodigo);
        handleSubmit(onSubmit)();
        initialSubmitRef.current = true;
      }
    }
  }, [initialCodigo, setValue, handleSubmit, onSubmit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper
        sx={{
          backgroundColor: 'primary.main',
          p: 2,
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          borderRadius: 1,
        }}
      >
        <FormInput
          control={control as Control<FormValues>}
          name="codigo"
          ariaLabel="Código"
          placeholder="000-000.000.000"
          error={errors.codigo?.message}
          loading={isLoading} // 4. A prop 'loading' agora vem diretamente do pai
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={isLoading} // 5. O botão também usa a prop 'isLoading'
          sx={{ color: 'white', flexShrink: 0 }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'ENVIAR'
          )}
        </Button>
      </Paper>
    </form>
  );
}
