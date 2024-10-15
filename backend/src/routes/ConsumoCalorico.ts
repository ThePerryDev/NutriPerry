import { Router } from "express";
import controller from "../controller/ConsumoCaloricoController";

const router = Router();

router.get("/", controller.getAll);
router.get("/", controller.getById);
router.post("/", controller.create);
router.delete("/", controller.delete);
router.put("/", controller.update);

export default router;