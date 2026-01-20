import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Alert, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import {
  buscarRastreio,
  type RastreioResponse,
} from '../../../services/apiService';
import { ProdutoDetalhes } from '../../Produtos/ProdutoDetalhes';
import { type Produto } from '../../../types/Produto';
import { aplicaMascaraRastreio } from '../../../utils/maskUtils';

const adaptarParaProduto = (data: RastreioResponse): Produto => {
  return {
    produto: data.nomeProduto,
    lote: data.lote || 'Não informado',
    produtor: data.produtorEmpresa,
    dataColheita: data.dataColheita,
    origem: data.cidade,
    talhao: data.talhaoRomaneio,
    embalador: data.nomeEmbalador,
    dataChegada: data.dataChegada,
    embalagem: data.embalagem,
    codigoCaixa: data.codigoCaixa,
    endereco: data.endereco,
    cidade: data.cidade,
    tamanhoProduto: data.tamanhoProduto,
  };
};

export function FormRastreamento() {
  const { codigoNaUrl } = useParams<{ codigoNaUrl: string }>();
  const navigate = useNavigate();

  const [codigoInput, setCodigoInput] = useState('');
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (codigoNaUrl) {
      const mascarado = aplicaMascaraRastreio(codigoNaUrl);
      setCodigoInput(mascarado);
      realizarBusca(codigoNaUrl);
    } else {
      setCodigoInput('');
      setProduto(null);
      setErro(null);
    }
  }, [codigoNaUrl]);

  const realizarBusca = async (cod: string) => {
    const limpo = cod.replace(/\D/g, '');
    if (limpo.length < 5) {
      if (cod) setErro('Código muito curto.');
      return;
    }

    setLoading(true);
    setErro(null);
    setProduto(null);

    try {
      const dados = await buscarRastreio(limpo);
      if (dados) {
        setProduto(adaptarParaProduto(dados));
      } else {
        setErro('Produto não encontrado.');
      }
    } catch (err: any) {
      console.error('Erro front:', err);
      setErro(err.message || 'Erro ao buscar produto.');
      setProduto(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const limpo = codigoInput.replace(/\D/g, '');
    if (limpo) {
      navigate(`/rastrear/${codigoInput}`);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
      >
        <TextField
          fullWidth
          label="Código de Rastreio"
          placeholder="Ex: 002.000.000.947"
          value={codigoInput}
          onChange={(e) =>
            setCodigoInput(aplicaMascaraRastreio(e.target.value))
          }
          disabled={loading}
          autoFocus
          // SOLUÇÃO: Migração para slotProps
          slotProps={{
            input: {
              style: { backgroundColor: '#fff' }, // Estilo do container do input
            },
            htmlInput: {
              inputMode: 'numeric',
              maxLength: 18,
              // 'aria-label': 'Código de Rastreio' // Boa prática de acessibilidade
            },
          }}
          // Estilização movida para 'sx' para evitar problemas de tipagem e warnings em inputProps
          sx={{
            '& .MuiInputBase-input': {
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              padding: { xs: '12px 14px', sm: '16.5px 14px' },
              letterSpacing: { xs: '1px', sm: '2px' },
              textAlign: 'center',
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading || !codigoInput}
          startIcon={!loading && <SearchIcon />}
          sx={{ py: 1.5, fontWeight: 'bold' }}
        >
          {loading ? 'Consultando...' : 'Rastrear Produto'}
        </Button>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {erro && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Alert severity="error" sx={{ width: '100%', borderRadius: 2 }}>
            {erro}
          </Alert>
        </Box>
      )}

      {produto && !loading && (
        <Box sx={{ mt: 4, animation: 'fadeIn 0.6s ease-out' }}>
          <ProdutoDetalhes produto={produto} />
        </Box>
      )}

      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </Box>
  );
}
