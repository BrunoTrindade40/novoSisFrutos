import { Box, Container } from '@mui/material';
import React from 'react';

type MainProps = {
  children: React.ReactNode;
};

export const Main: React.FC<MainProps> = ({ children }: MainProps) => {
  return (
    <main>
      <Container>
        <Box>
          {/* Aqui se renderiza o conteúdo JSX */}
          {children}
        </Box>
      </Container>
    </main>
  );
};
