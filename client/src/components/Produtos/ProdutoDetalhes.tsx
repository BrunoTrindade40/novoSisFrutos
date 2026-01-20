import React from 'react';
import { Box, Paper, Typography, Chip, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EventIcon from '@mui/icons-material/Event';
import PersonIcon from '@mui/icons-material/Person';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import InventoryIcon from '@mui/icons-material/Inventory';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { type Produto } from '../../types/Produto';

interface Props {
  produto: Produto;
}

export const ProdutoDetalhes: React.FC<Props> = ({ produto }) => {
  const formatarData = (dataString?: string | null) => {
    if (!dataString) return 'Não informado';
    try {
      // Tenta verificar se é data válida
      const date = new Date(dataString);
      if (isNaN(date.getTime())) return dataString;
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dataString;
    }
  };

  // Componente reutilizável para exibir informações com ícone
  const InfoItem = ({
    icon,
    label,
    value,
    width = '100%', // Default full width
  }: {
    icon: React.ReactNode;
    label: string;
    value: string | undefined;
    width?: string | object;
  }) => (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 2,
        width: width,
        mb: 3,
        minWidth: '280px', // Garante legibilidade em mobile
      }}
    >
      <Box sx={{ color: 'primary.main', mt: 0.5 }}>{icon}</Box>
      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          display="block"
          sx={{
            lineHeight: 1.2,
            textTransform: 'uppercase',
            fontSize: '0.75rem',
          }}
        >
          {label}
        </Typography>
        <Typography variant="body1" fontWeight="500" color="text.primary">
          {value || '-'}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Paper
      elevation={4}
      sx={{
        overflow: 'hidden',
        borderRadius: 3,
        borderTop: (theme) => `6px solid ${theme.palette.primary.main}`,
        backgroundColor: '#fff',
      }}
    >
      {/* Cabeçalho */}
      <Box sx={{ p: 3, bgcolor: 'grey.50', textAlign: 'center' }}>
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{ letterSpacing: 1.5, fontWeight: 'bold' }}
        >
          Rastreabilidade do Fruto
        </Typography>
        <Typography
          variant="h4"
          component="h1"
          sx={{ fontWeight: 'bold', color: 'primary.main', my: 1 }}
        >
          {produto.produto}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1 }}>
          <Chip
            icon={<InventoryIcon />}
            label={`Lote: ${produto.lote}`}
            color="primary"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        </Box>
      </Box>

      <Divider />

      {/* Corpo com Flexbox */}
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        {/* Container Flex Principal */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {/* Linha 1: Produtor e Origem (Full Width em mobile, 50% em desktop) */}
          <InfoItem
            width={{ xs: '100%', md: '48%' }}
            icon={<AgricultureIcon fontSize="large" />}
            label="Produtor"
            value={produto.produtor}
          />

          <InfoItem
            width={{ xs: '100%', md: '48%' }}
            icon={<LocationOnIcon fontSize="large" color="error" />}
            label="Origem / Endereço"
            value={`${produto.cidade} ${produto.endereco ? `- ${produto.endereco}` : ''}`}
          />

          <Box sx={{ width: '100%', my: 1 }}>
            <Divider variant="middle" />
          </Box>

          {/* Linha 2: Detalhes Técnicos (Wrap automático) */}
          <InfoItem
            width={{ xs: '100%', sm: '48%' }}
            icon={<EventIcon />}
            label="Data de Colheita/Entrada"
            value={formatarData(produto.dataColheita)}
          />

          <InfoItem
            width={{ xs: '100%', sm: '48%' }}
            icon={<InventoryIcon />}
            label="Talhão"
            value={produto.talhao}
          />

          <InfoItem
            width={{ xs: '100%', sm: '48%' }}
            icon={<PersonIcon />}
            label="Embalador Responsável"
            value={produto.embalador}
          />

          <InfoItem
            width={{ xs: '100%', sm: '48%' }}
            icon={<AspectRatioIcon />}
            label="Classificação / Tamanho"
            value={produto.tamanhoProduto}
          />

          <InfoItem
            width={{ xs: '100%', sm: '48%' }}
            icon={<InventoryIcon sx={{ opacity: 0.6 }} />}
            label="Embalagem"
            value={produto.embalagem}
          />
          <InfoItem
            width={{ xs: '100%', sm: '48%' }}
            icon={<InventoryIcon sx={{ opacity: 0.6 }} />}
            label="Numero do Romaneio"
            value={produto.numeroRomaneio}
          />
        </Box>

        {/* Rodapé Técnico */}
        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: '1px dashed #e0e0e0',
            display: 'flex',
            gap: 3,
          }}
        >
          <Typography variant="caption" color="text.disabled">
            Código Rastreio: <strong>{produto.codigoCaixa}</strong>
          </Typography>
          <Typography variant="caption" color="text.disabled">
            <strong>GGN:</strong>4063061703682
          </Typography>
          <Typography variant="caption" color="text.disabled">
            <strong>Registration Number:</strong>PLCH17063
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
