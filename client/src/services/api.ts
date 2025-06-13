export async function buscarProdutoPorCodigo(codigo: string): Promise<Response> {
  const url = `https://sisfrutos-adelphofrutas.com.br/api/produtos/${codigo}`;
  return fetch(url, { method: 'GET' });
}
