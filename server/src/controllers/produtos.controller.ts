import { Request, Response } from "express";
import { ProdutosService } from "../services/produtos.service";
import { AppError } from "../utils/AppError"; // Supondo que você tenha tratamento de erro

export class ProdutosController {
  async handleBuscaRastreio(req: Request, res: Response): Promise<Response> {
    const { codigo } = req.params;

    // 1. SANITIZAÇÃO: Remove tudo que não é número (guardião)
    const codigoApenasNumeros = codigo.replace(/\D/g, "");

    if (!codigoApenasNumeros) {
      throw new AppError("Código de rastreio inválido.", 400);
    }

    const produtosService = new ProdutosService();

    // 2. Chama o serviço passando apenas números
    const produto = await produtosService.buscarPorCodigo(codigoApenasNumeros);

    return res.json(produto);
  }
}
