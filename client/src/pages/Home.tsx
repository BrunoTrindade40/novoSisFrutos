// Home.tsx - VERSÃO FINAL COM SCROLL AUTOMÁTICO

// 1. IMPORTAR OS HOOKS NECESSÁRIOS
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Importando componentes de layout, tema e os hooks do MUI
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import theme from '../theme';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

// ... resto das suas importações ...
import { TextoRastreamentoDeFrutos } from '../components/conteudos/Textos/TextoRastreamentoDeFrutos';
import {
  FormRastreamento,
  type FormValues,
} from '../components/conteudos/Formularios/FormRastreamento';
import { ProdutoDetalhes } from '../components/Produtos/ProdutoDetalhes';
import { MensagemErro } from '../components/conteudos/Formularios/MensagemErro';
import { buscarProdutoPorCodigo } from '../services/api';
import type { Produto } from '../types/Produto';

const Home: React.FC = () => {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { codigoNaUrl } = useParams<{ codigoNaUrl?: string }>();
  const navigate = useNavigate();

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
    // A rolagem só acontece se:
    // - Um produto foi encontrado com sucesso (produto não é nulo)
    // - Estamos em uma visualização mobile (isMobile é true)
    if (produto && isMobile) {
      // O '?.scrollIntoView' rola a página suavemente até o elemento referenciado
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [produto, isMobile]); // Este efeito roda sempre que 'produto' ou 'isMobile' mudar

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Header />
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
            <Box ref={formRef} sx={{ width: { xs: '100%', md: '41.67%' } }}>
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
