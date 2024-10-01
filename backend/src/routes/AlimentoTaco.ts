import { Router } from 'express';
import AlimentoTacoController from '../controller/AlimentoTacoController';

const router = Router();

router.post('/', AlimentoTacoController.create);
router.get('/', AlimentoTacoController.list);
router.delete('/:id', AlimentoTacoController.delete);

export default router;
