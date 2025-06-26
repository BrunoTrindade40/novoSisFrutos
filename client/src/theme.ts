// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ECE0CA',
      dark: '#E9ECEF',
    },
    secondary: {
      main: '#2C5F2D', // Verde Sóbrio
      dark: '#003B49', // Azul Escuro
    },
    background: {
      default: '#f5f5f5', // Fundo levemente cinza para o body/html
      paper: '#f7f2e9', // Fundo branco para cards/caixas de conteúdo
    },
    text: {
      primary: '#003B49',
      secondary: '#2C5F2D',
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
