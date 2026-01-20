import dotenv from "dotenv";
import path from "path";

// Interface para a configuração da aplicação (sem alterações)
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

const nodeEnv = process.env.NODE_ENV || "development";

// LÓGICA CORRIGIDA:
// Apenas carregamos um arquivo .env se NÃO estivermos em produção.
if (nodeEnv !== "production") {
  const envPath = path.resolve(__dirname, `../../.env.${nodeEnv}`);
  const result = dotenv.config({ path: envPath });

  if (result.error) {
    throw new Error(`Arquivo de ambiente não encontrado em: ${envPath}`);
  }
}

// Agora, para TODOS os ambientes, a fonte da verdade é sempre process.env.
// Em produção, as variáveis já terão sido carregadas pelo script.
// Em desenvolvimento/teste, elas terão sido carregadas pelo bloco `if` acima.
const config: AppConfig = {
  nodeEnv: nodeEnv,
  port: parseInt(process.env.PORT || "3000", 10),
  database: {
    url: process.env.DATABASE_URL || "",
  },
  cors: {
    allowedOrigins: (process.env.CORS_ORIGINS || "").split(","),
  },
};

// Validação final (sem alterações)
if (!config.database.url) {
  throw new Error(
    `DATABASE_URL não foi definida para o ambiente [${nodeEnv}]. Verifique se o arquivo .env correto existe e está sendo carregado, ou se a variável de ambiente foi definida no servidor.`
  );
}

export default config;
