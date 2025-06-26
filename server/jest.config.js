/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // O preset 'ts-jest' configura o 'transform' para arquivos .ts e .tsx automaticamente.
  preset: "ts-jest",

  // Ambiente de teste para backend.
  testEnvironment: "node",

  // Raiz para o Jest procurar por arquivos.
  roots: ["<rootDir>/src"],

  // Padrão para encontrar arquivos de teste.
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],

  // Limpa os mocks antes de cada teste.
  clearMocks: true,
};
