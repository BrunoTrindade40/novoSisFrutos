import { ProdutoController } from "../../controllers/produtos.controller";
import { ProdutoService } from "../../services/produtos.service";
import { Request, Response } from "express";
import { CaixaPaletizada } from "../../controllers/protocols";

jest.mock("../../services/produtos.service");

const mockResponse = (): Response => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res as unknown as Response;
};

describe("ProdutoController", () => {
  let controller: ProdutoController;
  let mockService: jest.Mocked<ProdutoService>;

  const mockProdutoMapeado: CaixaPaletizada = {
    codigoCaixa: "023-000.019.018",
    nomeProduto: "Mamão Formosa",
    dataColheita: "2022-08-11T00:00:00.000Z",
    dataChegada: "2022-08-11T00:00:00.000Z",
    produtorEmpresa: "Frutas Yang",
    embalagem: "Caixa Papelao 10kg - Formosa",
    nomeEmbalador: "DIEGO DE OLIVEIRA MATEUS ",
    numeroRomaneio: "18708",
    talhaoRomaneio: "2",
    endereco: "CORREGO DA CALIFORNIA",
    cidade: "Caravelas-BA",
    tamanhoProduto: "Sem Calibre",
  };

  beforeEach(() => {
    mockService = new ProdutoService() as jest.Mocked<ProdutoService>;
    controller = new ProdutoController();
    (controller as any).produtoService = mockService;
  });

  it("deve retornar 200 e o produto MAPEADO quando encontrado", async () => {
    const req = {
      params: { codigo: "023-000.019.018" },
    } as unknown as Request;
    const res = mockResponse();

    mockService.getProdutoByCodigo.mockResolvedValue(mockProdutoMapeado);

    await controller.getProdutoPorCodigo(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockProdutoMapeado);
  });

  // ##### TESTE CORRIGIDO ABAIXO #####
  it("deve retornar 404 se o produto não for encontrado", async () => {
    const req = {
      // <<< A CORREÇÃO ESTÁ AQUI
      // Usamos um código com formato válido para passar na primeira validação do Zod.
      params: { codigo: "999-999.999.999" },
    } as unknown as Request;
    const res = mockResponse();

    // O serviço será chamado com "999999999999" e retornará null, como mockado.
    mockService.getProdutoByCodigo.mockResolvedValue(null);

    await controller.getProdutoPorCodigo(req, res);

    // Agora, a validação de formato passa e a lógica de negócio (404) é testada corretamente.
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Nenhum dado encontrado para o código fornecido.",
    });
  });

  it("deve retornar 400 para parâmetro inválido (Zod)", async () => {
    // Este teste agora verifica um formato realmente inválido, como um código curto.
    const req = {
      params: { codigo: "formato-invalido" },
    } as unknown as Request;
    const res = mockResponse();
    await controller.getProdutoPorCodigo(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Parâmetro inválido",
      })
    );
  });

  it("deve retornar 500 em caso de erro inesperado", async () => {
    const req = { params: { codigo: "123-456.789.000" } } as unknown as Request;
    const res = mockResponse();
    mockService.getProdutoByCodigo.mockRejectedValue(
      new Error("Falha inesperada")
    );
    await controller.getProdutoPorCodigo(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Erro ao buscar Produtos.",
      detalhes: "Falha inesperada",
    });
  });
});
