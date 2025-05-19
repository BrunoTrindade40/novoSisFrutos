import { UsersController } from "./controllers/users.controller";
import { config } from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { repositoryUsersDB } from "./repositories/users/banco-users";

config();
// Tipagem para o corpo da requisição
interface CodigoRequestBody {
  codigo: string;
}

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.get("/api/users/", async (req: Request, res: Response) => {
  const repositoryDB = await new repositoryUsersDB();
  const getUsers = await new UsersController(repositoryDB);
  const { body, statusCode } = await getUsers.handleGetUsers();

  res.send(body).status(statusCode);
});

app.post(
  "/api/codigo",
  (req: Request<{}, {}, CodigoRequestBody>, res: Response) => {
    const { codigo } = req.body;

    if (!codigo) {
      return res.status(400).json({ error: "Código é obrigatório." });
    }

    console.log("Código recebido:", codigo);
    res.json({ message: "Código recebido com sucesso!", codigo });
  }
);

app.listen(port, () => {
  console.log(`Servidor funcionando na porta ${port}`);
});
