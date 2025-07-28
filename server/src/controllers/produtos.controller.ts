import { Request, Response } from "express";
import { produtoCodigoSchema } from "../schemas/produtos.schema";
import { ProdutoService } from "../services/produtos.service";
import { somenteNumeros } from "../utils/formatter";

export class ProdutoController {
  private produtoService = new ProdutoService();
  async getProdutoPorCodigo(req: Request, res: Response) {
    try {
      const parsed = produtoCodigoSchema.safeParse(req.params);

      if (!parsed.success) {
        return res.status(400).json({
          error: "Parâmetro inválido",
          detalhes: parsed.error.format(),
        });
      }

      let { codigo } = parsed.data;
      codigo = somenteNumeros(codigo);

      if (!codigo) {
        return res.status(400).json({ error: "Código é obrigatório." });
      }

      /* const produto = await this.produtoService.getProdutoByCodigo(codigo); */
      const produto =
        await this.produtoService.getProdutoByCodigo_CaiEmbalagem(codigo);

      if (!produto) {
        return res
          .status(404)
          .json({ message: "Nenhum dado encontrado para o código fornecido." });
      }

      return res.status(200).json(produto);
    } catch (err) {
      return res.status(500).json({
        error: "Erro ao buscar Produtos.",
        detalhes: err instanceof Error ? err.message : err,
      });
    }
  }
}
