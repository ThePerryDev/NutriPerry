import { Request, Response } from 'express';
import GastoCaloricoModel from '../models/GastoCaloricoModel';

class GastoCaloricoController {
  // Cria um novo registro de gasto calórico
  async create(req: Request, res: Response) {
    try {
      const gastoCalorico = new GastoCaloricoModel(req.body);
      await gastoCalorico.save();
      res.status(201).json(gastoCalorico);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao criar registro de gasto calórico.' });
    }
  }

  // Lista todos os registros de gasto calórico
  async list(req: Request, res: Response) {
    try {
      const gastosCaloricos = await GastoCaloricoModel.find();
      res.json(gastosCaloricos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao listar registros de gasto calórico.' });
    }
  }

  // Lista registros de gasto calórico por usuário
  async listByUser(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const gastosCaloricos = await GastoCaloricoModel.find({ userID: userId });
      res.json(gastosCaloricos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao listar registros de gasto calórico por usuário.' });
    }
  }

  // Atualiza um registro de gasto calórico
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const gastoCalorico = await GastoCaloricoModel.findByIdAndUpdate(id, updates, { new: true });

      if (!gastoCalorico) {
        return res.status(404).json({ message: 'Registro de gasto calórico não encontrado.' });
      }

      res.json(gastoCalorico);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao atualizar registro de gasto calórico.' });
    }
  }

  // Deleta um registro de gasto calórico
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await GastoCaloricoModel.findByIdAndDelete(id);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao deletar registro de gasto calórico.' });
    }
  }
}

export default new GastoCaloricoController();