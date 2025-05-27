import React from "react";
import { Typography, Box, Container } from "@mui/material";

export function TextoRastreamentoDeFrutos() {
  return (
    <Container maxWidth="md"> {/* Limita a largura do texto para melhor legibilidade */}
      <Box sx={{ mb: 4 }}> {/* Margem inferior para separar do formulário */}
        {/* Título: Rastreabilidade do Fruto */}
        <Typography
          variant="h4" // Usa o estilo h4 definido no seu tema
          component="h2" // Renderiza semanticamente como h2
          align="center" // Centraliza o título
          sx={{ mb: 4 }} // Margem inferior maior para separar do primeiro parágrafo
        >
          RASTREABILIDADE DO FRUTO
        </Typography>

        {/* Parágrafos do texto - Alinhados à esquerda por padrão (ou justificados se preferir) */}
        <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}> {/* Use textAlign: 'justify' para texto justificado */}
          A rastreabilidade da cadeia produtiva de um produto é a capacidade de
          recuperar o histórico de todo o caminho percorrido pelo mesmo, desde
          sua colheita na lavoura até a mesa do consumidor.
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
          A rastreabilidade de frutos in-natura é um processo cada vez mais em
          pauta, pois permite que produtores, embaladores e distribuidores
          estejam preparados para responder de forma rápida e precisa a qualquer
          tipo de emergência sanitária. Além disso, um bom processo de
          rastreabilidade permite oferecer ao consumidor final a possibilidade
          de ele conhecer a origem e a qualidade do fruto que está consumindo.
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
          A metodologia de rastreabilidade utilizada em nossos processos conta
          com tecnologia de ponta e é formada por quatro etapas:
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
          A primeira etapa é o controle na colheita realizado nos pomares
          próprios e de produtores parceiros. Estes pomares são divididos em
          talhões devidamente identificados, a fim de proporcionar controle mais
          efetivo das frutas a serem colhidas. Todas as atividades referentes
          aos talhões são registradas em cadernos de campo nos moldes da
          Produção Integrada de Frutas (PIF) para posterior controle;
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
          Na segunda etapa, todos os lotes de frutos recebidos no Packing House
          são identificados digitalmente através de um QRCode único, que
          acompanhará cada fruto durante todos os processos dentro da empresa;
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
          No processo de embalagem, um sistema automatizado, lê o QrCode do
          fruto e inclui as informações do embalador no mesmo;
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
          No processo de expedição, os frutos enviados tem os seus respectivos
          códigos lidos de forma automatizada, agregando a informação do destino
          final de cada fruto.
        </Typography>

        <Typography variant="body1" sx={{ mt: 3, mb: 2, textAlign: 'justify' }}>
          Com isso, nossos clientes podem consultar através do QrCode impresso
          em nossas embalagens, ou diretamente em nossa página, todo o caminho
          percorrido pelo produto, desde a colheita na lavoura até a sua mesa.
        </Typography>
      </Box>
    </Container>
  );
}