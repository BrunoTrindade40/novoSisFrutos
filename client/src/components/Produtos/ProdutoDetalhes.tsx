import { Box, Typography, Paper, Divider } from '@mui/material'; // Adicionar Typography e Paper
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
          gap: { xs: 2 },
          justifyContent: 'flex-start',
        }}
      >
        <Box sx={{ minWidth: { xs: '100%', sm: 250 } }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Código:</strong> {produto.codigoCaixa}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Produto:</strong> {produto.nomeProduto}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Embalador:</strong> {produto.nomeEmbalador}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Embalagem:</strong> {produto.embalagem}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Data da Colheita:</strong>
            {new Date(produto.dataColheita).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Data de Chegada:</strong>
            {new Date(produto.dataChegada).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Produtor:</strong> {produto.produtorEmpresa}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Endereço:</strong> {produto.endereco} - {produto.cidade}
          </Typography>
        </Box>

        <Box sx={{ minWidth: { xs: '100%', sm: 250 } }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Romaneio:</strong> {produto.numeroRomaneio} -
            {produto.talhaoRomaneio}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ my: 3 }} />
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 2, md: 6 },
          justifyContent: 'flex-start',
        }}
      >
        <Box sx={{ minWidth: { xs: '100%', sm: 250 } }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>GGN:</strong>4063061703682
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Registration Number:</strong>PLCH17063
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
