import { Router, Request, Response } from "express";
import nutricionista from './Nutricionista';
import user from "./user";

const router = Router();

router.use("/user", user);

router.use("/nutricionista", nutricionista);

router.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default router;