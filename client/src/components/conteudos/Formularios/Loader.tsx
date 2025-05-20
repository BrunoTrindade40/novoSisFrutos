import { CircularProgress, Box } from '@mui/material';

export function Loader() {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress color="primary" />
    </Box>
  );
}