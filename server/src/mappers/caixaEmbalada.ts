import { CaixaEmbalada } from "../controllers/protocols";
import { CaixasEmbaladaMobileResult } from "../models/caixas";

export function toCaixaEmbalada(
  dbResult: CaixasEmbaladaMobileResult
): CaixaEmbalada {
  return {
    codigoCaixa: dbResult.CaiEmb_CodCaixa,
    nomeProduto: dbResult.pro_descricao,
    dataColheita: dbResult.rom_dtcolheita || dbResult.rom_dtchegada,
    dataChegada: dbResult.rom_dtchegada || dbResult.rom_dtcolheita,
    produtorEmpresa: dbResult.emp_razaoSocial,
    embalagem: "*NI*",
    nomeEmbalador: dbResult.embalador,
    numeroRomaneio: dbResult.rom_romaneio,
    talhaoRomaneio: "*NI*",
    endereco: dbResult.endereco,
    cidade: dbResult.cidade,
    tamanhoProduto: "*NI*",
  };
}
