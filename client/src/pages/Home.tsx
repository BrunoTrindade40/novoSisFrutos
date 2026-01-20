import { Container, Paper, Box, Typography } from '@mui/material';
import { FormRastreamento } from '../components/conteudos/Formularios/FormRastreamento';
import { TextoRastreamentoDeFrutos } from '../components/conteudos/Textos/TextoRastreamentoDeFrutos';

function Home() {
  return (
    <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Box sx={{ mt: 6 }}>
        <TextoRastreamentoDeFrutos />
      </Box>
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: { xs: 2, md: 4 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
        }}
      >
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography
            component="h1"
            variant="h4"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Sistema de Rastreamento
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Digite o código da etiqueta para visualizar os detalhes do produto.
          </Typography>
        </Box>

        <FormRastreamento />
      </Paper>
    </Container>
  );
}

export default Home;
