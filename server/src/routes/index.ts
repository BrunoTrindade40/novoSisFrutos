import express, { Router } from "express";
import produtosRoutes from "./produtos.routes";
import rastreioRoutes from "./rastreio.routes";

const router: Router = express.Router();

router.use("/produtos", produtosRoutes);
router.use("/rastreio", rastreioRoutes);

export default router;
