export interface Produto {
  // Campos principais (Usados na UI)
  produto: string;
  lote: string;
  produtor: string;
  dataColheita: string;
  origem: string;
  talhao: string;
  embalador: string;

  // Novos campos obrigatórios (Adicionados para corrigir os erros de TS)
  cidade: string;
  tamanhoProduto: string;

  // Campos opcionais ou auxiliares
  validade?: string | null;
  dataChegada?: string;
  embalagem?: string;
  codigoCaixa?: string;
  endereco?: string;
  numeroRomaneio?: string;
}
