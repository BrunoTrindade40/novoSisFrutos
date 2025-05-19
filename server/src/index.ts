import { UsersController } from "./controllers/users.controller";
import { config } from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { repositoryUsersDB } from "./repositories/users/banco-users";
import { ProdutoController } from "./controllers/produtos.controller";
import { z } from "zod";

config();
const codigoBodySchema = z.object({
  codigo: z.string().regex(/^\d{3}-\d{3}\.\d{3}\.\d{3}$/, {
    message: "O código deve seguir o formato XXX-XXX.XXX.XXX",
  }),
});
type CodigoRequestBody = z.infer<typeof codigoBodySchema>;

const app = express();
const port = process.env.PORT || 3000;
const produtoController = new ProdutoController();

app.use(express.json());
app.use(cors());
app.get("/api/users/", async (req: Request, res: Response) => {
  const repositoryDB = await new repositoryUsersDB();
  const getUsers = await new UsersController(repositoryDB);
  const { body, statusCode } = await getUsers.handleGetUsers();

  res.send(body).status(statusCode);
});

app.post(
  "/api/produtos/codigo/",
  async (req: Request<{}, {}, CodigoRequestBody>, res: Response) => {
    try {
      const validatedBody = codigoBodySchema.parse(req.body);
      const { codigo } = validatedBody;
      if (!codigo) {
        return res.status(400).json({ error: "Código é obrigatório." });
      }

      console.log("Código recebido:", codigo);
      res.json({ message: "Código recebido com sucesso!", codigo });
    } catch (error: any) {
      // Se a validação falhar, capture o erro do Zod e retorne uma resposta de erro
      if (error instanceof z.ZodError) {
        return res.status(400).json({ errors: error.errors });
      }
      // Outros erros inesperados
      console.error("Erro inesperado ao processar o código:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
);
app.post("/api/produtos/novo/", async (req: Request, res: Response) => {
  const result = await produtoController.handleCreateProduto(req, res);
  console.log(result);
});

app.listen(port, () => {
  console.log(`Servidor funcionando na porta ${port}`);
});
