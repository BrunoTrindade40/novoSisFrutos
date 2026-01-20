import React from 'react';
import { Box, Container } from '@mui/material';
// Assumindo exportações nomeadas ou default. Ajuste conforme seus arquivos Header/Footer.
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

interface MainProps {
  children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Garante que o layout ocupe toda a altura da tela
        bgcolor: 'background.default', // Usa a cor de fundo definida no theme.ts
        color: 'text.primary',
      }}
    >
      {/* Header Fixo ou Padrão */}
      <Header />

      {/* Área de Conteúdo Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1, // O segredo do Sticky Footer: empurra o footer para baixo
          py: 4, // Padding vertical consistente (theme spacing)
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>

      {/* Footer Branding */}
      <Footer />
    </Box>
  );
};
