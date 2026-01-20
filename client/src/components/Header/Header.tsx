import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Container,
  Link,
} from '@mui/material';
import { BrandConfig } from '../../config/brandConfig';
import logoArtsoft from '../../assets/images/logo ok_transparente.svg';

export const Header: React.FC = () => {
  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        // Solução de Design: Um azul mais escuro e profundo para contraste da logo Artsoft
        backgroundColor: '#002147',
        borderBottom: '4px solid',
        borderBottomColor: 'secondary.main', // Detalhe sutil com a cor secundária da marca
      }}
    >
      {/* Solução de Alinhamento: maxWidth="md" alinha com o conteúdo da Home */}
      <Container maxWidth="md">
        <Toolbar
          disableGutters
          sx={{ justifyContent: 'space-between', py: 1.5 }}
        >
          {/* ESQUERDA: Logo do Cliente */}
          <Box
            component="img"
            src={BrandConfig.logo}
            alt={BrandConfig.name}
            sx={{
              height: { xs: 40, sm: 50, md: 60 },
              width: 'auto',
              maxWidth: { xs: 100, sm: 180 },
              objectFit: 'contain',
              filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))',
            }}
          />

          {/* CENTRO: Títulos com Tipografia melhorada */}
          <Box sx={{ textAlign: 'center', mx: 2, flexGrow: 1 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 900,
                textTransform: 'uppercase',
                lineHeight: 1,
                fontSize: { xs: '0.9rem', sm: '1.4rem' },
                letterSpacing: 1.5,
                color: '#ffffff',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
              }}
            >
              SISFRUTOS
            </Typography>
            <Typography
              variant="caption"
              component="div"
              sx={{
                fontSize: { xs: '0.6rem', sm: '0.75rem' },
                fontWeight: 300,
                opacity: 0.9,
                letterSpacing: 3,
                mt: 0.5,
                textTransform: 'uppercase',
                color: '#e0e0e0',
              }}
            >
              Rastreabilidade
            </Typography>
          </Box>

          {/* DIREITA: Logo Artsoft */}
          <Link
            href="https://artsoftinformática.com.br"
            target="_blank"
            rel="noopener noreferrer"
            title="Desenvolvido por Artsoft Informática"
            sx={{
              display: 'flex',
              alignItems: 'center',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <Box
              component="img"
              src={logoArtsoft}
              alt="Artsoft Informática"
              sx={{
                height: { xs: 28, sm: 38 },
                width: 'auto',
                objectFit: 'contain',
                // Garante que a logo tenha destaque sobre o azul escuro
                filter: 'drop-shadow(0px 1px 2px rgba(0,0,0,0.3))',
              }}
            />
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
