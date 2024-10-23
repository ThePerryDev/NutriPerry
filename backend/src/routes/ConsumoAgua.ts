import { Router } from "express";
import controller from "../controller/ConsumoAguaController"; // Adicione a importação do controller

const router = Router();

router.post("/", controller.create); // Criar um novo consumo de água
router.get("/:user", controller.list); // Listar consumos de água por usuário
router.delete("/:user/:date", controller.delete); // Deletar consumos de água por usuário e data

export default router;
