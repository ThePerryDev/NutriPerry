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
            documentoId: { $first: "$_id" }, // Inclui o _id do documento no resultado
          },
        },
        { $sort: { _id: 1 } }, // Ordena as datas (opcional)
      ]);
  
      // Verifica se consumos é nulo ou vazio e retorna um array vazio
      if (!consumos || consumos.length === 0) {
        res.status(200).json([]); // Retorna um array vazio
        return; // Termina a execução do método
      }
  
      res.json(
        consumos.map((consumo) => ({
          date: consumo._id,
          totalQuantidade: consumo.totalQuantidade,
          userId: consumo.userId,
          documentoId: consumo.documentoId, // Inclui o _id do documento no resultado
        }))
      );
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao listar consumos de água" });
    }
  }
  
  

  public async delete(req: Request, res: Response): Promise<void> {
    const { user, date } = req.params;
    console.log("Deleting consumos for user:", user, "on date:", date);
  
    try {
      const userId = new mongoose.Types.ObjectId(user);
      const startDate = new Date(date);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 1);
  
      const response = await ConsumoAgua.deleteMany({
        user: userId,
        data: {
          $gte: startDate,
          $lt: endDate,
        },
      });
  
      console.log("Delete response:", response);
  
      if (response.deletedCount > 0) {
        res.json({ message: "Consumos excluídos com sucesso." });
      } else {
        res.status(404).json({ message: "Nenhum consumo encontrado para este usuário na data especificada." });
      }
    } catch (error: any) {
      console.error("Erro ao deletar consumos:", error);
      res.status(500).json({ message: error.message || "Erro ao deletar os consumos de água" });
    }
  }

  public async listTotal(req: Request, res: Response): Promise<void> {
    const { user, dia } = req.params; // Recebe o userId e a data (dia) como parâmetros
  
    try {
        const userId = new mongoose.Types.ObjectId(user); // Converte o ID para ObjectId

        // Converte a data recebida para um objeto Date
        const dataConsultada = new Date(dia);

        const consumos = await ConsumoAgua.aggregate([
            { 
                $match: { 
                    user: userId, // Filtra pelo usuário como ObjectId
                    data: { $eq: dataConsultada } // Filtra pela data exatamente igual à data consultada
                } 
            },
            {
                $group: {
                    _id: null, // Agrupa todos os resultados em um único documento
                    totalQuantidade: { $sum: { $multiply: ["$quantidade", "$vezes"] } }, // Soma a quantidade
                },
            },
        ]);

        // Verifica se consumos é nulo ou vazio
        if (!consumos || consumos.length === 0) {
            res.status(200).json({ message: "Total de água consumido: 0" }); // Retorna total como 0 se não houver registros
            return; // Termina a execução do método
        }

        res.json({
            message: `Total de água consumido: ${consumos[0].totalQuantidade || 0}`, // Retorna a mensagem com o total, ou 0 se não houver
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Erro ao listar consumos" });
    }
}

  


}

export default new ConsumoAguaController();