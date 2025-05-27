import { Box, Container, Typography } from '@mui/material'; // Adicione Typography
import React from 'react';
import { Logo } from '../conteudos/Logo/Logo';
import imgLogo from '../../assets/images/logo_resized_200px-transparent.png';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'secondary.dark',
        color: 'white',
        py: 4,
        textAlign: 'center',
        mt: 'auto',
      }}
    >
      {/* O Container do Material-UI para limitar a largura do conteúdo interno do rodapé */}
      <Container maxWidth="md"> {/* Ou 'lg' dependendo da sua preferência */}
        {/* Nome da Empresa */}
        <Typography variant="body2" sx={{ mb: 0.5 }}> {/* Usando Typography para texto menor, com margem inferior */}
          Comércio de frutas e verduras União LTDA.
        </Typography>

        {/* Telefone da Empresa */}
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          (73)99981-0335
        </Typography>

        {/* Endereço da Empresa */}
        <Typography variant="body2" sx={{ mb: 2 }}> {/* Mais margem inferior para separar do logo */}
          BR 418 KM 86 Nº 1.000 - Recanto do Lago, Posto da Mata - Nova Viçosa - BA - 45928000
        </Typography>

        {/* Logo da Desenvolvedora */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Logo to="/" imgLogoSrc={imgLogo} />
        </Box>
      </Container>
    </Box>
  );
};