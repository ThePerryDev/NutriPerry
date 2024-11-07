import { Router } from "express";
import UserController from "../controller/UserController";

const router = Router();

// Rota para listar todos os usuários ou um específico, usando query params, por exemplo ?id=ID
router.get("/objetivo", UserController.getUserDataById);

router.get("/", UserController.list);

// Rota para criar um novo usuário
router.post("/", UserController.create);

// Rota para atualizar um usuário específico
router.put("/", UserController.update);

// Rota para deletar um usuário específico
router.delete("/", UserController.delete);

router.put("/atualizarpeso/:id", UserController.updatePeso);

export default router;
