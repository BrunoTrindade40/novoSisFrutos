import { ProdutoService } from "../../services/produtos.service";
import { prisma } from "../../prisma/client";

jest.mock("../../src/prisma/client", () => ({
  prisma: {
    $queryRaw: jest.fn(),
  },
}));

describe("ProdutoService", () => {
  const service = new ProdutoService();

  it("deve retornar o produto quando a procedure encontrar resultado", async () => {
    const mockCodigo = "1234";

    const mockResultado = [
      {
        palcai_codigo: mockCodigo,
        nome: "Produto Teste",
      },
    ];

    (prisma.$queryRaw as jest.Mock).mockResolvedValue(mockResultado);

    const resultado = await service.getProdutoByCodigo(mockCodigo);

    expect(resultado).toEqual({
      palcai_codigo: mockCodigo,
      nome: "Produto Teste",
    });

    expect(prisma.$queryRaw).toHaveBeenCalled();
  });

  it("deve retornar null se a procedure não retornar dados", async () => {
    (prisma.$queryRaw as jest.Mock).mockResolvedValue([]);

    const resultado = await service.getProdutoByCodigo("9999");

    expect(resultado).toBeNull();
  });
});
