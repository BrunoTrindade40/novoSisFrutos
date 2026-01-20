import { Router } from "express";
import { rastreioController } from "../controllers/rastreio.controller";

const router = Router();

// Rota: GET /api/rastreio/:codigo
router.get("/:codigo", rastreioController.buscarPorCodigoComSP);

export default router;
