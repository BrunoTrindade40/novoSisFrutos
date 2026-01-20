import { describe, it, expect, beforeEach, vi } from "vitest";
import { ProdutosService } from "../../services/produtos.service";
import { prisma } from "../../prisma/client";

// Mock do módulo Prisma Client
vi.mock("../../prisma/client", () => ({
  prisma: {
    $queryRaw: vi.fn(),
  },
}));

// Interface local para simular o retorno cru do banco (Stored Procedure)
interface CaixaResultDB {
  id: number;
  codbarrastag: string;
  produto: string;
  datacolheita: Date;
  dataembalagem: Date;
  produtor: string;
  embalador: string;
  embalagem: string;
  romaneio: string;
  talhao: string;
  lote: string;
  cidade: string;
  uf: string;
}

describe("ProdutosService", () => {
  let service: ProdutosService;

  beforeEach(() => {
    service = new ProdutosService();
    vi.clearAllMocks();
  });

  it("deve retornar um produto mapeado (CaixaPaletizada) quando encontrado via Stored Procedure", async () => {
    const mockCodigo = "12345";

    // Objeto cru tipado corretamente
    const mockRawResult: CaixaResultDB = {
      id: 1,
      codbarrastag: mockCodigo,
      produto: "Uva Crimson",
      datacolheita: new Date("2023-01-01"),
      dataembalagem: new Date("2023-01-02"),
      produtor: "Produtor X",
      embalador: "Embalador Y",
      embalagem: "Cumbuca",
      romaneio: "ROM123",
      talhao: "T1",
      lote: "LOTE99",
      cidade: "Petrolina",
      uf: "PE",
    };

    // Uso de genéricos no mock para evitar 'as any'
    vi.spyOn(prisma, "$queryRaw").mockResolvedValue([mockRawResult] as never);

    const result = await service.buscarPorCodigo(mockCodigo);

    expect(prisma.$queryRaw).toHaveBeenCalled();
    expect(result).not.toBeNull();
    // A asserção abaixo é segura pois verificamos not.toBeNull antes
    if (result) {
      expect(result.lote).toBe("LOTE99");
      expect(result.nomeProduto).toBe("Uva Crimson");
    }
  });

  it("deve lançar erro quando a SP não retornar nada", async () => {
    // Retorno vazio tipado
    vi.spyOn(prisma, "$queryRaw").mockResolvedValue([] as never);

    await expect(service.buscarPorCodigo("99999")).rejects.toThrow();
  });
});
