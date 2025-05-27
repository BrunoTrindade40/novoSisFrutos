import React from 'react';
// import styles from './Header.module.css'; // REMOVA esta linha
import { AppBar, Toolbar, Box, Typography, styled } from '@mui/material'; // Adicione AppBar, Toolbar, Typography, styled
import { Logo } from '../conteudos/Logo/Logo';
import imgLogo from '../../assets/images/logo_resized_200px-transparent.png';

// Opcional: Se você quiser que o logo seja clicável como um link
// O componente Logo precisa aceitar props de styled-components ou Box para passar para o <img> ou <Link> interno
const StyledLogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  // Se precisar de estilos adicionais para o container do logo
}));

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
        {/* Você pode adicionar outros elementos aqui, como um menu ou botões */}
      </Toolbar>
    </AppBar>
  );
};