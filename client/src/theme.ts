// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Um verde mais vibrante para a barra superior e a seção de busca
    },
    secondary: {
      main: '#757575', // Um cinza suave para botões e outros elementos
      dark: '#424242', // Um cinza mais escuro para o rodapé
    },
    background: {
      default: '#f5f5f5', // Fundo levemente cinza para o body/html
      paper: '#ffffff',   // Fundo branco para cards/caixas de conteúdo
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 600,
      marginBottom: '1rem',
      marginTop: '1.5rem',
    },
    body1: {
      lineHeight: 1.6,
      marginBottom: '1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        html, body, #root {
          height: 100%;
        }
        #root {
          display: flex;
          flex-direction: column;
        }
      `,
    },
    // Outras customizações de componentes podem vir aqui
  },
});

export default theme;