import { ProdutoService } from "../../services/produtos.service";
import { prisma } from "../../prisma/client";
// Importa os novos tipos e mappers
import { CaixasEmbaladaMobileResult } from "../../models/caixas";
import { toCaixaEmbalada } from "../../mappers/caixaEmbalada";
import { CaixaEmbalada } from "../../controllers/protocols";

jest.mock("../../prisma/client", () => ({
  prisma: {
    $queryRaw: jest.fn(),
  },
}));

// Mock do novo mapper
jest.mock("../../mappers/caixaEmbalada");

describe("ProdutoService", () => {
  let service: ProdutoService;
  let mockedPrismaQuery: jest.Mock;
  let mockedMapper: jest.Mock;

  beforeEach(() => {
    service = new ProdutoService();
    mockedPrismaQuery = prisma.$queryRaw as jest.Mock;
    mockedMapper = toCaixaEmbalada as jest.Mock;
    mockedPrismaQuery.mockClear();
    mockedMapper.mockClear();
  });

  // --- Bloco de testes para o novo método ---
  describe("getProdutoByCodigo_CaiEmbalagem", () => {
    it("deve retornar a CaixaEmbalada MAPEADA quando a procedure encontrar resultado", async () => {
      const mockCodigo = "123456";

      // 1. Simula o resultado CRU vindo do banco de dados para a nova procedure
      const mockDbResult: CaixasEmbaladaMobileResult = {
        CaiEmb_CodCaixa: mockCodigo,
        pro_descricao: "Produto Embalado Teste",
        rom_dtcolheita: "2025-06-27",
        rom_dtchegada: "2025-06-27",
        emp_razaoSocial: "Empresa Teste",
        embalador: "João da Silva",
        rom_romaneio: "R54321",
        rom_talhao: "T1",
        endereco: "Endereço Teste",
        cidade: "Cidade Teste",
        // ... outras propriedades de CaixasEmbaladaMobileResult
        fkromaneio: 1,
        caiemb_status: 1,
      };
      mockedPrismaQuery.mockResolvedValue([mockDbResult]);

      // 2. Simula o retorno do novo mapper
      const mockProdutoMapeado: CaixaEmbalada = {
        codigoCaixa: mockCodigo,
        nomeProduto: "Produto Embalado Teste",
        // ... outras propriedades que o mapper retornaria
        dataColheita: expect.any(String),
        dataChegada: expect.any(String),
        produtorEmpresa: "Empresa Teste",
        embalagem: "*NI*",
        nomeEmbalador: "João da Silva",
        numeroRomaneio: "R54321",
        talhaoRomaneio: "*NI*",
        endereco: "Endereço Teste",
        cidade: "Cidade Teste",
        tamanhoProduto: "*NI*",
      };
      mockedMapper.mockReturnValue(mockProdutoMapeado);

      // 3. Chama o novo serviço
      const resultado =
        await service.getProdutoByCodigo_CaiEmbalagem(mockCodigo);

      // 4. Verifica se o resultado é o objeto que o MAPPER criou
      expect(resultado).toEqual(mockProdutoMapeado);

      // 5. Garante que o banco e o novo mapper foram chamados corretamente
      expect(mockedPrismaQuery).toHaveBeenCalled();
      expect(mockedMapper).toHaveBeenCalledWith(mockDbResult);
    });

    it("deve retornar null se a procedure não retornar dados", async () => {
      mockedPrismaQuery.mockResolvedValue([]);

      const resultado = await service.getProdutoByCodigo_CaiEmbalagem("9999");

      expect(resultado).toBeNull();
      // Garante que o mapper não foi chamado se não houver dados
      expect(mockedMapper).not.toHaveBeenCalled();
    });
  });
});
