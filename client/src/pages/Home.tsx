import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Toolbar,
} from '@mui/material';
import theme from '../theme';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

// ... resto das suas importações ...
import { TextoRastreamentoDeFrutos } from '../components/conteudos/Textos/TextoRastreamentoDeFrutos';
import { FormRastreamento } from '../components/conteudos/Formularios/FormRastreamento';
import { ProdutoDetalhes } from '../components/Produtos/ProdutoDetalhes';
import { MensagemErro } from '../components/conteudos/Formularios/MensagemErro';
import type { Produto } from '../types/Produto';

const Home: React.FC = () => {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [loading] = useState(false);

  const { codigoNaUrl } = useParams<{ codigoNaUrl?: string }>();

  // 2. CRIAR A REFERÊNCIA E VERIFICAR O TAMANHO DA TELA
  const formRef = useRef<HTMLDivElement>(null); // Âncora para o nosso formulário
  const themeMui = useTheme(); // Acessa o tema para obter os breakpoints
  // Retorna 'true' se a tela for menor que 'md' (900px por padrão)
  const isMobile = useMediaQuery(themeMui.breakpoints.down('md'));

  const handleSearchResult = (result: {
    produto: Produto | null;
    erro: string | null;
  }) => {
    setProduto(result.produto);
    setErro(result.erro);
  };

  // 4. CRIAR O EFEITO DE ROLAGEM
  useEffect(() => {
    if (produto && isMobile) {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [produto, isMobile]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Header />
        <Toolbar /> {/* Ajuste técnico */}
        <Container component="main" sx={{ flexGrow: 1, my: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'flex-start',
              gap: { xs: 2, md: 4 },
            }}
          >
            <Box sx={{ width: { xs: '100%', md: '58.33%' } }}>
              <TextoRastreamentoDeFrutos />
            </Box>

            {/* 3. ANEXAR A REFERÊNCIA AO CONTAINER DO FORMULÁRIO */}
            <Box
              ref={formRef}
              sx={{
                width: { xs: '100%', md: '41.67%' },
                pt: { xs: 10, md: 0 } /* Ajuste técnico  */,
              }}
            >
              <FormRastreamento
                onSearchResult={handleSearchResult}
                isLoading={loading}
                initialCodigo={codigoNaUrl}
              />
              <Box sx={{ mt: 0 }}>
                {erro && !loading && <MensagemErro mensagem={erro} />}
                {produto && !loading && <ProdutoDetalhes produto={produto} />}
              </Box>
            </Box>
          </Box>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Home;
