import { Router, Request, Response } from "express";
import nutricionista from './Nutricionista';
import user from "./user";
import ConsumoCalorico from "./ConsumoCalorico";
import GastoCalorico from "./GastoCalorico";
import openFoodFactsRoutes from "./OpenFood"
import AlimentoTaco from "./AlimentoTaco"

const router = Router();

router.use("/user", user);
router.use("/nutricionista", nutricionista);
router.use("/consumocalorico", ConsumoCalorico);
router.use("/gastocalorico", GastoCalorico);
router.use("/openfoodfacts", openFoodFactsRoutes);
router.use("/alimentotaco", AlimentoTaco);

router.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default router;