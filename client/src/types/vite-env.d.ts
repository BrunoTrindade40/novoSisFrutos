/// <reference types="vite/client" />

declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
interface ImportMetaEnv {
  // O readonly garante que ninguém tente alterar em tempo de execução
  readonly VITE_API_BASE_URL: string;
  readonly VITE_CLIENT_ID: 'BS' | 'UNIAO'; // Tipagem mais estrita (Union Type)
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
