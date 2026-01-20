import { PrismaClient } from "@prisma/client";
import { AppError } from "../utils/AppError";
import { toCaixaPaletizada } from "../mappers/caixaPaletizada";
import { CaixaPaletizada } from "../controllers/protocols";
import { prisma } from "../prisma/client";

export class ProdutosService {
  async buscarPorCodigo(codigoNumerico: string): Promise<CaixaPaletizada> {
    // SET NOCOUNT ON é vital para ignorar contagens de linhas de tabelas temporárias
    const query = `
      SET NOCOUNT ON;
      EXEC sp_p_CaixasPaletizada_mobile @codcaixa = '${codigoNumerico}', @retornaDados = 1;
    `;

    console.log(`[Service] Executando: ${query}`);

    const result: any = await prisma.$queryRawUnsafe(query);

    // Função recursiva para encontrar o objeto real em meio a arrays aninhados ou metadados
    const extrairDados = (data: any): any => {
      if (!data) return null;

      // Se for Array, varre cada item
      if (Array.isArray(data)) {
        for (const item of data) {
          // Recursão para arrays dentro de arrays (comum em SPs complexas)
          const found = extrairDados(item);
          if (found) return found;
        }
        return null;
      }

      // Se for Objeto, valida se é o registro de rastreio
      if (typeof data === "object" && data !== null) {
        // Normaliza chaves para evitar erro de Case Sensitive
        const keys = Object.keys(data).map((k) => k.toLowerCase());

        // Validação: O objeto tem que ter uma dessas chaves para ser considerado o dado real
        const temChaveValida =
          keys.includes("palcai_codigo") ||
          keys.includes("rom_romaneio") ||
          keys.includes("pro_descricao");

        // Se tiver a chave, é o dado que queremos. Se for chave vazia {"": 123}, ignora.
        if (temChaveValida) {
          return data;
        }
      }

      return null;
    };

    const dadosBanco = extrairDados(result);

    if (!dadosBanco) {
      // Log detalhado para ajudar no debug se falhar novamente
      console.error(
        "[Service] Falha: Objeto retornado não contém dados do produto. Retorno bruto:",
        JSON.stringify(result, null, 2)
      );
      throw new AppError("Nenhum registro encontrado para este código.", 404);
    }

    console.log("[Service] Dados válidos extraídos com sucesso.");

    return toCaixaPaletizada(dadosBanco);
  }
}
