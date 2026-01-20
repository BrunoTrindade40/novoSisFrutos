import { CaixaPaletizada } from "../controllers/protocols";
import { CaixasPaletizadaMobileResult } from "../models/caixas";

const normalizeKeys = (obj: any): any => {
  if (!obj || typeof obj !== "object") return {};
  const newObj: any = {};
  Object.keys(obj).forEach((key) => {
    newObj[key.toLowerCase()] = obj[key];
  });
  return newObj;
};

// ATUALIZADO: Regra para retornar "Não informado" se vier vazio ou nulo
const safeStr = (val: any) => {
  if (val === null || val === undefined || String(val).trim() === "") {
    return "Não informado";
  }
  return String(val).trim();
};

export function toCaixaPaletizada(
  dbResultRaw: CaixasPaletizadaMobileResult | any
): CaixaPaletizada {
  const dbResult = normalizeKeys(dbResultRaw);

  return {
    codigoCaixa: safeStr(dbResult.palcai_codigo || dbResult.codigocaixa),

    nomeProduto: safeStr(dbResult.pro_descricao),

    // Datas mantemos a lógica de fallback, mas se tudo falhar, cai no "Não informado"
    dataColheita: dbResult.rom_dtcolheita || "Não informado",

    dataChegada:
      dbResult.rom_dtchegada || dbResult.rom_dtcolheita || "Não informado",

    produtorEmpresa: safeStr(dbResult.emp_razaosocial),

    nomeEmbalador: safeStr(dbResult.cademb_nome),

    embalagem: safeStr(dbResult.cai_descricao),

    numeroRomaneio: safeStr(dbResult.rom_romaneio),

    // Mapeamento correto do Talhão
    talhaoRomaneio: safeStr(dbResult.rom_talhao),

    // ADICIONADO: Mapeamento do Lote que estava faltando
    lote: safeStr(dbResult.rom_lote),

    endereco: safeStr(dbResult.endereco),
    cidade: safeStr(dbResult.cidade),
    tamanhoProduto: safeStr(dbResult.tam_descricao),
  };
}
