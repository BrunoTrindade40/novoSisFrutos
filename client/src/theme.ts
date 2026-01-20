import { createTheme } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';
import { BrandConfig } from './config/brandConfig';

const theme = createTheme(
  {
    palette: {
      primary: {
        main: BrandConfig.colors.primary, // Azul Escuro (BS) ou Laranja (União)
        contrastText: '#ffffff',
      },
      secondary: {
        main: BrandConfig.colors.secondary, // Azul Claro (BS) ou Verde (União)
      },
      background: {
        default: BrandConfig.colors.background,
        paper: '#ffffff',
      },
      text: {
        primary: '#333333',
        secondary: '#555555',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '2.5rem', fontWeight: 600, color: '#1a1a1a' },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
        color: BrandConfig.colors.primary,
      },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 24px',
          },
          containedPrimary: {
            // Gradiente sutil para modernizar, opcional, mas elegante
            background: `linear-gradient(45deg, ${BrandConfig.colors.primary} 30%, ${BrandConfig.colors.secondary} 90%)`,
            '&:hover': {
              filter: 'brightness(1.1)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            // O cabeçalho agora usa a cor primária exata da marca
            backgroundColor: BrandConfig.colors.primary,
            boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            // Foco do input na cor secundária (Azul Claro na BS)
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
              {
                borderColor: BrandConfig.colors.secondary,
              },
            '& .MuiInputLabel-root.Mui-focused': {
              color: BrandConfig.colors.secondary,
            },
          },
        },
      },
    },
  },
  ptBR
);

export default theme;
