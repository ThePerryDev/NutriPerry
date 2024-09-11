import { Router, Request, Response } from "express";
import nutricionista from './Nutricionista';

const router = Router();

router.use("/nutricionista", nutricionista);

router.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default router;