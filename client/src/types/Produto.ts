export interface Produto {
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
