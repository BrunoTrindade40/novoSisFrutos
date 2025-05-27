import React from 'react';
import { Header } from '../components/Header/Header';
import { Main } from '../components/Main/Main';
import { Footer } from '../components/Footer/Footer';
import { TextoRastreamentoDeFrutos } from '../components/conteudos/Textos/TextoRastreamentoDeFrutos';
import { FormRastreamento } from '../components/conteudos/Formularios/FormRastreamento';

import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from '../theme';

const Home: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />
        <Main>
          <TextoRastreamentoDeFrutos /> {/* Componente de texto */}
          <FormRastreamento /> {/* Componente de formulário */}
        </Main>

        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Home;