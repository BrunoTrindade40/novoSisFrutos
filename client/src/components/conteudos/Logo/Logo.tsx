import { Box, styled } from "@mui/material";
import { Link } from "react-router-dom";

interface LogoProps {
  to: string,
  imgLogoSrc: string
}
// 1. Crie um componente Link estilizado que aceita a prop sx
const StyledLink = styled(Link)(({ }) => ({
  display: 'flex',       // Para alinhar a imagem (e o texto, se houver)
  alignItems: 'center',
  textDecoration: 'none', // Remove o sublinhado padrão dos links
  color: 'inherit',      // Garante que a cor do texto seja herdada (se houver texto)
  // Adicione quaisquer outros estilos base que você queira aplicar ao link em si
  // Ex: '&:hover': { opacity: 0.8 },
}));

export const Logo: React.FC<LogoProps> = ({ to, imgLogoSrc }: LogoProps) => {
  return (
    <Box
      sx={{
        display: 'flex',       // Para garantir que o Link e a imagem estejam alinhados
        alignItems: 'center',  // Centraliza verticalmente o conteúdo (se houver texto)
        // Se houver um tamanho fixo para o container do logo:
        // width: 'auto',
        // height: 'auto',
      }}
    >
      <StyledLink to={to}>
        <Box
          component="img"
          src={imgLogoSrc}
          alt="Logo"
          sx={{
            height: '40px',
            width: 'auto', 
            display: 'block',
          }}
        />
      </StyledLink>
    </Box>
  );
};