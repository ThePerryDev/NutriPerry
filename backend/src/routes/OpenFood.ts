// backend/src/routes/openFoodFactsRoutes.ts
import { Router } from 'express';
import OpenFoodFactsController from "../controller/OpenFoodFactController"

const router = Router();

router.get('/api/openfoodfacts', OpenFoodFactsController.getOpenFoodFacts.bind(OpenFoodFactsController));

export default router;
