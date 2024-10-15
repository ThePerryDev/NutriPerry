import { Router } from "express";
import UserController from "../controller/UserController";

const router = Router();

router.get("/", UserController.list);

router.post("/", UserController.create);

router.put("/", UserController.update);

router.delete("/", UserController.delete);

export default router;
