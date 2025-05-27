import { Alert, Box } from '@mui/material';

interface MensagemErroProps {
  mensagem: string;
}

export function MensagemErro({ mensagem }: MensagemErroProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}> {/* Usando sx para consistência */}
      <Alert severity="error">{mensagem}</Alert>
    </Box>
  );
}