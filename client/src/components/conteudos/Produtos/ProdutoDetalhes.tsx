import React from 'react';
import { Box, Paper, Typography, Chip, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import InventoryIcon from '@mui/icons-material/Inventory';
import { type Produto } from '../../../types/Produto';

interface Props {
  produto: Produto;
}

export const ProdutoDetalhes: React.FC<Props> = ({ produto }) => {
  const formatarData = (dataString: string) => {
    try {
      return new Date(dataString).toLocaleDateString('pt-BR');
    } catch {
      return dataString;
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        overflow: 'hidden',
        borderRadius: 3,
        // Borda superior colorida baseada na marca (BS=Azul, União=Laranja)
        borderTop: (theme) => `6px solid ${theme.palette.primary.main}`,
      }}
    >
      {/* Cabeçalho do Produto */}
      <Box sx={{ p: 4, bgcolor: 'background.default', textAlign: 'center' }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ letterSpacing: 2 }}
        >
          Produto Rastreável
        </Typography>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}
        >
          {produto.produto}
        </Typography>
        <Chip
          icon={<InventoryIcon />}
          label={`Lote: ${produto.lote}`}
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 'bold' }}
        />
      </Box>

      <Divider />

      {/* Conteúdo Principal Flexbox */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Coluna no Mobile, Linha no Desktop
          p: 4,
          gap: { xs: 4, md: 6 }, // Espaçamento responsivo entre colunas
        }}
      >
        {/* COLUNA ESQUERDA: Informações do Produtor */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <AgricultureIcon color="action" fontSize="large" />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Produtor
              </Typography>
              <Typography variant="h6">{produto.produtor}</Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <LocationOnIcon color="error" fontSize="large" />
            <Box>
              <Typography variant="caption" color="text.secondary">
                Origem
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {produto.origem}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* COLUNA DIREITA: Dados Técnicos */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Linha da Data */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <EventIcon fontSize="small" color="primary" />
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Colheita: {formatarData(produto.dataColheita)}
            </Typography>
          </Box>

          {/* Cards Flexíveis para Talhão e Embalador */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Paper variant="outlined" sx={{ flex: 1, p: 1.5, borderRadius: 2 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Talhão
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {produto.talhao}
              </Typography>
            </Paper>

            <Paper variant="outlined" sx={{ flex: 1, p: 1.5, borderRadius: 2 }}>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
              >
                Embalador
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PersonIcon fontSize="small" sx={{ opacity: 0.6 }} />
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {produto.embalador}
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
