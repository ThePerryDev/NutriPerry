import { Router } from "express";
import controller from "../controller/GastoCaloricoController";

const router = Router();

//router.get("/", controller.getAll);
router.get("/gastos/:userID", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/delete/:id", controller.delete);
router.get("/total/:userID", controller.getTotalGastoCalorico);

export default router;