import { Router, Request, Response } from "express";
import nutricionista from './Nutricionista';
import user from "./user";
import ConsumoCalorico from "./ConsumoCalorico";
import GastoCalorico from "./GastoCalorico";
import openFoodFactsRoutes from "./OpenFood"
import AlimentoTaco from "./AlimentoTaco"
import Peso from "./Peso"

const router = Router();

router.use("/user", user);
router.use("/nutricionista", nutricionista);
router.use("/consumocalorico", ConsumoCalorico);
router.use("/gastocalorico", GastoCalorico);
router.use("/openfoodfacts", openFoodFactsRoutes);
router.use("/alimentotaco", AlimentoTaco);
router.use("/peso", Peso)

router.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default router;