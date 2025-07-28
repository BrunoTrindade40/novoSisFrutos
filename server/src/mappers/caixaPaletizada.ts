// mappers/produtoMapper.ts (exemplo de organização)

import { CaixaPaletizada } from "../controllers/protocols";
import { CaixasPaletizadaMobileResult } from "../models/caixas";

export function toCaixaPaletizada(
  dbResult: CaixasPaletizadaMobileResult
): CaixaPaletizada {
  return {
    codigoCaixa: dbResult.palcai_codigo,
    nomeProduto: dbResult.pro_descricao,
    dataColheita: dbResult.rom_dtcolheita,
    dataChegada: dbResult.rom_dtchegada || dbResult.rom_dtcolheita,
    produtorEmpresa: dbResult.emp_razaoSocial,
    embalagem: dbResult.cai_descricao,
    nomeEmbalador: dbResult.Cademb_nome,
    numeroRomaneio: dbResult.rom_romaneio,
    talhaoRomaneio: dbResult.rom_talhao.trim(),
    endereco: dbResult.endereco,
    cidade: dbResult.cidade,
    tamanhoProduto: dbResult.tam_descricao,
  };
}
