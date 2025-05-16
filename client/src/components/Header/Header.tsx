import React from 'react';
import styles from './Header.module.css';
import { Box } from '@mui/material';
import { Logo } from '../conteudos/Logo/Logo';
import imgLogo from '../../assets/images/logo_resized_200px-transparent.png';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Box className={styles.container}>
        <Logo to="/" imgLogoSrc={imgLogo}></Logo>
        <Box className={styles.titulo_pg}>
          <h2 className={styles.texto1}>Sisfrutos</h2>
          <span>Rastreabilidade do Fruto</span>
        </Box>
      </Box>
    </header>
  );
};
