import { prisma } from "../prisma/client";
import { CaixasPaletizadaMobileResult } from "../models/caixas";
import { toCaixaPaletizada } from "../mappers/caixaPaletizada";
import { CaixaPaletizada } from "../controllers/protocols";

export class ProdutoService {
  async getProdutoByCodigo(codigo: string): Promise<CaixaPaletizada | null> {
    const retornaDados = 1;

    const resultadoRaw = await prisma.$queryRaw<CaixasPaletizadaMobileResult[]>`
      EXEC sp_p_CaixasPaletizada_mobile @codcaixa=${codigo}, @retornaDados=${retornaDados}
    `;
    if (resultadoRaw && resultadoRaw.length > 0) {
      // Mapeia o resultado "cru" para o nosso modelo de domínio "limpo"
      const resultadoMapeado = toCaixaPaletizada(resultadoRaw[0]);
      return resultadoMapeado;
    }
    return null;
  }
}
