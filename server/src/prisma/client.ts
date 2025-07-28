import { PrismaClient } from "@prisma/client";
// 1. Importe a sua configuração centralizada
import config from "../config";

// O tipo agora pode ser PrismaClient ou undefined para mais segurança
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 2. Usamos a instância global em cache OU criamos uma nova,
//    passando a configuração do banco de dados explicitamente.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // 3. INJEÇÃO DA URL DO BANCO DE DADOS
    //    Isso resolve o erro "Environment variable not found".
    datasources: {
      db: {
        // 'db' deve ser o nome do seu datasource no arquivo schema.prisma
        url: config.database.url,
      },
    },
    // Mantém a sua configuração de log original
    log: ["query", "info", "warn", "error"],
  });

// 4. Em ambientes de não-produção, armazena a instância recém-criada
//    no objeto global para que ela seja reutilizada na próxima recarga do módulo.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
