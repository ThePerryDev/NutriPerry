import { Router } from 'express';
import ConsultaConsumoController from '../controller/ConsultaConsumoController';


const router = Router();

router.get('/', ConsultaConsumoController.listarConsumos);
//router.delete('/consumos/:id', ConsultaConsumoController.deletarConsumo);

export default router;
