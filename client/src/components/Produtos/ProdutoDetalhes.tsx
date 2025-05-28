import { Box, Typography, Paper } from '@mui/material'; // Adicionar Typography e Paper
import type { Produto } from '../../types/Produto';

interface Props {
  produto: Produto;
}

export function ProdutoDetalhes({ produto }: Props) {
  return (
    // Envolver tudo em um Paper para dar um visual de card aos detalhes
    <Paper
      sx={{
        mt: 4,
        p: { xs: 2, md: 4 },
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
          Detalhes do Produto
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: { xs: 2, md: 6 },
          justifyContent: { xs: 'flex-start', md: 'center' },
        }}
      >
        <Box sx={{ minWidth: { xs: '100%', sm: 250 }, mb: { xs: 2, md: 0 } }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Código:</strong> {produto.codcaixa}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Nome:</strong> {produto.cai_descricao}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Descrição:</strong> {produto.pro_descricao}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Produtor:</strong> {produto.emp_razaoSocial}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Romaneio:</strong> {produto.rom_romaneio}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Endereço:</strong> {produto.endereco}
          </Typography>
        </Box>

        <Box sx={{ minWidth: { xs: '100%', sm: 250 } }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Talhão:</strong> {produto.rom_talhao}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Quantidade Pallet:</strong> {produto.palcai_qtd}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Embalador:</strong> {produto.Cademb_nome}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Cidade:</strong> {produto.cidade}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Data da Colheita:</strong> {new Date(produto.rom_dtcolheita).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Data de Chegada:</strong> {new Date(produto.rom_dtchegada).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}