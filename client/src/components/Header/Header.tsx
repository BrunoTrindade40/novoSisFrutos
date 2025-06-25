import React from 'react';
import { AppBar, Toolbar, Box, Typography, Container } from '@mui/material';
import { Logo } from '../conteudos/Logo/Logo';
import imgLogo from '../../assets/images/logo bs transparente.svg';
import imgLogo2 from '../../assets/images/logo ok_transparente.svg';

export const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'primary.main',
        boxShadow: 'none',
      }}
    >
      {/* Usa a cor primária do tema e remove a sombra padrão */}
      <Container maxWidth="md">
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          {/* Ajusta o espaçamento e alinhamento */}
          <Logo
            to="/"
            imgLogoSrc={imgLogo}
            sx={{ height: { xs: '55px', sm: '75px' } }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              sx={{
                marginLeft: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.2,
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  fontSize: { xs: '2rem', sm: '2.5rem' },
                }}
              >
                {/* Usando Typography para h2 */}
                Sisfrutos
              </Typography>
              <Typography
                variant="h5"
                component="h3"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.2,
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', sm: '1.8rem' },
                }}
              >
                {/* Usando Typography para o span */}
                Rastreabilidade
              </Typography>
            </Box>
          </Box>
          <Logo
            to="/"
            imgLogoSrc={imgLogo2}
            sx={{ height: { xs: '40px', sm: '60px' } }}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
