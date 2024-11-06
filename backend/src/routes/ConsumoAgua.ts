import { Router } from "express";
import controller from "../controller/ConsumoAguaController";

const router = Router();

router.post("/", controller.create);
router.get("/:user", controller.list);
router.delete("/:user/:date", controller.delete);
router.get("/totalagua/:user/:dia", controller.listTotal);

export default router;
