import express, { Router } from 'express';
import produtosRoutes from './produtos.routes';

const router: Router = express.Router();

router.use('/produtos', produtosRoutes);


export default router;