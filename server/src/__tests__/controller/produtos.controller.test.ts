import { describe, it, expect, vi, beforeEach, Mocked } from "vitest";
import { ProdutosController } from "../../controllers/produtos.controller";
import { ProdutosService } from "../../services/produtos.service";
import { Request, Response } from "express";
import { CaixaPaletizada } from "../../controllers/protocols";

// Mock do Service
vi.mock("../../services/produtos.service");

// Interface para estender o Request do Express com tenantId
interface MockRequest extends Partial<Request> {
  tenantId?: string;
  params: { codigo: string };
}

describe("ProdutosController", () => {
  let controller: ProdutosController;
  let mockService: Mocked<ProdutosService>;
  let req: MockRequest;
  let res: Partial<Response>;
  let jsonMock: ReturnType<typeof vi.fn>;
  let statusMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockService = new ProdutosService() as Mocked<ProdutosService>;
    controller = new ProdutosController();

    // Injeção segura do mock
    Object.assign(controller, { produtosService: mockService });

    // CORREÇÃO: Definimos os mocks e garantimos o encadeamento (chaining)
    jsonMock = vi.fn();

    // statusMock deve retornar um objeto que tenha a função json
    statusMock = vi.fn().mockReturnValue({ json: jsonMock });

    // Definição tipada do Request
    req = {
      params: { codigo: "12345" },
      tenantId: "empresa_teste",
    } as unknown as MockRequest;

    // CORREÇÃO PRINCIPAL: Montagem do objeto Response
    res = {
      // Forçamos o tipo 'any' aqui para evitar o erro "Type 'Mock' is not assignable..."
      // Isso é aceitável em testes unitários de mocks
      status: statusMock as any,
      json: jsonMock as any,
    } as unknown as Response;
  });

  it("deve retornar 200 e o produto (CaixaPaletizada) quando encontrado", async () => {
    const produtoMock: CaixaPaletizada = {
      codigoCaixa: "12345",
      nomeProduto: "Maçã Gala",
      dataColheita: "2023-10-01",
      dataChegada: "2023-10-02",
      produtorEmpresa: "Fazenda Sol",
      nomeEmbalador: "João Silva",
      embalagem: "Caixa 18kg",
      numeroRomaneio: "ROM-001",
      talhaoRomaneio: "T-01",
      lote: "LOTE-XYZ-001",
      endereco: "Rua A",
      cidade: "Vacaria",
      tamanhoProduto: "100",
    };

    mockService.buscarPorCodigo.mockResolvedValue(produtoMock);

    // Casting seguro para Request e Response
    await controller.handleBuscaRastreio(
      req as unknown as Request,
      res as unknown as Response
    );

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(produtoMock);
  });

  it("deve retornar 404/Erro quando o serviço lançar exceção", async () => {
    // Simula erro do serviço (Ex: Produto não encontrado)
    mockService.buscarPorCodigo.mockRejectedValue(
      new Error("Produto não encontrado")
    );

    await controller.handleBuscaRastreio(
      req as unknown as Request,
      res as unknown as Response
    );

    // Verifica se o status foi chamado (pode ser 400, 404 ou 500 dependendo do middleware de erro ou try/catch do controller)
    expect(statusMock).toHaveBeenCalled();
  });
});
