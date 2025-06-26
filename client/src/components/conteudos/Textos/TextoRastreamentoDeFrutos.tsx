import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import imgTexto from '../../../assets/images/imagem-texto-rastreabilidade2.jpg';

// O array 'etapas' não precisa de alterações.
const etapas = [
  {
    titulo: 'Colheita Controlada',
    descricao:
      'A rastreabilidade começa no pomar, onde os frutos são colhidos em talhões identificados, tanto em áreas próprias quanto em propriedades de parceiros. Todas as atividades agrícolas são registradas em cadernos de campo seguindo os padrões da Produção Integrada de Frutas (PIF), garantindo um controle rigoroso desde a origem.',
  },
  {
    titulo: 'Identificação Digital no Processamento',
    descricao:
      'Ao chegarem ao packing house, os frutos recebem um código digital que os acompanha durante todas as etapas de seleção, classificação e controle de qualidade. Isso permite a rastreabilidade individual de cada lote processado.',
  },
  {
    titulo: 'Embalagem e Expedição',
    descricao:
      'Durante a embalagem, cada caixa é identificada com um QR Code que registra dados essenciais, como o tipo de embalagem, data, nome do embalador e lote correspondente. Na expedição, esse mesmo código é lido novamente, permitindo rastrear para qual cliente cada caixa está sendo enviada e, assim, completar o ciclo de rastreabilidade.',
  },
];

export function TextoRastreamentoDeFrutos() {
  return (
    <Box>
      {/* 1. IMAGEM COM FLOAT */}
      {/* A imagem agora flutua à esquerda, permitindo que o texto a envolva. */}
      <Box
        component="img"
        src={imgTexto}
        alt="Rastreabilidade de Frutos: Produtor, Distribuidor, Consumidor"
        sx={{
          // A propriedade 'float' é a chave aqui
          float: 'left',
          // Use margens para criar espaçamento, substituindo o 'gap' do flexbox
          mr: 3, // margin-right
          mb: 1.5, // margin-bottom
          // Mantém seus estilos responsivos e de imagem
          width: { xs: '40%', sm: 220 },
          height: 'auto',
          borderRadius: '8px',
        }}
      />

      {/* 2. TEXTO QUE IRÁ FLUTUAR AO REDOR DA IMAGEM */}
      {/* Note que os parágrafos de texto estão agora como "irmãos" da imagem,
          não dentro de um container flex separado. */}
      <Typography variant="body1" sx={{ textAlign: 'justify', mb: 2 }}>
        A rastreabilidade garante o acompanhamento completo do percurso do fruto
        — desde a colheita no pomar até a mesa do consumidor. Esse processo vem
        ganhando destaque por permitir que produtores, embaladores e
        distribuidores estejam preparados para agir rapidamente diante de
        qualquer eventualidade, além de oferecer ao consumidor informações sobre
        a <span style={{ fontWeight: 'bold' }}>origem</span> e{' '}
        <span style={{ fontWeight: 'bold' }}>qualidade do fruto</span>{' '}
        consumido.
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, textAlign: 'justify' }}>
        Nossa metodologia de rastreabilidade utiliza tecnologia de ponta e está
        dividida em{' '}
        <span style={{ fontWeight: 'bold' }}>três etapas principais</span>:
      </Typography>

      {/* 3. CONTEÚDO RESTANTE */}
      {/* O conteúdo a seguir (a lista e o parágrafo final) fluirá normalmente.
          Como a lista é um elemento de bloco, ela começará abaixo do conteúdo anterior.
          Se o texto que a precede for curto e não ultrapassar a altura da imagem,
          a lista começará abaixo da imagem também, o que é o comportamento correto. */}
      <List sx={{ width: '100%' }}>
        {etapas.map((etapa, index) => (
          <ListItem
            key={index}
            alignItems="flex-start"
            sx={{ display: 'block', p: 0, mb: 3 }}
          >
            <ListItemText
              primary={
                <Typography
                  variant="h6"
                  component="p"
                  sx={{ fontWeight: 'bold', mb: 1 }}
                >
                  {`${index + 1} - ${etapa.titulo}`}
                </Typography>
              }
              secondary={
                <Typography
                  component="span"
                  variant="body1"
                  sx={{ textAlign: 'justify' }}
                >
                  {etapa.descricao}
                </Typography>
              }
              disableTypography
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="body1" sx={{ mt: 2, textAlign: 'justify' }}>
        Todos os dados são disponibilizados em tempo real para consumidores,
        produtores ou distribuidores por meio de{' '}
        <span style={{ fontWeight: 'bold' }}> QR Code </span>ou diretamente pela{' '}
        <span style={{ fontWeight: 'bold' }}>página web</span>. Essa solução
        oferece
        <span style={{ fontWeight: 'bold' }}>
          {' '}
          transparência, segurança e confiança{' '}
        </span>
        em toda a cadeia produtiva.
      </Typography>
    </Box>
  );
}
