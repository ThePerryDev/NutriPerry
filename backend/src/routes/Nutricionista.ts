import { Router } from 'express';
import NutricionistaController from '../controller/NutricionistaController';

const router = Router();

router.post('/', NutricionistaController.createNutricionista);
router.put('/:id', NutricionistaController.updateNutricionista);
router.get('/', NutricionistaController.listNutricionistas);

export default router;