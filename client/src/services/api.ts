// Acede à variável de ambiente de forma segura.
const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function buscarProdutoPorCodigo(
  codigo: string
): Promise<Response> {
  // Constrói a URL final usando a variável de ambiente.
  const url = `${API_URL}/produtos/${codigo}`;

  return fetch(url, { method: 'GET' });
}
