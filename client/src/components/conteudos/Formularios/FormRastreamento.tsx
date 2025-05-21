import { useState } from 'react';
import { Paper } from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import type { Produto } from '../../../types/Produto';
import { ProdutoDetalhes } from '../../Produtos/ProdutoDetalhes';
import { buscarProdutoPorCodigo } from '../../../services/api';
import { FormInput } from './FormInput';
import { MensagemErro } from './MensagemErro';
import { Loader } from './Loader';

const formSchema = z.object({
  codigo: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .regex(/^\d{3}-\d{3}\.\d{3}\.\d{3}$/, 'Formato inválido'),
});
type FormValues = z.infer<typeof formSchema>;

export function FormRastreamento() {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    shouldFocusError: false,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    setLoading(true);
    setProduto(null);
    setErro(null);

    try {
      const response = await buscarProdutoPorCodigo(data.codigo);

      console.log(response);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      const result = await response.json();

      if (!result) {
        setErro('Produto não encontrado.');
      } else {
        setProduto(result);
      }
    } catch (error) {
      console.error('Erro ao enviar o código:', error);
      setErro('Falha no envio. Verifique o código ou tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px' }}>
        <Paper
          sx={{ backgroundColor: '#7CD2B1', elevation: 3, padding: '10px' }}
        >
          <FormInput
            control={control}
            name="codigo"
            label="Código"
            placeholder="000-000.000.000"
            error={errors.codigo?.message}
            loading={loading}
          />

          {loading && <Loader />}
          {erro && <MensagemErro mensagem={erro} />}
          {produto && <ProdutoDetalhes produto={produto} />}
        </Paper>
      </form>
    </>
  );
}
