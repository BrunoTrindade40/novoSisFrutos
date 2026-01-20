import logoBS from '../assets/images/logo bs transparente.svg';
import logoUniao from '../assets/images/logotipo2_uniao.svg';

// --- TIPAGENS ---
interface BrandStyles {
  name: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
}

// --- FUNÇÃO HELPERS (FAIL FAST) ---
// Resolve o erro "string | undefined" garantindo o retorno ou lançando erro
const getEnv = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];

  // Se não existe valor e não foi passado um padrão, é um erro crítico.
  if (value === undefined && defaultValue === undefined) {
    throw new Error(
      `CONFIG ERROR: A variável de ambiente obrigatória '${key}' não está definida.`
    );
  }

  return value ?? defaultValue ?? '';
};

// --- DEFINIÇÃO DAS MARCAS ---
const brands: Record<string, BrandStyles> = {
  BS: {
    name: 'BS Frutas',
    logo: logoBS,
    colors: {
      primary: '#0D47A1',
      secondary: '#42A5F5',
      background: '#F0F8FF',
    },
  },
  UNIAO: {
    name: 'Frutas União',
    logo: logoUniao,
    colors: {
      primary: '#FF5722',
      secondary: '#4CAF50',
      background: '#f8f9fa',
    },
  },
};

// --- LÓGICA DE SELEÇÃO SEGURA ---

// 1. Busca a variável com Fallback (Solução Imediata para o erro de tipo)
const envClientId = getEnv('VITE_CLIENT_ID', 'BS');

// 2. Valida se a marca existe no dicionário, senão força BS (Segurança extra)
const validBrandId = (
  Object.keys(brands).includes(envClientId) ? envClientId : 'BS'
) as keyof typeof brands;

export const BrandConfig = brands[validBrandId];

// --- EXPORTAÇÃO CENTRALIZADA DAS ENV VARS ---
// Isso elimina a necessidade de chamar import.meta.env em outros arquivos
export const AppConfig = {
  apiBaseUrl: getEnv('VITE_API_BASE_URL', 'http://localhost:3000/api'), // Fallback seguro para dev
  brandId: validBrandId,
  isProduction: import.meta.env.PROD,
};
