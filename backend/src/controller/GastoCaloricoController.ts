// backend/src/controller/GastoCaloricoController.ts

import { Request, Response } from 'express';
import GastoCaloricoModel from '../models/GastoCaloricoModel';
import mongoose, { Types } from 'mongoose';
import moment from 'moment';

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
      // Garantir que userID seja um ObjectId válido
      const userID = new mongoose.Types.ObjectId(req.params.userID);
  
      // Pega o termo de pesquisa para 'atividadeFisica' da query string
      const { atividadeFisica } = req.query;
  
      // Condição para aplicar o filtro de 'atividadeFisica' se fornecido
      const query: any = { userID };
  
      if (atividadeFisica) {
        query.atividadeFisica = new RegExp(atividadeFisica as string, 'i'); // 'i' para pesquisa case-insensitive
      }
  
      // Buscar todos os documentos com o userID e, se houver, filtrando por 'atividadeFisica'
      const gastoCalorico = await GastoCaloricoModel.find(query);
  
      // Verificar se algum documento foi encontrado
      if (gastoCalorico.length === 0) {
        // Em vez de retornar erro 404, retorna um array vazio
        return res.status(200).json([]); // Retorna array vazio se não encontrar dados
      }
  
      // Retornar os documentos encontrados
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
    // Recuperar o id da URL, que é passado como parâmetro de rota
    const { id: _id } = req.params;
  
    try {
      // Tenta encontrar e deletar o documento com o id especificado
      const gastoCalorico = await GastoCaloricoModel.findByIdAndDelete(_id);
  
      // Se o documento não for encontrado, retorna um erro 404
      if (!gastoCalorico) {
        return res.status(404).json({ message: 'Gasto calórico não encontrado' });
      }
  
      // Caso tenha sido deletado com sucesso, retorna um status 204 (No Content)
      return res.status(204).send(); // 204 No Content
    } catch (error) {
      // Em caso de erro, captura e retorna um erro 500 com a mensagem de erro
      console.error('Erro ao deletar gasto calórico:', error);
      return res.status(500).json({ message: 'Erro ao deletar gasto calórico', error });
    }
  }

  async  getTotalGastoCalorico(req: Request, res: Response): Promise<Response> {
    try {
      const userID = new mongoose.Types.ObjectId(req.params.userID); // Garantir que userID seja um ObjectId válido
      const { data } = req.query; // A data será passada como parâmetro na query, por exemplo: ?data=2024-10-30
    
      // Verificar se a data foi fornecida
      if (!data || typeof data !== "string") {
        return res.status(400).json({ message: "Data é obrigatória e deve ser uma string válida" });
      }
  
      // Convertendo a data para um formato adequado de comparação
      const targetDate = new Date(moment(data).format("YYYY-MM-DD")); // Usamos moment para garantir o formato correto
    
      // Usando o Mongoose Aggregate para somar o gastoCalorico de todos os registros de um usuário na data fornecida
      const result = await GastoCaloricoModel.aggregate([
        {
          $match: {
            userID: userID, // Filtra pelo userID
            data: { $eq: targetDate }, // Filtra pela data exata fornecida
          },
        },
        {
          $group: {
            _id: "$userID", // Agrupa pelo userID
            totalGastoCalorico: { $sum: "$gastoCalorico" }, // Soma os valores de gastoCalorico
          },
        },
      ]);
  
      // Se o resultado for vazio, significa que o usuário não tem registros para essa data
      if (result.length === 0) {
        return res.status(200).json({ totalGastoCalorico: 0 });
      }
  
      // Retorna o total do gasto calórico
      return res.status(200).json(result[0]);
    } catch (error) {
      console.error("Erro ao calcular total gasto calórico:", error);
      return res.status(500).json({ message: "Erro ao calcular total gasto calórico", error });
    }
  }
  
  
  
}

export default new GastoCaloricoController();