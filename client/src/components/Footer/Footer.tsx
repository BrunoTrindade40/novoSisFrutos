import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  Divider,
} from '@mui/material';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: '#f5f5f5', // Cinza muito claro para separar do conteúdo
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Container maxWidth="md">
        {' '}
        {/* Alinhado com o resto do site */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: 'none', sm: 'block' } }}
            />
          }
        >
          <Typography variant="body2" color="text.secondary" fontWeight={500}>
            © {new Date().getFullYear()} SisFrutos
          </Typography>

          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="caption"
              display="block"
              color="text.secondary"
            >
              Comércio de frutas e verduras União LTDA.
              <br />
              (73)99981-0335
              <br />
              BR 418 KM 86 Nº 1.000 - Recanto do Lago, Posto da Mata - Nova
              Viçosa - BA - 45928000
            </Typography>
          </Box>

          <Link
            href="https://artsoftinformática.com.br"
            target="_blank"
            underline="hover"
            color="primary"
            variant="body2"
            fontWeight={600}
          >
            Artsoft Informática
          </Link>
        </Stack>
      </Container>
    </Box>
  );
};
