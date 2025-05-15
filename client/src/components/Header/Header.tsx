import React from 'react';
import Navbar from './Navbar';
import styles from './Header.module.css';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import imgLogo from '../../assets/images/logo_resized_200px-transparent.png';

export const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <Box className={styles.container}>
                <Box className={styles.logo}>
                    <Link to={"/"} className={styles.link}>
                        <span className={styles.text}>Logo</span>
                        <img src={imgLogo} alt='Logo' />
                    </Link>
                </Box>
                <Box className={styles.titulo_pg}>
                    {/* <Navbar></Navbar> */}
                    <h2 className={styles.texto1}>Sisfrutos</h2>
                    <span>Rastreabilidade do Fruto</span>
                </Box>
            </Box>
        </header>
    );
};