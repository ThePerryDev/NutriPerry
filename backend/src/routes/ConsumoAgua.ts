import { Router } from "express";
import controller from "../controller/ConsumoAguaController";

const router = Router();

router.post("/", controller.create); // Criar um novo consumo de água
router.get("/:user", controller.list); // Listar consumos de água por usuário
router.get("/weekly/:user", controller.listWeeklyData); // Listar dados semanais com médias
router.get("/monthly/:user", controller.listMonthlyData); // Listar dados mensais com médias
router.get("/yearly/:user", controller.listYearlyData); // Listar dados anuais com médias
router.delete("/:user/:date", controller.delete); // Deletar consumos de água por usuário e data
router.get("/totalagua/:user/:dia", controller.listTotal); // Listar consumos de água por usuário

export default router;