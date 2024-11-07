import { Router, Request, Response } from "express";
import nutricionista from './Nutricionista';
import user from "./user";
import ConsumoCalorico from "./ConsumoCalorico"; // Ajuste o nome do import se necessário
import GastoCalorico from "./GastoCalorico";
import openFoodFactsRoutes from "./OpenFood";
import AlimentoTaco from "./AlimentoTaco";
//import ConsultaConsumo from "./ConsultaConsumo";
import ConsumoAgua from "./ConsumoAgua"
import Peso from "./Peso";
import ConsultaConsumo from "./ConsultaConsumo";


const router = Router();

router.use("/user", user);
router.use("/nutricionista", nutricionista);
router.use("/consumocalorico", ConsumoCalorico); // Mantenha este nome
router.use("/gastocalorico", GastoCalorico);
router.use("/openfoodfacts", openFoodFactsRoutes);
router.use("/alimentotaco", AlimentoTaco);
router.use("/consumos", ConsultaConsumo);
router.use("/consumo-agua", ConsumoAgua)
router.use("/peso", Peso)


router.use((_: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default router;
