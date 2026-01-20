export interface CaixasPaletizadaMobileResult {
  fkpalet: number;
  idromaneio: number;
  rom_romaneio: string;
  rom_talhao: string;
  rom_dtcolheita: string;
  rom_dtchegada: string;
  emp_razaoSocial: string;
  fkempresa: number;
  endereco: string;
  cidade: string;
  pro_descricao: string;
  tam_descricao: string;
  cai_descricao: string;
  Cademb_nome: string;
  palcai_qtd: number; // Ou number/Decimal
  palcai_peso: number; // Ou number/Decimal
  palcai_codigo: string;
}

// Interface que representa o seu MODELO DE DOMÍNIO (nomes "limpos")
export interface CaixaPaletizada {
  codigoCaixa: string;
  nomeProduto: string;
  dataColheita: string | Date;
  dataChegada: string | Date;
  produtorEmpresa: string;
  nomeEmbalador: string;
  embalagem: string;
  numeroRomaneio: string;
  talhaoRomaneio: string;
  lote: string; // <--- ADICIONADO: O campo que faltava
  endereco: string;
  cidade: string;
  tamanhoProduto: string;
}

export interface CaixasEmbaladaMobileResult {
  fkromaneio: number;
  rom_romaneio: string;
  rom_dtchegada: string;
  emp_razaoSocial: string;
  endereco: string;
  cidade: string;
  pro_descricao: string;
  CaiEmb_CodCaixa: string;
  embalador: string;
  caiemb_status: number;
}
export interface CaixaEmbalada {
  codigoCaixa: string;
  nomeProduto: string;
  dataColheita: string | Date;
  dataChegada: string | Date;
  produtorEmpresa: string;
  nomeEmbalador: string;
  embalagem: string;
  numeroRomaneio: string;
  talhaoRomaneio: string;
  endereco: string;
  cidade: string;
  tamanhoProduto: string;
}
