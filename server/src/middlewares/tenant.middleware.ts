import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { getPrismaClient } from "../lib/prismaManager";

// Lista de tenants permitidos
const allowedTenants = ["bs-frutas", "frutas-uniao"];

// Estendendo a interface Request para incluir nossa instância do Prisma
declare global {
  namespace Express {
    interface Request {
      prisma: PrismaClient;
    }
  }
}

export function tenantMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tenantId = req.params.tenantId;

  if (!tenantId || !allowedTenants.includes(tenantId)) {
    return res
      .status(400)
      .json({ message: "Tenant inválido ou não fornecido." });
  }

  try {
    // Obtém a instância do Prisma para o tenant e a anexa à requisição
    req.prisma = getPrismaClient(tenantId);
    next();
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "Erro ao configurar a conexão com o banco de dados do tenant.",
      });
  }
}
