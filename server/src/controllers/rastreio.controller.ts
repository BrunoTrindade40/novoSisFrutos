import { Request, Response } from "express";
import { z } from "zod";
import { ProdutosService } from "../services/produtos.service";

// Schema de validação simples
const rastreioSchema = z.object({
  codigo: z.string().min(5, "Código muito curto para pesquisa."),
});

export const rastreioController = {
  async buscarPorCodigoComSP(req: Request, res: Response) {
    try {
      // 1. Validação dos parâmetros
      const validation = rastreioSchema.safeParse(req.params);
      if (!validation.success) {
        return res.status(400).json({
          message: "Código inválido.",
          errors: validation.error.flatten().fieldErrors,
        });
      }

      // 2. Sanitização: Remove caracteres não numéricos
      const codigoNumerico = validation.data.codigo.replace(/\D/g, "");

      if (!codigoNumerico) {
        return res
          .status(400)
          .json({ message: "O código deve conter números." });
      }

      // 3. Chamada ao Serviço
      const service = new ProdutosService();
      const produto = await service.buscarPorCodigo(codigoNumerico);

      // 4. Resposta
      return res.status(200).json(produto);
    } catch (error: any) {
      console.error("[RastreioController] Erro:", error);

      // Tratamento de erros conhecidos (AppError)
      if (error.statusCode) {
        return res.status(error.statusCode).json({ message: error.message });
      }

      // Tratamento de erro genérico
      return res.status(500).json({
        message: "Erro interno ao buscar o rastreamento.",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  },
};
