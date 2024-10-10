import { Router } from "express";
import controller from "../controller/ConsumoCaloricoController";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.delete("/:id", controller.delete);
router.delete("/", controller.delete);
router.put("/", controller.update);
router.post("/", controller.create);

export default router;