import api from './api';

// Interface sincronizada com o retorno do backend (CaixaPaletizada)
export interface RastreioResponse {
  codigoCaixa: string;
  nomeProduto: string;
  dataColheita: string;
  dataChegada: string;
  produtorEmpresa: string;
  nomeEmbalador: string;
  embalagem: string;
  numeroRomaneio: string;
  talhaoRomaneio: string;
  lote: string; // <--- ADICIONADO NO FRONT
  endereco: string;
  cidade: string;
  tamanhoProduto: string;
}

export async function buscarRastreio(
  codigo: string
): Promise<RastreioResponse> {
  try {
    const codigoSanitizado = codigo.replace(/\D/g, '');

    const response = await api.get<RastreioResponse>(
      `/rastreio/${codigoSanitizado}`
    );
    return response.data;
  } catch (error: any) {
    console.error('Erro na requisição de rastreio:', error);

    const errorMessage =
      error.response?.data?.message ||
      'Não foi possível localizar o produto. Verifique o código digitado.';

    throw new Error(errorMessage);
  }
}
