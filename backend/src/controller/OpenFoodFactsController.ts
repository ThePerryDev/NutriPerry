// backend/src/controller/openFoodFactsController.ts
import { Request, Response } from 'express';
import axios from 'axios';

class OpenFoodFactsController {
    public async getOpenFoodFacts(req: Request, res: Response): Promise<void> {
        try {
            const { search_terms, page_size } = req.query;
            const response = await axios.get('https://br.openfoodfacts.net/cgi/search.pl', {
                params: {
                    search_terms,
                    json: true,
                    page_size,
                },
            });
            res.json(response.data);
        } catch (error) {
            console.error('Erro ao buscar no Open Food Facts:', error);
            res.status(500).json({ error: 'Erro ao buscar dados' });
        }
    }
}

export default new OpenFoodFactsController();
