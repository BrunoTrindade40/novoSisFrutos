import { Box, Container } from '@mui/material';
import React from 'react';
import styles from './Footer.module.css';
import { Logo } from '../conteudos/Logo/Logo';
import imgLogo from '../../assets/images/logo_resized_200px-transparent.png';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <Container className={styles.container}>
        <Box className={styles.nomeEmpresa}>
          Comércio de frutas e verduras União LTDA.
        </Box>
        <Box className={styles.telEmpresa}>(73)99981-0335</Box>
        <Box className={styles.enderecoEmpresa}>
          BR 418 KM 86 Nº 1.000 - Recanto do Lago, Posto da Mata - Nova Viçosa -
          BA - 45928000
        </Box>
        <Box className={styles.desenvolvedora}>
          <Logo to="/" imgLogoSrc={imgLogo}></Logo>
          <Box></Box>
        </Box>
      </Container>
    </footer>
  );
};
