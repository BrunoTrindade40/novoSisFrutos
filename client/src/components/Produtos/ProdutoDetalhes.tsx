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
          <p><strong>Código:</strong> {produto.codcaixa}</p>
          <p><strong>Nome:</strong> {produto.cai_descricao}</p>
          <p><strong>Descrição:</strong> {produto.pro_descricao}</p>
          <p><strong>Produtor:</strong> {produto.emp_razaoSocial}</p>
          <p><strong>Romaneio:</strong> {produto.rom_romaneio}</p>
          <p><strong>Endereço:</strong> {produto.endereco}</p>
        </Box>
        <Box sx={{ minWidth: 250 }}>
          <p><strong>Talhão:</strong> {produto.rom_talhao}</p>
          <p><strong>Quantidade Pallet:</strong> {produto.palcai_qtd}</p>
          <p><strong>Embalador:</strong> {produto.Cademb_nome}</p>
          <p><strong>Cidade:</strong> {produto.cidade}</p>
          <p><strong>Data da Colheita:</strong> {new Date(produto.rom_dtcolheita).toLocaleDateString()}</p>
          <p><strong>Data de Chegada:</strong> {new Date(produto.rom_dtchegada).toLocaleDateString()}</p>
        </Box>
      </Box>
    </>
  );
}
