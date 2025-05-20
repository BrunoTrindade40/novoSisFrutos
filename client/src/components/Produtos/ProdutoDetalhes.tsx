import { Box } from '@mui/material';
import type { Produto } from '../../types/Produto';

interface Props {
  produto: Produto;
}

export function ProdutoDetalhes({ produto } : Props) {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <h2 className="text-lg font-semibold mb-2">Detalhes do Produto</h2>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          justifyContent: 'center',
          mt: 2,
          backgroundColor: '#f4f4f4',
          borderRadius: 2,
          p: 3,
        }}
      >
        <Box sx={{ minWidth: 250 }}>
          <p><strong>ID:</strong> {produto.id}</p>
          <p><strong>Código:</strong> {produto.codigo}</p>
          <p><strong>Nome:</strong> {produto.nome}</p>
          <p><strong>Descrição:</strong> {produto.descricao}</p>
          <p><strong>Preço:</strong> R$ {produto.preco.toFixed(2)}</p>
          <p><strong>Produtor:</strong> {produto.produtor}</p>
          <p><strong>Romaneio:</strong> {produto.romaneio}</p>
        </Box>
        <Box sx={{ minWidth: 250 }}>
          <p><strong>Talhão:</strong> {produto.talhao}</p>
          <p><strong>Estoque:</strong> {produto.estoque}</p>
          <p><strong>Embalagem:</strong> {produto.embalagem}</p>
          <p><strong>Embalador:</strong> {produto.embalador}</p>
          <p><strong>Cidade:</strong> {produto.cidade}</p>
          <p><strong>Colheita:</strong> {new Date(produto.colheita).toLocaleDateString()}</p>
          <p><strong>Chegada:</strong> {new Date(produto.chegada).toLocaleDateString()}</p>
        </Box>
      </Box>
    </>
  );
}
