import { Request, Response } from 'express';
import ConsumoCalorico from '../models/ConsumoCaloricoModel';
import User from '../models/UserModel';

class ConsumoCaloricoController {
  // Cria um novo registro de consumo calórico
  async create(req: Request, res: Response) {
    try {
      const { userID, data, refeicoes } = req.body;

      // Verifica se o usuário existe
      const user = await User.findById(userID);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      const newConsumoCalorico = new ConsumoCalorico({
        userID,
        data,
        refeicoes,
      });

      await newConsumoCalorico.save();

      res.status(201).json({ message: 'Registro de consumo calórico criado com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar registro.' });
    }
  }

  // Lista todos os registros de consumo calórico
  async list(req: Request, res: Response) {
    try {
      const consumosCaloricos = await ConsumoCalorico.find();
      res.json(consumosCaloricos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao listar registros.' });
    }
  }

  // Lista registros de consumo calórico por usuário
  async listByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const consumosCaloricos = await ConsumoCalorico.find({ userID: userId });
      res.json(consumosCaloricos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao listar registros por usuário.' });
    }
  }

  // Atualiza um registro de consumo calórico
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const consumoCalorico = await ConsumoCalorico.findByIdAndUpdate(id, updates, { new: true });

      if (!consumoCalorico) {
        return res.status(404).json({ message: 'Registro não encontrado.' });
      }

      res.json(consumoCalorico);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar registro.' });
    }
  }

  // Deleta um registro de consumo calórico
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await ConsumoCalorico.findByIdAndDelete(id);

      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao deletar registro.' });
    }
  }
}

export default new ConsumoCaloricoController();