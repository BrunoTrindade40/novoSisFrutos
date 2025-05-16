import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./Logo.module.css"

interface LogoProps {
  to: string,
  imgLogoSrc: string 
}

export const Logo: React.FC<LogoProps> = ({ to, imgLogoSrc } :LogoProps) => {
  return (
    <Box className={styles.logo}>
      <Link to={to} className={styles.link}>
        <span className={styles.text}>Logo</span>
        <img src={imgLogoSrc} alt="Logo" />
      </Link>
    </Box>
  );
};