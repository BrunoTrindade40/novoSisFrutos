import express, { Router } from 'express';
import { ProdutoController } from '../controllers/produtos.controller'; // Ajuste o caminho se necessário

const produtoRoutes: Router = express.Router();
const produtoController = new ProdutoController();

//produtoRoutes.get('/', produtoController.handleGetProdutos);
produtoRoutes.get('/:codigo', (req, res) => produtoController.getProdutoPorCodigo(req, res));
//produtoRoutes.post('/novo', produtoController.handleCreateProduto);

export default produtoRoutes;