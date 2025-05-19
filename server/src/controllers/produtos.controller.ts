import { Request, Response } from 'express';
import { prisma } from '../lib/prismaClient';
import { z } from 'zod';

const produtoSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().optional(),
  preco: z.number().min(1, 'Preço é obrigatório'),
  estoque: z.number().min(0, 'Estoque é obrigatório'),
  produtor: z.string().optional(),
  romaneio: z.string().optional(),
  talhao: z.string().optional(),
  endereco: z.string().optional(),
  cidade: z.string().optional(),
  colheita: z.date().optional(),
  chegada: z.date().optional(),
  embalagem: z.string().optional(),
  embalador: z.string().optional(),
});

export class ProdutoController {
  async handleGetProdutos(req: Request, res: Response) {
    try {
      const prods = await prisma.produto.findMany();
      return res.status(200).json(prods);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar Produtos.' });
    }
  }

  async handleCreateProduto(req: Request, res: Response) {
    try {
      const data = produtoSchema.parse(req.body);

      const novoProduto = await prisma.produto.create({
        data,
      });

      return res.status(201).json(novoProduto);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error('Erro ao criar produto:', error);
      return res.status(500).json({ error: 'Erro interno ao criar produto.' });
    }
  }
}