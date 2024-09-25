import { Request, Response } from 'express';
import ConsumoCaloricoModel from '../models/ConsumoCaloricoModel';
import axios from 'axios'; // Adicione axios para fazer chamadas HTTP

class ConsumoCaloricoController {
  // Criar um novo consumo calórico
  
  async create(req: Request, res: Response): Promise<Response> { 
    console.log('Dados recebidos:', req.body); // Adicione esta linha para verificar os dados recebidos
    try {
      const { user, data, tipoRefeicao, nomeAlimento, kcal, proteina, carboidrato, peso, acucar } = req.body;
  
      // Valide se todos os dados necessários foram fornecidos
      if (!user || !tipoRefeicao || !nomeAlimento || !kcal || !proteina || !carboidrato || !peso || !acucar) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
      }
  
      const consumo = new ConsumoCaloricoModel({ user, data, tipoRefeicao, nomeAlimento, kcal, proteina, carboidrato, peso, acucar });
      const novoConsumo = await consumo.save();
  
      return res.status(201).json(novoConsumo);
    } catch (error) {
      console.error('Erro ao criar consumo calórico:', error);
      return res.status(500).json({ message: 'Erro ao criar consumo calórico', error });
    }
  }
  
  /*
  public async create(req: Request, res: Response): Promise<Response> { 
    try {
      // Desestruturando os dados do corpo da requisição
      const { user, data, tipoRefeicao, nomeAlimento, kcal, proteina, carboidrato, peso, acucar } = req.body;

      // Verificar se todos os dados obrigatórios estão presentes
      if (!user || !tipoRefeicao || !nomeAlimento || kcal == null || proteina == null || carboidrato == null || peso == null || acucar == null) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
      }

      // Criar o objeto do consumo calórico
      const novoConsumo = new ConsumoCaloricoModel({
        user,
        data: data || new Date(), // Se a data não for fornecida, usa a data atual
        tipoRefeicao,
        nomeAlimento,
        kcal,
        proteina,
        carboidrato,
        peso,
        acucar,
      });

      // Salvar no banco de dados
      const consumoSalvo = await novoConsumo.save();

      // Retornar o objeto salvo
      return res.status(201).json(consumoSalvo);
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
