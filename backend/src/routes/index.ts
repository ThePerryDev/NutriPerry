import { Router, Request, Response } from "express";
import nutricionista from './Nutricionista';
import user from "./user";
import ConsumoCalorico from "./ConsumoCalorico";
import  AlimentoTaco  from "./AlimentoTaco";
import openFoodFactsRoutes from "./OpenFood";

const router = Router();

router.use("/user", user);

router.use("/nutricionista", nutricionista);

router.use("/consumocalorico", ConsumoCalorico);

router.use("/alimentos", AlimentoTaco); // Adicionando as rotas do AlimentoTaco

router.use("/openfoodfacts", openFoodFactsRoutes); // Adicionando as rotas do OpenFoodFacts


router.use( (_:Request,res:Response) => res.json({error:"Requisição desconhecida"}) );

export default router;