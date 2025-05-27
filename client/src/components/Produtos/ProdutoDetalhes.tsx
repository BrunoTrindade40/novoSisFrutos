import { Box, Typography, Paper } from '@mui/material'; // Adicionar Typography e Paper
import type { Produto } from '../../types/Produto';

interface Props {
  produto: Produto;
}

export function ProdutoDetalhes({ produto }: Props) {
  return (
    // Envolver tudo em um Paper para dar um visual de card aos detalhes
    <Paper
      sx={{
        mt: 4, // Margem superior para separar do formulário ou mensagem de erro
        p: { xs: 2, md: 4 }, // Padding responsivo (menor em telas pequenas, maior em md+)
        backgroundColor: 'background.paper', // Usa a cor de fundo do Paper do tema (geralmente branco)
        borderRadius: 2, // Borda arredondada
        boxShadow: 3, // Sombra para dar profundidade
      }}
    >
      {/* Título "Detalhes do Produto" */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}> {/* mb para separar do conteúdo */}
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
          Detalhes do Produto
        </Typography>
      </Box>

      {/* Conteúdo dos detalhes (duas colunas) */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap', // Permite que as colunas quebrem para a próxima linha em telas menores
          gap: { xs: 2, md: 6 }, // Espaçamento entre as colunas (responsivo)
          justifyContent: { xs: 'flex-start', md: 'center' }, // Alinha à esquerda em sm, centraliza em md+
          // Removido backgroundColor aqui, pois o Paper já define o fundo
        }}
      >
        {/* Primeira Coluna de Detalhes */}
        <Box sx={{ minWidth: { xs: '100%', sm: 250 }, mb: { xs: 2, md: 0 } }}> {/* Ocupa 100% em xs, minWidth em sm+ */}
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Código:</strong> {produto.codcaixa}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Nome:</strong> {produto.cai_descricao}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Descrição:</strong> {produto.pro_descricao}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Produtor:</strong> {produto.emp_razaoSocial}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Romaneio:</strong> {produto.rom_romaneio}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Endereço:</strong> {produto.endereco}
          </Typography>
        </Box>

        {/* Segunda Coluna de Detalhes */}
        <Box sx={{ minWidth: { xs: '100%', sm: 250 } }}> {/* Ocupa 100% em xs, minWidth em sm+ */}
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Talhão:</strong> {produto.rom_talhao}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Quantidade Pallet:</strong> {produto.palcai_qtd}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Embalador:</strong> {produto.Cademb_nome}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Cidade:</strong> {produto.cidade}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Data da Colheita:</strong> {new Date(produto.rom_dtcolheita).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Data de Chegada:</strong> {new Date(produto.rom_dtchegada).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}