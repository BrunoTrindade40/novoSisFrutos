import { Router } from "express";
import { ProdutosController } from "../controllers/produtos.controller";

const produtosRouter = Router();
const produtosController = new ProdutosController();

// Definição da rota GET
// Exemplo de chamada: GET /api/rastreamento/12345
produtosRouter.get(
  "/rastreio/:codigo",
  produtosController.handleBuscaRastreio.bind(produtosController)
);
export default produtosRouter;
