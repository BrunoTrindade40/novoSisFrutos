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
  palcai_qtd: number;
  palcai_peso: number;
  palcai_codigo: string;
}
export interface CaixasEmbaladaMobileResult {
  fkromaneio: number;
  rom_romaneio: string;
  rom_talhao: string;
  rom_dtcolheita: string;
  rom_dtchegada: string;
  emp_razaoSocial: string;
  endereco: string;
  cidade: string;
  pro_descricao: string;
  embalador: string;
  CaiEmb_CodCaixa: string;
  caiemb_status: number;
}
