// Arquivo: server/start-bs.js
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

console.log("--- INICIANDO LOADER (WINDOWS FIX) ---");
console.log("Diretório base (__dirname):", __dirname);

// 1. Define caminhos ABSOLUTOS (Independente de onde o terminal esteja)
//const envPath = path.join(__dirname, "config", "Frutas_BS", ".env.production");
const envPath = path.join(
  __dirname,
  "config",
  "Frutas_Uniao",
  ".env.production"
);
const appPath = path.join(__dirname, "dist", "index.js");

// 2. Validação de Segurança (Verifica se os arquivos existem antes de quebrar)
if (!fs.existsSync(envPath)) {
  console.error(
    "❌ ERRO CRÍTICO: Arquivo .env não encontrado no caminho absoluto:"
  );
  console.error(envPath);
  process.exit(1);
}

if (!fs.existsSync(appPath)) {
  console.error(
    "❌ ERRO CRÍTICO: Aplicação compilada (dist/index.js) não encontrada em:"
  );
  console.error(appPath);
  console.error('Você rodou o "npm run build"?');
  process.exit(1);
}

// 3. Carrega variáveis
const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error("❌ Erro ao ler conteúdo do .env");
  throw result.error;
}

process.env.NODE_ENV = "production";

console.log("✅ Variáveis carregadas de:", envPath);
console.log("🚀 Iniciando aplicação em:", appPath);

// 4. Inicia o servidor compilado
require(appPath);
