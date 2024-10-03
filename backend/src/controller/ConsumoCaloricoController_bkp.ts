import { Request, Response } from 'express';
import ConsumoCaloricoModel from '../models/ConsumoCaloricoModel';
import axios from 'axios'; // Adicione axios para fazer chamadas HTTP

interface Nutriments {
  'energy-kcal_100g'?: number;
  proteins?: number;
  carbohydrates?: number;
  sugars?: number;
}

interface Product {
  nutriments?: Nutriments;
  quantity?: number; // Peso padrão
  product_name?: string; // Nome do produto
}

interface OpenFoodFactsSearchResponse {
  products: Product[];
}


class ConsumoCaloricoController {
  // Criar um novo consumo calórico
  async create(req: Request, res: Response): Promise<Response> { 
    try {
      const { user, data, tipoRefeicao, nomeAlimento } = req.body;

      // Consultar a API do Open Food Facts usando o nome do produto
      const response = await axios.get<OpenFoodFactsSearchResponse>(`https://world.openfoodfacts.org/cgi/search.pl`, {
        params: {
          search_terms: nomeAlimento,
          json: true,
          page_size: 1, // Retorna apenas um resultado
        },
      });

      const productData = response.data.products[0]; // Pega o primeiro produto retornado

      // Verificar se o produto foi encontrado
      if (!productData) {
        return res.status(404).json({ message: 'Produto não encontrado na Open Food Facts' });
      }

      // Extrair informações necessárias da resposta da API
      const kcal = productData.nutriments?.['energy-kcal_100g'] || 0;
      const proteina = productData.nutriments?.proteins || 0;
      const carboidrato = productData.nutriments?.carbohydrates || 0;
      const peso = productData.quantity || 100; // Peso padrão se não disponível
      const acucar = productData.nutriments?.sugars || 0;

      // Criar o consumo calórico
      const consumo = new ConsumoCaloricoModel({ user, data, tipoRefeicao, nomeAlimento, kcal, proteina, carboidrato, peso, acucar });
      const novoConsumo = await consumo.save();

      return res.status(201).json(novoConsumo);
    } catch (error) {
      console.error('Erro ao criar consumo calórico:', error);
      return res.status(500).json({ message: 'Erro ao criar consumo calórico', error });
    }
  }

  /*
  async create(req: Request, res: Response): Promise<Response> { 
    try {
      const { user, data, tipoRefeicao, nomeAlimento } = req.body;

      // Consultar a API do Open Food Facts
      const response = await axios.get<OpenFoodFactsResponse>(`https://world.openfoodfacts.org/api/v0/product/${nomeAlimento}.json`);
      const productData = response.data.product;

      // Verificar se o produto foi encontrado
      if (!productData) {
        return res.status(404).json({ message: 'Produto não encontrado na Open Food Facts' });
      }

      // Extrair informações necessárias da resposta da API
      const kcal = productData.nutriments?.energy_kcal || 0;
      const proteina = productData.nutriments?.proteins || 0;
      const carboidrato = productData.nutriments?.carbohydrates || 0;
      const peso = productData.quantity || 100; // Peso padrão se não disponível
      const acucar = productData.nutriments?.sugars || 0;

      // Criar o consumo calórico
      const consumo = new ConsumoCaloricoModel({ user, data, tipoRefeicao, nomeAlimento, kcal, proteina, carboidrato, peso, acucar });
      const novoConsumo = await consumo.save();

      return res.status(201).json(novoConsumo);
    } catch (error) {
      console.error('Erro ao criar consumo calórico:', error);
      return res.status(500).json({ message: 'Erro ao criar consumo calórico', error });
    }
  }


  */


    // Listar todos os consumos calóricos
    async getAll(req: Request, res: Response): Promise<Response> {
      try {
        const consumos = await ConsumoCaloricoModel.find().populate('user');
        return res.status(200).json(consumos);
      } catch (error) {
        console.error('Erro ao listar consumos calóricos:', error);
        return res.status(500).json({ message: 'Erro ao listar consumos calóricos', error });
      }
    }
  
    // Obter um consumo calórico específico por ID
    async getById(req: Request, res: Response): Promise<Response> {
      try {
        const consumo = await ConsumoCaloricoModel.findById(req.params.id).populate('user');
        if (!consumo) {
          return res.status(404).json({ message: 'Consumo calórico não encontrado' });
        }
        return res.status(200).json(consumo);
      } catch (error) {
        console.error('Erro ao obter consumo calórico:', error);
        return res.status(500).json({ message: 'Erro ao obter consumo calórico', error });
      }
    }
  
    // Atualizar um consumo calórico existente
    async update(req: Request, res: Response): Promise<Response> {
      try {
        const consumo = await ConsumoCaloricoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!consumo) {
          return res.status(404).json({ message: 'Consumo calórico não encontrado' });
        }
        return res.status(200).json(consumo);
      } catch (error) {
        console.error('Erro ao atualizar consumo calórico:', error);
        return res.status(500).json({ message: 'Erro ao atualizar consumo calórico', error });
      }
    }
  
    // Deletar um consumo calórico
    async delete(req: Request, res: Response): Promise<Response> {
      try {
        const consumo = await ConsumoCaloricoModel.findByIdAndDelete(req.params.id);
        if (!consumo) {
          return res.status(404).json({ message: 'Consumo calórico não encontrado' });
        }
        return res.status(204).send(); // 204 No Content
      } catch (error) {
        console.error('Erro ao deletar consumo calórico:', error);
        return res.status(500).json({ message: 'Erro ao deletar consumo calórico', error });
      }
    }
}

export default new ConsumoCaloricoController();
