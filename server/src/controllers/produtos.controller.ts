import { Request, Response } from "express";
import { prisma } from "../lib/prismaClient";
import { z } from "zod";

const codigoParamSchema = z.object({
  codigo: z.string().regex(/^\d{3}-\d{3}\.\d{3}\.\d{3}$/, {
    message: "O código deve seguir o formato XXX-XXX.XXX.XXX",
  }),
});
type CodigoRequestBody = z.infer<typeof codigoParamSchema>;

const novoProdutoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  codigo: z.string().regex(/^\d{3}-\d{3}\.\d{3}\.\d{3}$/, {
    message: "O código deve seguir o formato XXX-XXX.XXX.XXX",
  }),
  descricao: z.string().optional(),
  preco: z.number().min(1, "Preço é obrigatório"),
  estoque: z.number().min(0, "Estoque é obrigatório"),
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
      console.log(req.body);
      const prods = await prisma.produto.findMany();
      return res.status(200).json(prods);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar Produtos." });
    }
  }
  async handleGetProdutosByCodigo(
    req: Request<{}, {}, CodigoRequestBody>,
    res: Response
  ) {
    try {
      const validatedParam = codigoParamSchema.parse(req.params);
      const { codigo } = validatedParam;
      if (!codigo) {
        return res.status(400).json({ error: "Código é obrigatório." });
      }
      const prods = await prisma.produto.findUnique({
        where: {
          codigo: codigo,
        },
      });
      return res.status(200).json(prods);
    } catch (err) {
      console.error(err);
      /* return res.status(500).json({ error: "Erro ao buscar Produtos." }); */
      res.status(500).json({ error: "Erro ao buscar Produtos." });
    }
  }

  async handleCreateProduto(req: Request, res: Response) {
    try {
      req.body.codigo = gerarCodigo();
      const data = novoProdutoSchema.parse(req.body);

      const novoProduto = await prisma.produto.create({
        data,
      });

      return res.status(201).json(novoProduto);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      console.error("Erro ao criar produto:", error);
      return res.status(500).json({ error: "Erro interno ao criar produto." });
    }
  }
}
function gerarCodigo(): string {
  const partes = [
    Math.floor(100 + Math.random() * 900),
    Math.floor(100 + Math.random() * 900),
    Math.floor(100 + Math.random() * 900),
    Math.floor(100 + Math.random() * 900),
  ];

  return `${partes[0]}-${partes[1]}.${partes[2]}.${partes[3]}`;
}
