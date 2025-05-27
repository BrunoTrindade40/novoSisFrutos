// FormRastreamento.tsximport { useState } from 'react';
import { useState } from 'react';
import { Paper, Button, Typography, CircularProgress } from '@mui/material';
import { useForm, type SubmitHandler, type Control } from 'react-hook-form'; // Importar Control
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import type { Produto } from '../../../types/Produto';
import { ProdutoDetalhes } from '../../Produtos/ProdutoDetalhes';
import { buscarProdutoPorCodigo } from '../../../services/api';
import { FormInput } from './FormInput'; // O FormInput corrigido
import { MensagemErro } from './MensagemErro'; // A MensagemErro adaptada

const formSchema = z.object({
  codigo: z
    .string({ required_error: 'Campo obrigatório' })
    .min(1, { message: 'Campo obrigatório' })
    .regex(/^\d{3}-\d{3}\.\d{3}\.\d{3}$/, { message: 'Formato inválido: Ex: 000-000.000.000' }),
});
type FormValues = z.infer<typeof formSchema>;

export function FormRastreamento() {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
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

      if (!response.ok) {
        let errorBody = await response.text();
        try {
          const jsonError = JSON.parse(errorBody);
          errorBody = jsonError.message || errorBody;
        } catch (e) {
          // Não é JSON, usa o texto puro
        }
        throw new Error(`Erro ${response.status}: ${errorBody || 'Ocorreu um erro desconhecido.'}`);
      }

      const result: Produto = await response.json();

      if (!result || Object.keys(result).length === 0) {
        setErro('Produto não encontrado para o código informado.');
        setProduto(null);
      } else {
        setProduto(result);
        reset();
      }
    } catch (error) {
      console.error('Erro ao enviar o código:', error);
      if (error instanceof Error) {
        setErro(`Falha na busca: ${error.message}`);
      } else {
        setErro('Falha na busca. Verifique o código ou tente novamente.');
      }
      setProduto(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper
          sx={{
            backgroundColor: 'primary.main',
            elevation: 3,
            p: 2,
            mb: 4,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >

          {/* Componente FormInput */}
          <FormInput
            control={control as Control<FormValues>} // Especificar o tipo do control
            name="codigo"
            label="Código"
            placeholder="000-000.000.000"
            error={errors.codigo?.message}
            loading={loading}
          />

          {/* Botão ENVIAR */}
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={loading}
            sx={{
              color: 'white',
              flexShrink: 0,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'ENVIAR'}
          </Button>
        </Paper>
      </form>

      {/* Exibição de Mensagem de Erro */}
      {erro && <MensagemErro mensagem={erro} />}

      {/* Exibição dos Detalhes do Produto */}
      {produto && <ProdutoDetalhes produto={produto} />}
    </>
  );
}