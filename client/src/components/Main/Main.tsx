import { Box } from '@mui/material';
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
      <Box>
        {/* Aqui se renderiza o conteúdo JSX */}
        {children}
      </Box>
    </Box>
  );
};
