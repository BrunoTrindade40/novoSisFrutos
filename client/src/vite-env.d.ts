/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // pode adicionar mais variáveis aqui no futuro
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
