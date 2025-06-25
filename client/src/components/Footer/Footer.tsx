import { Box, Container, Typography } from '@mui/material'; // Adicione Typography
import React from 'react';
import { Logo } from '../conteudos/Logo/Logo';
import imgLogo from '../../assets/images/logo ok_transparente.svg';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.dark',
        color: 'text.primary',
        py: 4,
        textAlign: 'center',
        mt: 'auto',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          Comércio de frutas e verduras União LTDA.
        </Typography>

        <Typography variant="body2" sx={{ mb: 0.5 }}>
          (73)99981-0335
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          BR 418 KM 86 Nº 1.000 - Recanto do Lago, Posto da Mata - Nova Viçosa -
          BA - 45928000
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Logo
            to="/"
            imgLogoSrc={imgLogo}
            sx={{ height: { xs: '40px', sm: '60px' } }}
          />
        </Box>
      </Container>
    </Box>
  );
};
