import { Request, Response } from "express";
import mongoose from "mongoose";
import ConsumoAgua from "../models/ConsumoAgua";

class ConsumoAguaController {
  public async create(req: Request, res: Response): Promise<void> {
    const { user, quantidade, data, vezes } = req.body;

    try {
      const newConsumo = new ConsumoAgua({ user, quantidade, data, vezes });
      const response = await newConsumo.save();
      res.status(201).json(response);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao criar o consumo de água" });
    }
  }

  public async list(req: Request, res: Response): Promise<void> {
    const { user } = req.params;

    try {
      const userId = new mongoose.Types.ObjectId(user); // Converte o ID para ObjectId

      const consumos = await ConsumoAgua.aggregate([
        { $match: { user: userId } }, // Filtra pelo usuário como ObjectId
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$data" } }, // Agrupa pela data formatada (YYYY-MM-DD)
            totalQuantidade: { $sum: { $multiply: ["$quantidade", "$vezes"] } }, // Calcula o total por dia
            userId: { $first: "$user" }, // Inclui o ID do usuário no resultado
          },
        },
        { $sort: { _id: 1 } }, // Ordena as datas (opcional)
      ]);

      if (consumos.length === 0) {
        res
          .status(404)
          .json({ message: "Nenhum consumo encontrado para este usuário." });
      } else {
        res.json(
          consumos.map((consumo) => ({
            date: consumo._id,
            totalQuantidade: consumo.totalQuantidade,
            userId: consumo.userId,
          }))
        );
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao listar consumos de água" });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { user, date } = req.params; // Espera que 'user' e 'date' sejam passados como parâmetros
    try {
      const userId = new mongoose.Types.ObjectId(user); // Converte o ID para ObjectId

      // Deletar todos os registros de consumo do usuário em um dia específico
      const response = await ConsumoAgua.deleteMany({
        user: userId,
        data: {
          $gte: new Date(date),
          $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)), // Para pegar todos os registros do dia
        },
      });

      if (response.deletedCount > 0) {
        res.json({ message: "Consumos excluídos com sucesso." });
      } else {
        res
          .status(404)
          .json({
            message:
              "Nenhum consumo encontrado para este usuário na data especificada.",
          });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({
          message: error.message || "Erro ao deletar os consumos de água",
        });
    }
  }
}

export default new ConsumoAguaController();
