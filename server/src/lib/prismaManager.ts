import { PrismaClient } from "@prisma/client";

// Um mapa para armazenar as instâncias do PrismaClient em cache
const clients = new Map<string, PrismaClient>();

// Um mapa para associar o tenantId à sua respectiva variável de ambiente
const tenantDatabaseUrls: Record<string, string | undefined> = {
  "bs-frutas": process.env.DATABASE_URL_BS_FRUTAS,
  "frutas-uniao": process.env.DATABASE_URL_FRUTAS_UNIAO,
};

/**
 * Obtém uma instância do PrismaClient para um tenant específico.
 * Cria uma nova instância se ela não existir no cache.
 * @param tenantId O identificador do tenant (ex: 'bs-frutas').
 * @returns Uma instância do PrismaClient configurada para o banco de dados do tenant.
 */
export function getPrismaClient(tenantId: string): PrismaClient {
  // Verifica se já existe um cliente para este tenant no cache
  let client = clients.get(tenantId);
  if (client) {
    return client;
  }

  const databaseUrl = tenantDatabaseUrls[tenantId];
  if (!databaseUrl) {
    throw new Error(
      `URL do banco de dados não encontrada para o tenant: ${tenantId}`
    );
  }

  // Cria uma nova instância do PrismaClient com a URL do banco de dados específica do tenant
  client = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

  // Armazena a nova instância no cache para reutilização
  clients.set(tenantId, client);

  return client;
}
