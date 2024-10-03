import { Router } from 'express';
import NutricionistaController from '../controller/NutricionistaController';

const router = Router();

router.post('/', NutricionistaController.create);
router.put('/:id', NutricionistaController.update);
router.get('/', NutricionistaController.list);
router.delete('/:id', NutricionistaController.delete);

export default router;