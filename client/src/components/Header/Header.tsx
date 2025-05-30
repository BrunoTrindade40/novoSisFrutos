import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import { Logo } from '../conteudos/Logo/Logo';
import imgLogo from '../../assets/images/logo ok_transparente.svg';

export const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main', boxShadow: 'none' }}> {/* Usa a cor primária do tema e remove a sombra padrão */}
      <Toolbar sx={{ justifyContent: 'space-between', paddingLeft: '16px', paddingRight: '16px' }}> {/* Ajusta o espaçamento e alinhamento */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Logo to="/" imgLogoSrc={imgLogo} />

          <Box sx={{ marginLeft: '10px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h6" component="h2" sx={{ color: 'white', lineHeight: 1.2 }}> {/* Usando Typography para h2 */}
              Sisfrutos
            </Typography>
            <Typography variant="subtitle2" sx={{ color: 'white', lineHeight: 1.2 }}> {/* Usando Typography para o span */}
              Rastreabilidade do Fruto
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};