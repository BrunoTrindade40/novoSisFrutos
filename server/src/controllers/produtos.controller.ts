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

      const produto = await this.produtoService.getProdutoByCodigo(codigo);

      if (!produto) {
        return res.status(404).json({ message: "Nenhum dado encontrado para o código fornecido." });
      }

      return res.status(200).json(produto);
    } catch (err) {
      return res.status(500).json({
        error: "Erro ao buscar Produtos.",
        detalhes: err instanceof Error ? err.message : err,
      });
    }
  }

  /* async handleGetProdutos(req: Request, res: Response) {
    try {
      console.log(req.body);
      const prods = await prisma.produto.findMany();
      return res.status(200).json(prods); 
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar Produtos." });
    }
  }*/
  /* async handleGetProdutoByCodigo(
    req: Request<{}, {}, produtoCodigoSchema>,
    res: Response
  ) {
    try {
      const validatedParam = ProdutoCodigoInput.parse(req.params);
      validatedParam.codigo = somenteNumeros(validatedParam.codigo);
      const { codigo } = validatedParam;
      const retornaDados = 1;

      if (!codigo) {
        return res.status(400).json({ error: "Código é obrigatório." });
      }

      const resultado = await prisma.$queryRaw<CaixasPaletizadaMobileResult[]>`
        EXEC sp_p_CaixasPaletizada_mobile @codcaixa=${codigo}, @retornaDados=${retornaDados}
      `;
      if (resultado.length > 0) {
        resultado[0].codcaixa = codigo;
        return res.status(200).json(resultado[0]);
      } else {
        return res.status(404).json({ message: "Nenhum dado encontrado para o código fornecido." });
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: "Erro ao buscar Produtos.", errorJson: err });
    }
  } */

}