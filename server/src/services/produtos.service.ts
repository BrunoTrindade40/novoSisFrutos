import { prisma } from "../prisma/client";
import { CaixasPaletizadaMobileResult } from "../models/caixas";

export class ProdutoService {
  async getProdutoByCodigo(codigo: string): Promise<CaixasPaletizadaMobileResult | null> {
    const retornaDados = 1;

    const resultado = await prisma.$queryRaw<CaixasPaletizadaMobileResult[]>`
      EXEC sp_p_CaixasPaletizada_mobile @codcaixa=${codigo}, @retornaDados=${retornaDados}
    `;

    if (resultado.length > 0) {
      resultado[0].codcaixa = codigo; // sobrescreve com o código validado, se necessário
      return resultado[0];
    }

    return null;
  }
}
