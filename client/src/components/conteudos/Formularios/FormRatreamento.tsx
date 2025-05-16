import React from "react";
import { Typography, Paper } from "@mui/material";

export function FormRatreamento() {
  return (
    <Paper elevation={2} style={{ padding: "1rem", marginBottom: "1rem" }}>
      <Typography variant="h5" gutterBottom>
        Sobre Nós
      </Typography>
      <Typography variant="body1">
        Somos uma empresa dedicada a fornecer soluções inovadoras em tecnologia,
        com foco em qualidade, performance e experiência do usuário.
      </Typography>
    </Paper>
  );
}
