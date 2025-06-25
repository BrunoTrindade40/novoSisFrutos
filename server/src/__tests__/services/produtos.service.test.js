"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const produtos_service_1 = require("../../src/services/produtos.service");
const client_1 = require("../../src/prisma/client");
jest.mock("../../src/prisma/client", () => ({
  prisma: {
    $queryRaw: jest.fn(),
  },
}));
describe("ProdutoService", () => {
  const service = new produtos_service_1.ProdutoService();
  it("deve retornar o produto quando a procedure encontrar resultado", async () => {
    const mockCodigo = "1234";
    const mockResultado = [
      {
        palcai_codigo: mockCodigo,
        nome: "Produto Teste",
      },
    ];
    client_1.prisma.$queryRaw.mockResolvedValue(mockResultado);
    const resultado = await service.getProdutoByCodigo(mockCodigo);
    expect(resultado).toEqual({
      palcai_codigo: mockCodigo,
      nome: "Produto Teste",
    });
    expect(client_1.prisma.$queryRaw).toHaveBeenCalled();
  });
  it("deve retornar null se a procedure não retornar dados", async () => {
    client_1.prisma.$queryRaw.mockResolvedValue([]);
    const resultado = await service.getProdutoByCodigo("9999");
    expect(resultado).toBeNull();
  });
});
