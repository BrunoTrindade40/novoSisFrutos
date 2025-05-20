export async function buscarProdutoPorCodigo(codigo: string): Promise<Response> {
  const url = `http://localhost:3000/api/produtos/${codigo}`;
  return fetch(url, { method: 'GET' });
}
