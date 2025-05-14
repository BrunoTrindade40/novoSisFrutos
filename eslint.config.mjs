import js from "@eslint/js";
import typescriptParser from "@typescript-eslint/parser"; // Importe o parser do TypeScript
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: typescriptParser, // Adicione o parser do TypeScript aqui
      parserOptions: {
        ecmaVersion: "latest", // Ou a versão do ECMAScript que você deseja suportar
        sourceType: "module", // Se seus arquivos usam import/export
        ecmaFeatures: {
          jsx: true, // Habilita o suporte a JSX
        },
        project: "./tsconfig.json", // Caminho para o seu arquivo tsconfig.json (importante para TypeScript)
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin, // Garante que o plugin do TypeScript seja usado
      react: pluginReact, // Garante que o plugin do React seja usado
    },
    rules: {
      ...tseslint.configs.recommended.rules, // Adiciona as regras recomendadas do TypeScript
      ...pluginReact.configs.recommended.rules, // Adiciona as regras recomendadas do React
      // Adicione suas regras personalizadas aqui
    },
    settings: {
      react: {
        version: "detect", // Para detectar automaticamente a versão do React
      },
    },
  },
]);
