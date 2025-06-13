"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const produtos_controller_1 = require("../../src/controllers/produtos.controller");
const produtos_service_1 = require("../../src/services/produtos.service");
jest.mock("../../src/services/produtos.service");
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();
    return res;
};
describe("ProdutoController", () => {
    let controller;
    let mockService;
    beforeEach(() => {
        mockService = new produtos_service_1.ProdutoService();
        controller = new produtos_controller_1.ProdutoController();
        controller.produtoService = mockService;
    });
    it("deve retornar 200 e o produto quando encontrado", async () => {
        const req = {
            params: { codigo: "023-000.019.018" },
        };
        const res = mockResponse();
        mockService.getProdutoByCodigo.mockResolvedValue({
            "fkpalet": 3711,
            "idromaneio": 431,
            "rom_romaneio": "18708",
            "rom_talhao": "2  ",
            "rom_dtcolheita": "2022-08-11T00:00:00.000Z",
            "rom_dtchegada": "2022-08-11T00:00:00.000Z",
            "emp_razaoSocial": "Frutas Yang",
            "fkempresa": 6,
            "endereco": "CORREGO DA CALIFORNIA",
            "cidade": "Caravelas-BA",
            "pro_descricao": "Mamão Formosa",
            "tam_descricao": "Sem Calibre",
            "cai_descricao": "Caixa Papelao 10kg - Formosa",
            "Cademb_nome": "DIEGO DE OLIVEIRA MATEUS ",
            "palcai_qtd": 1,
            "palcai_peso": 8,
            "codcaixa": "023000019018"
        });
        await controller.getProdutoPorCodigo(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            "fkpalet": 3711,
            "idromaneio": 431,
            "rom_romaneio": "18708",
            "rom_talhao": "2  ",
            "rom_dtcolheita": "2022-08-11T00:00:00.000Z",
            "rom_dtchegada": "2022-08-11T00:00:00.000Z",
            "emp_razaoSocial": "Frutas Yang",
            "fkempresa": 6,
            "endereco": "CORREGO DA CALIFORNIA",
            "cidade": "Caravelas-BA",
            "pro_descricao": "Mamão Formosa",
            "tam_descricao": "Sem Calibre",
            "cai_descricao": "Caixa Papelao 10kg - Formosa",
            "Cademb_nome": "DIEGO DE OLIVEIRA MATEUS ",
            "palcai_qtd": 1,
            "palcai_peso": 8,
            "codcaixa": "023000019018"
        });
    });
    it("deve retornar 404 se o produto não for encontrado", async () => {
        const req = {
            params: { codigo: "023-000.019.000" },
        };
        const res = mockResponse();
        mockService.getProdutoByCodigo.mockResolvedValue(null);
        await controller.getProdutoPorCodigo(req, res);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: "Nenhum dado encontrado para o código fornecido.",
        });
    });
    it("deve retornar 400 para parâmetro inválido", async () => {
        const req = {
            params: { codigo: "" },
        };
        const res = mockResponse();
        await controller.getProdutoPorCodigo(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
    });
    it("deve retornar 500 em caso de erro inesperado", async () => {
        const req = {
            params: { codigo: "023-000.019.018" },
        };
        const res = mockResponse();
        mockService.getProdutoByCodigo.mockRejectedValue(new Error("Falha inesperada"));
        await controller.getProdutoPorCodigo(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: "Erro ao buscar Produtos.",
            detalhes: "Falha inesperada",
        });
    });
});
