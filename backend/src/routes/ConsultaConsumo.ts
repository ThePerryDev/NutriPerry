import { Router } from 'express';
import ConsultaConsumoController from '../controller/ConsultaConsumoController';


const router = Router();

router.get('/listarconsumo', ConsultaConsumoController.listarConsumos);
router.get('/alimento', ConsultaConsumoController.listAlimentoRefeicao);
router.get('/totalkcal', ConsultaConsumoController.listTotalKcal);
router.delete('/delete/:id', ConsultaConsumoController.deletarConsumo);


export default router;
