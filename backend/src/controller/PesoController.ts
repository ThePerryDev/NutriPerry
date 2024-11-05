import { Request, Response } from "express";
import mongoose from "mongoose";
import Peso from "../models/PesoModel";

class PesoController {
  public async create(req: Request, res: Response): Promise<void> {
    const { user, peso, data } = req.body;

    try {
      const newPeso = new Peso({ user, peso, data });
      const response = await newPeso.save();
      res.status(201).json(response);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao adicionar o peso" });
    }
  }

  public async list(req: Request, res: Response): Promise<void> {
    const { user } = req.params;
  
    try {
      const userId = new mongoose.Types.ObjectId(user); // Converte o ID para ObjectId
  
      const pesos = await Peso.aggregate([
        { $match: { user: userId } }, // Filtra pelo usuário como ObjectId
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$data" } }, // Agrupa pela data formatada (YYYY-MM-DD)
            userId: { $first: "$user" }, // Inclui o ID do usuário no resultado
            documentoId: { $first: "$_id" }, // Inclui o _id do documento no resultado
          },
        },
        { $sort: { _id: 1 } }, // Ordena as datas (opcional)
      ]);
  
      // Verifica se consumos é nulo ou vazio e retorna um array vazio
      if (!pesos || pesos.length === 0) {
        res.status(200).json([]); // Retorna um array vazio
        return; // Termina a execução do método
      }
  
      res.json(
        pesos.map((peso) => ({
          date: peso._id,
          userId: peso.userId,
          documentoId: peso.documentoId, // Inclui o _id do documento no resultado
        }))
      );
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao listar os pesos" });
    }
  }
  
  

  public async delete(req: Request, res: Response): Promise<void> {
    const { user, date } = req.params;
    console.log("Deleting pesos for user:", user, "on date:", date);
  
    try {
      const userId = new mongoose.Types.ObjectId(user);
      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
  
      const response = await Peso.deleteMany({
        user: userId,
        data: {
          $gte: startDate,
          $lt: endDate,
        },
      });
  
      console.log("Delete response:", response);
  
      if (response.deletedCount > 0) {
        res.json({ message: "Pesos excluídos com sucesso." });
      } else {
        res.status(404).json({ message: "Nenhum peso encontrado para este usuário na data especificada." });
      }
    } catch (error: any) {
      console.error("Erro ao deletar pesos:", error);
      res.status(500).json({ message: error.message || "Erro ao deletar os pesos" });
    }
  }
}

export default new PesoController();
