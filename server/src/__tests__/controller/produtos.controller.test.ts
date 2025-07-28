import { ProdutoController } from "../../controllers/produtos.controller";
import { ProdutoService } from "../../services/produtos.service";
import { Request, Response } from "express";
// Importa a nova interface que o controller espera receber do serviço
import { CaixaEmbalada } from "../../controllers/protocols";

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

  // --- MOCK DO NOVO OBJETO DE RESPOSTA ---
  // Este objeto simula o retorno do novo mapper 'toCaixaEmbalada'.
  const mockProdutoCaixaEmbalada: CaixaEmbalada = {
    codigoCaixa: "001-000.000.039",
    nomeProduto: "Mamão Formosa Embalado",
    dataColheita: "2025-06-27T00:00:00.000Z",
    dataChegada: "2025-06-27T00:00:00.000Z",
    produtorEmpresa: "Produtor Embalado",
    embalagem: "*NI*", // Conforme a lógica do novo mapper
    nomeEmbalador: "Embalador Teste",
    numeroRomaneio: "R2025",
    talhaoRomaneio: "*NI*", // Conforme a lógica do novo mapper
    endereco: "Endereço Embalado",
    cidade: "Cidade Embalada",
    tamanhoProduto: "*NI*", // Conforme a lógica do novo mapper
  };

  beforeEach(() => {
    mockService = new ProdutoService() as jest.Mocked<ProdutoService>;
    controller = new ProdutoController();
    (controller as any).produtoService = mockService;
  });

  it("deve retornar 200 e o produto MAPEADO quando encontrado", async () => {
    const req = {
      params: { codigo: "001-000.000.039" },
    } as unknown as Request;
    const res = mockResponse();

    // --- MUDANÇA PRINCIPAL AQUI ---
    // Mockamos o novo método que o controller agora chama.
    mockService.getProdutoByCodigo_CaiEmbalagem.mockResolvedValue(
      mockProdutoCaixaEmbalada
    );

    await controller.getProdutoPorCodigo(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    // O teste agora espera o novo objeto mockado.
    expect(res.json).toHaveBeenCalledWith(mockProdutoCaixaEmbalada);
  });

  it("deve retornar 404 se o produto não for encontrado", async () => {
    const req = {
      params: { codigo: "999-999.999.999" },
    } as unknown as Request;
    const res = mockResponse();

    // Mockamos o novo método para retornar null.
    mockService.getProdutoByCodigo_CaiEmbalagem.mockResolvedValue(null);

    await controller.getProdutoPorCodigo(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Nenhum dado encontrado para o código fornecido.",
    });
  });

  it("deve retornar 400 para parâmetro inválido (Zod)", async () => {
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

    // Mockamos o novo método para rejeitar a promise.
    mockService.getProdutoByCodigo_CaiEmbalagem.mockRejectedValue(
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
