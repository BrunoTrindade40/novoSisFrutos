/**
 * converter.js
 *
 * Este script percorre recursivamente um diretório, lê arquivos de tipos específicos,
 * e consolida todo o conteúdo em um único arquivo de texto. Ao final, anexa um
 * relatório detalhado das operações realizadas.
 */

const fs = require("fs");
const path = require("path");

// --- CONFIGURAÇÕES ---
const diretorioRaiz = process.cwd();
const timestamp = Date.now();
const nomeArquivoSaida = `relatorio_rastreamento_conversao_${timestamp}.txt`;

const extensoesPermitidas = [
  ".tsx",
  ".ts",
  ".json",
  ".html",
  ".css",
  ".py",
  ".md",
];
const pastasExcluidas = ["node_modules", ".git", "dist", "build"];

// --- COLETORES DE DADOS PARA O RELATÓRIO ---
const arquivosProcessadosLog = [];
const pastasExcluidasLog = new Set();

/**
 * Gera a seção final do relatório em formato de texto.
 * @returns {string} O conteúdo textual completo do relatório.
 */
function gerarConteudoRelatorio() {
  let repDiretorioRaiz = diretorioRaiz.replace(/\\/g, "/");
  let relatorio = `\n\n\n`;
  relatorio += `========================================\n`;
  relatorio += `        RELATÓRIO DE PROCESSAMENTO\n`;
  relatorio += `========================================\n\n`;
  relatorio += `Diretório de Origem: "${repDiretorioRaiz}"\n\n`;

  relatorio += `--- Arquivos Processados (${arquivosProcessadosLog.length}) ---\n`;
  if (arquivosProcessadosLog.length > 0) {
    arquivosProcessadosLog.forEach((p) => {
      let pCaminho = p.replace(/\\/g, "/");
      relatorio += `- Caminho: "${pCaminho}"\n`;
    });
  } else {
    relatorio += `Nenhum arquivo foi processado.\n`;
  }

  relatorio += `\n--- Subpastas Excluídas do Processo ---\n`;
  if (pastasExcluidasLog.size > 0) {
    pastasExcluidasLog.forEach((p) => {
      relatorio += `- Subpasta: "${p}"\n`;
    });
  } else {
    relatorio += `Nenhuma subpasta foi explicitamente excluída.\n`;
  }

  relatorio += `\n========================================\n`;
  relatorio += `Relatório gerado em: ${new Date(timestamp).toISOString()}\n`;

  return relatorio;
}

/**
 * Função recursiva que percorre um diretório, lê os arquivos permitidos e
 * escreve seu conteúdo em um stream de saída.
 * @param {string} diretorioAtual - O caminho do diretório a ser processado.
 * @param {fs.WriteStream} writeStream - O stream de escrita para o arquivo de saída consolidado.
 */
function processarDiretorio(diretorioAtual, writeStream) {
  try {
    const itens = fs.readdirSync(diretorioAtual);

    for (const item of itens) {
      const caminhoCompletoItem = path.join(diretorioAtual, item);

      try {
        const stat = fs.statSync(caminhoCompletoItem);

        if (stat.isDirectory()) {
          if (pastasExcluidas.includes(item)) {
            pastasExcluidasLog.add(item);
            continue; // Pula para o próximo item se a pasta estiver na lista de exclusão.
          }
          // Chama a si mesma para a subpasta (recursão).
          processarDiretorio(caminhoCompletoItem, writeStream);
        } else if (stat.isFile()) {
          const extensao = path.extname(caminhoCompletoItem);

          if (extensoesPermitidas.includes(extensao)) {
            const caminhoRelativo = path
              .relative(diretorioRaiz, caminhoCompletoItem)
              .replace(/\\/g, "/");

            // Adiciona o arquivo ao log para o relatório final.
            arquivosProcessadosLog.push(caminhoRelativo);

            // Escreve o cabeçalho demarcador no arquivo de saída.
            writeStream.write(
              `--- INÍCIO DO ARQUIVO: "${caminhoRelativo}" ---\n\n`
            );

            // Lê o conteúdo do arquivo e o escreve no stream.
            const conteudo = fs.readFileSync(caminhoCompletoItem, "utf8");
            writeStream.write(conteudo);

            // Escreve o rodapé demarcador no arquivo de saída.
            writeStream.write(
              `\n\n--- FIM DO ARQUIVO: "${caminhoRelativo}" ---\n\n`
            );
          }
        }
      } catch (error) {
        console.error(
          `Erro ao processar o item ${caminhoCompletoItem}: ${error.message}`
        );
      }
    }
  } catch (error) {
    console.error(
      `Erro ao ler o diretório ${diretorioAtual}: ${error.message}`
    );
  }
}

// --- EXECUÇÃO ---

/**
 * Função principal que orquestra todo o processo.
 */
function executar() {
  const caminhoArquivoSaida = path.join(diretorioRaiz, nomeArquivoSaida);
  // Usa um stream de escrita para otimizar o uso de memória ao lidar com muitos arquivos.
  const writeStream = fs.createWriteStream(caminhoArquivoSaida, {
    encoding: "utf8",
  });

  console.log(
    `Iniciando processo... O resultado será salvo em: ${caminhoArquivoSaida}`
  );

  // Listener para erros no stream de escrita.
  writeStream.on("error", (error) => {
    console.error(
      "Ocorreu um erro durante a escrita no arquivo de saída:",
      error
    );
  });

  // Listener para quando o stream finalizar a escrita.
  writeStream.on("finish", () => {
    console.log("---");
    console.log("Processo concluído com sucesso!");
    console.log(
      `Arquivo consolidado e relatório gerado em: ${caminhoArquivoSaida}`
    );
  });

  try {
    // Inicia o processo de leitura e escrita a partir do diretório raiz.
    processarDiretorio(diretorioRaiz, writeStream);

    // Após percorrer todos os diretórios, gera e escreve o relatório final.
    const relatorioFinal = gerarConteudoRelatorio();
    writeStream.write(relatorioFinal);

    // Finaliza o stream, o que acionará o evento 'finish'.
    writeStream.end();
  } catch (error) {
    console.error("Ocorreu um erro fatal durante a execução:", error.message);
    writeStream.end(); // Garante que o stream seja fechado mesmo em caso de erro fatal.
  }
}

// Inicia a execução do script.
executar();
