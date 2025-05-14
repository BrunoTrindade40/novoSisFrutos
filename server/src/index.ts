import { UsersController } from "./controllers/users.controller";
import { config } from "dotenv";
import express, { response } from "express";
import cors from "cors";
import { repositoryUsersDB } from "./repositories/users/banco-users";

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.get("/api/users/", async (req, res) => {
  const repositoryDB = await new repositoryUsersDB();
  const getUsers = await new UsersController(repositoryDB);
  const { body, statusCode } = await getUsers.handleGetUsers();

  res.send(body).status(statusCode);
});

app.listen(port, () => {
  console.log(`Servidor funcionando na porta ${port}`);
});
