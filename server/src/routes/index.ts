import express, { Router } from 'express';
import produtosRoutes from './produtos.routes';
/* import usuarioRoutes from './usuario.routes';
import pedidoRoutes from './pedido.routes'; */

const router: Router = express.Router();

router.use('/produtos', produtosRoutes);
/* router.use('/usuarios', usuarioRoutes);
router.use('/pedidos', pedidoRoutes); */

export default router;