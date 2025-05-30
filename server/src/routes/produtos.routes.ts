import express, { Router } from 'express';
import { ProdutoController } from '../controllers/produtos.controller'; // Ajuste o caminho se necessário

const produtoRoutes: Router = express.Router();
const produtoController = new ProdutoController();

produtoRoutes.get('/:codigo', (req, res) => produtoController.getProdutoPorCodigo(req, res));

export default produtoRoutes;