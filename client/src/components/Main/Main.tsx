import { Box, Container } from '@mui/material';
import React from 'react';

type MainProps = {
  children: React.ReactNode;
};

export const Main: React.FC<MainProps> = ({ children }: MainProps) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4, 
      }}
    >
      <Container maxWidth="md">
        <Box>
          {/* Aqui se renderiza o conteúdo JSX */}
          {children}
        </Box>
      </Container>
    </Box>
  );
};