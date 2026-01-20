import { defineConfig } from "vitest/config";
import swc from "unplugin-swc";

export default defineConfig({
  test: {
    globals: true,
    root: "./",
    // Mapeamento de alias se você usar (ex: @/services/...)
    // alias: { '@': './src' },
  },
  plugins: [
    // Necessário para compilar TS corretamente com decoradores, se houver
    swc.vite(),
  ],
});
