import { Router, Request, Response } from "express";
import nutricionista from './Nutricionista';
import user from "./user";
import ConsumoCalorico from "./ConsumoCalorico"; // Ajuste o nome do import se necessário
import GastoCalorico from "./GastoCalorico";
import openFoodFactsRoutes from "./OpenFood";
import AlimentoTaco from "./AlimentoTaco";
import ConsultaConsumo from "./ConsultaConsumo";
import ConsumoAgua from "./ConsumoAgua"

const router = Router();

router.use("/user", user);
router.use("/nutricionista", nutricionista);
router.use("/consumocalorico", ConsumoCalorico); // Mantenha este nome
router.use("/gastocalorico", GastoCalorico);
router.use("/openfoodfacts", openFoodFactsRoutes);
router.use("/alimentotaco", AlimentoTaco);
router.use("/consumos", ConsultaConsumo); // Aqui pode ser mantido, mas altere se preferir usar apenas consumocalorico
router.use("/consumo-agua", ConsumoAgua)

router.use((_: Request, res: Response) => res.json({ error: "Requisição desconhecida" }));

export default router;
