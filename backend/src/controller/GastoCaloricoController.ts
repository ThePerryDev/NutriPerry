// backend/src/controller/GastoCaloricoController.ts

import { Request, Response } from 'express';
import GastoCaloricoModel from '../models/GastoCaloricoModel';

class GastoCaloricoController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const gastoCalorico = await GastoCaloricoModel.create(req.body);
      return res.status(201).json(gastoCalorico);
    } catch (error) {
      console.error('Erro ao criar gasto calórico:', error);
      return res.status(500).json({ message: 'Erro ao criar gasto calórico', error });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const gastosCaloricos = await GastoCaloricoModel.find().populate('userID');
      return res.status(200).json(gastosCaloricos);
    } catch (error) {
      console.error('Erro ao listar gastos calóricos:', error);
      return res.status(500).json({ message: 'Erro ao listar gastos calóricos', error });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const gastoCalorico = await GastoCaloricoModel.findById(req.params.id).populate('userID');
      if (!gastoCalorico) {
        return res.status(404).json({ message: 'Gasto calórico não encontrado' });
      }
      return res.status(200).json(gastoCalorico);
    } catch (error) {
      console.error('Erro ao buscar gasto calórico:', error);
      return res.status(500).json({ message: 'Erro ao buscar gasto calórico', error });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const gastoCalorico = await GastoCaloricoModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!gastoCalorico) {
        return res.status(404).json({ message: 'Gasto calórico não encontrado' });
      }
      return res.status(200).json(gastoCalorico);
    } catch (error) {
      console.error('Erro ao atualizar gasto calórico:', error);
      return res.status(500).json({ message: 'Erro ao atualizar gasto calórico', error });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const gastoCalorico = await GastoCaloricoModel.findByIdAndDelete(req.params.id);
      if (!gastoCalorico) {
        return res.status(404).json({ message: 'Gasto calórico não encontrado' });
      }
      return res.status(204).send(); // 204 No Content
    } catch (error) {
      console.error('Erro ao deletar gasto calórico:', error);
      return res.status(500).json({ message: 'Erro ao deletar gasto calórico', error });
    }
  }
}

export default new GastoCaloricoController();