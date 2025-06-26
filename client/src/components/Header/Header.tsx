import React from 'react';
import { AppBar, Toolbar, Box, Typography, Container } from '@mui/material';
import { Logo } from '../conteudos/Logo/Logo';
import imgLogo from '../../assets/images/logo bs transparente.svg';
import imgLogo2 from '../../assets/images/logo ok_transparente.svg';

export const Header: React.FC = () => {
  return (
    // 1. Mude a posição para "fixed" para garantir que ele fique fixo no topo da janela.
    //    Adicione top: 0 e left: 0 para garantir o posicionamento.
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'primary.main',
        boxShadow: 'none',
        top: 0,
        left: 0,
      }}
    >
      {/* 2. Mova o Container para DENTRO do AppBar. */}
      {/* Agora, o fundo do AppBar ocupará 100% da largura,
          mas o conteúdo (Toolbar) respeitará o maxWidth. */}
      <Container maxWidth="md">
        <Toolbar
          disableGutters // Remove os paddings padrão do Toolbar, pois o Container já controla isso.
          sx={{
            justifyContent: 'space-between',
          }}
        >
          {/* O restante do seu código continua aqui dentro do Toolbar */}
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
