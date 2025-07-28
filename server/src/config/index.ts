import dotenv from "dotenv";
import path from "path";

// Interface para a configuração da aplicação
interface AppConfig {
  nodeEnv: string;
  port: number;
  database: {
    url: string;
  };
  cors: {
    allowedOrigins: string[];
  };
}

// Declara a variável de configuração que será preenchida condicionalmente
let config: AppConfig;
const nodeEnv = process.env.NODE_ENV || "development";

if (nodeEnv === "production") {
  // --- LÓGICA DE PRODUÇÃO ---
  // Carrega a configuração de um arquivo injetado, não de .env
  try {
    // Usamos require() porque o arquivo só existirá no ambiente de produção
    // e não deve ser analisado pelo 'import' em outros ambientes.
    const { productionConfig } = require("./production.config.js");

    config = {
      nodeEnv: "production",
      // Em produção, a porta geralmente é definida pela plataforma de hospedagem
      port: parseInt(process.env.PORT || "3000", 10),
      database: {
        url: productionConfig.database.url,
      },
      cors: {
        allowedOrigins: productionConfig.cors.allowedOrigins,
      },
    };
  } catch (error) {
    console.error(
      "ERRO CRÍTICO: Arquivo de configuração de produção (production.config.js) não encontrado."
    );
    // Lança um erro para impedir que a aplicação inicie sem configuração.
    throw new Error("Falha ao carregar a configuração de produção.");
  }
} else {
  // --- LÓGICA DE DESENVOLVIMENTO E TESTE ---
  // Continua usando dotenv para carregar os arquivos .env.development ou .env.test
  dotenv.config({
    path: path.resolve(__dirname, `../../.env.${nodeEnv}`),
  });

  config = {
    nodeEnv: nodeEnv,
    port: parseInt(process.env.PORT || "3000", 10),
    database: {
      url: process.env.DATABASE_URL || "",
    },
    cors: {
      allowedOrigins: (process.env.CORS_ORIGINS || "").split(","),
    },
  };
}

// A validação final se aplica a todos os ambientes
if (!config.database.url) {
  throw new Error(
    `DATABASE_URL não foi definida para o ambiente [${nodeEnv}].`
  );
}

export default config;
