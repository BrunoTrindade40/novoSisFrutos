// Use import em vez de require para manter a consistência do ES Modules
import { ProdutoService } from "../../services/produtos.service";
import { prisma } from "../../prisma/client";
import { CaixasPaletizadaMobileResult } from "../../models/caixas";
import { toCaixaPaletizada } from "../../mappers/caixaPaletizada";

// Mock do Prisma Client
jest.mock("../../prisma/client", () => ({
  prisma: {
    $queryRaw: jest.fn(),
  },
}));

// Mock do Mapper
jest.mock("../../mappers/caixaPaletizada");

describe("ProdutoService", () => {
  let service: ProdutoService;
  // Mova as variáveis de mock para o escopo do describe para serem acessíveis em todos os testes
  let mockedPrismaQuery: jest.Mock;
  let mockedMapper: jest.Mock;

  beforeEach(() => {
    // Instancie o serviço e os mocks antes de cada teste para garantir um estado limpo
    service = new ProdutoService();
    mockedPrismaQuery = prisma.$queryRaw as jest.Mock;
    mockedMapper = toCaixaPaletizada as jest.Mock;

    // Limpa os mocks antes de cada execução
    mockedPrismaQuery.mockClear();
    mockedMapper.mockClear();
  });

  it("deve retornar o produto MAPEADO quando a procedure encontrar resultado", async () => {
    const mockCodigo = "123456";

    // 1. Simula o resultado CRU vindo do banco de dados
    const mockDbResult: CaixasPaletizadaMobileResult = {
      palcai_codigo: mockCodigo,
      pro_descricao: "Produto Teste",
      rom_talhao: "Talhão X  ",
      fkpalet: 1,
      idromaneio: 1,
      rom_romaneio: "r1",
      rom_dtcolheita: "d1",
      rom_dtchegada: "d2",
      emp_razaoSocial: "e1",
      fkempresa: 1,
      endereco: "end1",
      cidade: "c1",
      tam_descricao: "t1",
      cai_descricao: "c1",
      Cademb_nome: "cn1",
      palcai_qtd: 1,
      palcai_peso: 1,
    };
    mockedPrismaQuery.mockResolvedValue([mockDbResult]);

    // 2. Simula o retorno do mapper
    const mockProdutoMapeado = {
      codigoCaixa: mockCodigo,
      nomeProduto: "Produto Teste",
      talhaoRomaneio: "Talhão X",
    };
    mockedMapper.mockReturnValue(mockProdutoMapeado);

    // 3. Chama o serviço
    const resultado = await service.getProdutoByCodigo(mockCodigo);

    // 4. Verifica se o resultado é o objeto que o MAPPER criou
    expect(resultado).toEqual(mockProdutoMapeado);

    // 5. Garante que o banco e o mapper foram chamados corretamente
    expect(mockedPrismaQuery).toHaveBeenCalled();
    expect(mockedMapper).toHaveBeenCalledWith(mockDbResult);
  });

  it("deve retornar null se a procedure não retornar dados", async () => {
    mockedPrismaQuery.mockResolvedValue([]);

    const resultado = await service.getProdutoByCodigo("9999");

    expect(resultado).toBeNull();
    // Garante que o mapper não foi chamado se não houver dados
    expect(mockedMapper).not.toHaveBeenCalled();
  });
});
