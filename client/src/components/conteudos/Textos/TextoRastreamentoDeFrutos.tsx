// TextoRastreamentoDeFrutos.tsx - VERSÃO FINAL COM FLEXBOX

import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import imgTexto from '../../../assets/images/imagem-texto-rastreabilidade2.jpg';

const etapas = [
  // ... seus dados das etapas ...
  {
    titulo: 'Colheita Controlada',
    descricao:
      'A rastreabilidade começa no pomar, onde os frutos são colhidos em talhões identificados, tanto em áreas próprias quanto em propriedades de parceiros. Todas as atividades agrícolas são registradas em cadernos de campo seguindo os padrões da Produção Integrada de Frutas (PIF), garantindo um controle rigoroso desde a origem.',
  },
  {
    titulo: 'Identificação Digital no Processamento',
    descricao:
      'Ao chegarem ao packing house, os frutos recebem um código digital que os acompanha durante todas as etapas de seleção, classificação e controle de qualidade. Isso permite a rastreabilidade individual de cada lote processado.',
  },
  {
    titulo: 'Embalagem e Expedição',
    descricao:
      'Durante a embalagem, cada caixa é identificada com um QR Code que registra dados essenciais, como o tipo de embalagem, data, nome do embalador e lote correspondente. Na expedição, esse mesmo código é lido novamente, permitindo rastrear para qual cliente cada caixa está sendo enviada e, assim, completar o ciclo de rastreabilidade.',
  },
];

export function TextoRastreamentoDeFrutos() {
  return (
    <Box>
      {/* 1. CONTAINER FLEXBOX PARA IMAGEM E TEXTO INICIAL */}
      <Box
        sx={{
          display: 'flex',
          // Em telas pequenas (xs) fica em coluna, em maiores (sm) fica em linha
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center', // Alinha verticalmente para um bom visual
          gap: 3, // Espaçamento entre a imagem e o texto
          mb: 4, // Margem inferior para afastar do conteúdo seguinte
        }}
      >
        {/* 2. ITEM DO FLEXBOX: A IMAGEM */}
        <Box
          component="img"
          src={imgTexto}
          alt="Rastreabilidade de Frutos: Produtor, Distribuidor, Consumidor"
          sx={{
            // Define uma largura e impede que a imagem seja esmagada
            width: { xs: '80%', sm: 220 },
            flexShrink: 0,
            height: 'auto',
            borderRadius: '8px',
          }}
        />

        {/* 3. ITEM DO FLEXBOX: O TEXTO INICIAL */}
        <Box>
          <Typography variant="body1" sx={{ textAlign: 'justify' }}>
            A rastreabilidade garante o acompanhamento completo do percurso do
            fruto — desde a colheita no pomar até a mesa do consumidor. Esse
            processo vem ganhando destaque por permitir que produtores,
            embaladores e distribuidores estejam preparados para agir
            rapidamente diante de qualquer eventualidade, além de oferecer ao
            consumidor informações sobre a
            <span style={{ fontWeight: 'bold' }}> origem </span>e
            <span style={{ fontWeight: 'bold' }}> qualidade do fruto </span>
            consumido.
          </Typography>
        </Box>
      </Box>

      {/* O restante do conteúdo flui normalmente abaixo do Flexbox */}
      <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
        Nossa metodologia de rastreabilidade utiliza tecnologia de ponta e está
        dividida em
        <span style={{ fontWeight: 'bold' }}> três etapas principais</span>:
      </Typography>

      <List sx={{ mt: 3, width: '100%' }}>
        {etapas.map((etapa, index) => (
          <ListItem
            key={index}
            alignItems="flex-start"
            sx={{ display: 'block', p: 0, mb: 3 }}
          >
            <ListItemText
              primary={
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ fontWeight: 'bold', mb: 1 }}
                >
                  {`${index + 1} - ${etapa.titulo}`}
                </Typography>
              }
              secondary={
                <Typography
                  component="span"
                  variant="body1"
                  sx={{ textAlign: 'justify' }}
                >
                  {etapa.descricao}
                </Typography>
              }
              disableTypography
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
        Todos os dados são disponibilizados em tempo real para consumidores,
        produtores ou distribuidores por meio de
        <span style={{ fontWeight: 'bold' }}> QR Code </span>ou diretamente pela{' '}
        <span style={{ fontWeight: 'bold' }}>página web</span>. Essa solução
        oferece
        <span style={{ fontWeight: 'bold' }}>
          {' '}
          transparência, segurança e confiança{' '}
        </span>
        em toda a cadeia produtiva.
      </Typography>
    </Box>
  );
}
