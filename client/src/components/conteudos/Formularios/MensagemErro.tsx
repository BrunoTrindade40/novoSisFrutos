import { Alert, Box } from '@mui/material';

interface MensagemErroProps {
  mensagem: string;
}

export function MensagemErro({ mensagem }: MensagemErroProps) {
  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <Alert severity="error">{mensagem}</Alert>
    </Box>
  );
}