import { Request, Response } from "express";
import mongoose from "mongoose";
import ConsumoAgua from "../models/ConsumoAgua";
import moment from "moment";

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
      const userId = new mongoose.Types.ObjectId(user);

      const consumos = await ConsumoAgua.aggregate([
        { $match: { user: userId } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$data" } },
            totalQuantidade: { $sum: { $multiply: ["$quantidade", "$vezes"] } },
            userId: { $first: "$user" },
            documentoId: { $first: "$_id" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      if (!consumos || consumos.length === 0) {
        res.status(200).json([]);
        return;
      }

      res.json(
        consumos.map((consumo) => ({
          date: consumo._id,
          totalQuantidade: consumo.totalQuantidade,
          userId: consumo.userId,
          documentoId: consumo.documentoId,
        }))
      );
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao listar consumos de água" });
    }
  }

  // Novo método para listar médias semanais e dados da semana atual
  public async listWeeklyData(req: Request, res: Response): Promise<void> {
    const { user } = req.params;
  
    try {
      const userId = new mongoose.Types.ObjectId(user);
  
      // Identifica a semana atual e a semana anterior do ano usando o moment
      const currentWeekNumber = moment().isoWeek(); // Semana ISO atual
      const lastWeekNumber = currentWeekNumber - 1; // Semana ISO anterior
      const currentYear = moment().year();
  
      console.log("Semana atual:", currentWeekNumber, "Ano:", currentYear);
      console.log("Semana anterior:", lastWeekNumber, "Ano:", currentYear);
  
      // Agregação para a semana anterior (agrupar por dia da semana)
      const lastWeekConsumos = await ConsumoAgua.aggregate([
        {
          $match: {
            user: userId,
            $expr: {
              $and: [
                { $eq: [{ $isoWeek: "$data" }, lastWeekNumber] },
                { $eq: [{ $year: "$data" }, currentYear] }
              ]
            }
          }
        },
        {
          $group: {
            _id: { $dayOfWeek: "$data" }, // Agrupa por dia da semana
            totalAmount: { $sum: { $multiply: ["$quantidade", "$vezes"] } }
          }
        }
      ]);
  
      // Agregação para a semana atual (agrupar por dia da semana)
      const currentWeekConsumos = await ConsumoAgua.aggregate([
        {
          $match: {
            user: userId,
            $expr: {
              $and: [
                { $eq: [{ $isoWeek: "$data" }, currentWeekNumber] },
                { $eq: [{ $year: "$data" }, currentYear] }
              ]
            }
          }
        },
        {
          $group: {
            _id: { $dayOfWeek: "$data" }, // Agrupa por dia da semana
            totalAmount: { $sum: { $multiply: ["$quantidade", "$vezes"] } }
          }
        }
      ]);
  
      // Inicializa arrays para armazenar valores diários de consumo (0 onde não há dados)
      const lastWeekData = Array(7).fill(0);
      const currentWeekData = Array(7).fill(0);
  
      // Preenche os arrays de dados com valores da agregação para cada dia
      lastWeekConsumos.forEach(entry => {
        const dayIndex = (entry._id + 5) % 7; // Ajusta para que domingo seja o índice 0
        lastWeekData[dayIndex] = entry.totalAmount;
      });
  
      currentWeekConsumos.forEach(entry => {
        const dayIndex = (entry._id + 5) % 7; // Ajusta para que domingo seja o índice 0
        currentWeekData[dayIndex] = entry.totalAmount;
      });
  
      console.log("Valores semana anterior (por dia):", lastWeekData);
      console.log("Valores semana atual (por dia):", currentWeekData);
  
      // Cálculo das médias semanais
      const calculateAverage = (data: number[]) => {
        const sum = data.reduce((acc, val) => acc + val, 0);
        return sum / 7; // Calcula a média considerando os 7 dias da semana
      };
  
      const averageLastWeek = calculateAverage(lastWeekData);
      const averageCurrentWeek = calculateAverage(currentWeekData);
  
      console.log("Média semana anterior:", averageLastWeek);
      console.log("Média semana atual:", averageCurrentWeek);
  
      res.json({
        averageLastWeek,
        averageCurrentWeek,
        weeklyData: currentWeekData // Envia os dados diários para o gráfico
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao listar dados semanais de consumo de água" });
    }
  }

  public async listMonthlyData(req: Request, res: Response): Promise<void> {
    const { user } = req.params;

    try {
      const userId = new mongoose.Types.ObjectId(user);

      // Identifica o mês atual e o mês anterior
      const currentMonth = moment().month(); // Mês atual (0 = janeiro, 11 = dezembro)
      const lastMonth = currentMonth - 1 < 0 ? 11 : currentMonth - 1; // Mês anterior
      const currentYear = moment().year();
      const lastMonthYear = lastMonth === 11 ? currentYear - 1 : currentYear;

      console.log("Mês atual:", currentMonth + 1, "Ano:", currentYear);
      console.log("Mês anterior:", lastMonth + 1, "Ano:", lastMonthYear);

      // Agregação para o mês anterior (agrupar por dia do mês)
      const lastMonthConsumos = await ConsumoAgua.aggregate([
        {
          $match: {
            user: userId,
            $expr: {
              $and: [
                { $eq: [{ $month: "$data" }, lastMonth + 1] },
                { $eq: [{ $year: "$data" }, lastMonthYear] }
              ]
            }
          }
        },
        {
          $group: {
            _id: { $dayOfMonth: "$data" }, // Agrupa por dia do mês
            totalAmount: { $sum: { $multiply: ["$quantidade", "$vezes"] } }
          }
        }
      ]);

      // Agregação para o mês atual (agrupar por dia do mês)
      const currentMonthConsumos = await ConsumoAgua.aggregate([
        {
          $match: {
            user: userId,
            $expr: {
              $and: [
                { $eq: [{ $month: "$data" }, currentMonth + 1] },
                { $eq: [{ $year: "$data" }, currentYear] }
              ]
            }
          }
        },
        {
          $group: {
            _id: { $dayOfMonth: "$data" }, // Agrupa por dia do mês
            totalAmount: { $sum: { $multiply: ["$quantidade", "$vezes"] } }
          }
        }
      ]);

      // Inicializa arrays para armazenar valores diários de consumo (0 onde não há dados)
      const daysInLastMonth = moment({ year: lastMonthYear, month: lastMonth }).daysInMonth();
      const daysInCurrentMonth = moment({ year: currentYear, month: currentMonth }).daysInMonth();

      const lastMonthData = Array(daysInLastMonth).fill(0);
      const currentMonthData = Array(daysInCurrentMonth).fill(0);

      // Preenche os arrays de dados com valores da agregação para cada dia do mês
      lastMonthConsumos.forEach(entry => {
        const dayIndex = entry._id - 1; // Ajuste para que o dia 1 seja o índice 0
        lastMonthData[dayIndex] = entry.totalAmount;
      });

      currentMonthConsumos.forEach(entry => {
        const dayIndex = entry._id - 1; // Ajuste para que o dia 1 seja o índice 0
        currentMonthData[dayIndex] = entry.totalAmount;
      });

      console.log("Valores mês anterior (por dia):", lastMonthData);
      console.log("Valores mês atual (por dia):", currentMonthData);

      // Cálculo das médias mensais
      const calculateAverage = (data: number[], days: number) => {
        const sum = data.reduce((acc, val) => acc + val, 0);
        return sum / days; // Calcula a média considerando os dias do mês
      };

      const averageLastMonth = calculateAverage(lastMonthData, daysInLastMonth);
      const averageCurrentMonth = calculateAverage(currentMonthData, daysInCurrentMonth);

      console.log("Média mês anterior:", averageLastMonth);
      console.log("Média mês atual:", averageCurrentMonth);

      res.json({
        averageLastMonth,
        averageCurrentMonth,
        monthlyData: currentMonthData // Envia os dados diários para o gráfico
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error.message || "Erro ao listar dados mensais de consumo de água" });
    }
  }

  public async listYearlyData(req: Request, res: Response): Promise<void> {
    const { user } = req.params;
    try {
      const userId = new mongoose.Types.ObjectId(user);

      const currentYear = moment().year();
      const lastYear = currentYear - 1;

      console.log("Ano atual:", currentYear);
      console.log("Ano anterior:", lastYear);

      // Agregação para o ano anterior (agrupar por mês)
      const lastYearConsumos = await ConsumoAgua.aggregate([
        {
          $match: {
            user: userId,
            $expr: { $eq: [{ $year: "$data" }, lastYear] }
          }
        },
        {
          $group: {
            _id: { $month: "$data" }, // Agrupa por mês
            totalAmount: { $sum: { $multiply: ["$quantidade", "$vezes"] } }
          }
        }
      ]);

      // Agregação para o ano atual (agrupar por mês)
      const currentYearConsumos = await ConsumoAgua.aggregate([
        {
          $match: {
            user: userId,
            $expr: { $eq: [{ $year: "$data" }, currentYear] }
          }
        },
        {
          $group: {
            _id: { $month: "$data" }, // Agrupa por mês
            totalAmount: { $sum: { $multiply: ["$quantidade", "$vezes"] } }
          }
        }
      ]);

      // Inicializa arrays para armazenar valores mensais de consumo (0 onde não há dados)
      const lastYearData = Array(12).fill(0);
      const currentYearData = Array(12).fill(0);

      lastYearConsumos.forEach(entry => {
        const monthIndex = entry._id - 1; // Ajusta para que janeiro seja o índice 0
        lastYearData[monthIndex] = entry.totalAmount;
      });

      currentYearConsumos.forEach(entry => {
        const monthIndex = entry._id - 1; // Ajusta para que janeiro seja o índice 0
        currentYearData[monthIndex] = entry.totalAmount;
      });

      console.log("Valores ano anterior (por mês):", lastYearData);
      console.log("Valores ano atual (por mês):", currentYearData);

      const calculateAverage = (data: number[]) => {
        const sum = data.reduce((acc, val) => acc + val, 0);
        return sum / 12; // Média considerando os 12 meses do ano
      };

      const averageLastYear = calculateAverage(lastYearData);
      const averageCurrentYear = calculateAverage(currentYearData);

      console.log("Média ano anterior:", averageLastYear);
      console.log("Média ano atual:", averageCurrentYear);

      res.json({
        averageLastYear,
        averageCurrentYear,
        yearlyData: currentYearData // Envia os dados mensais para o gráfico
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Erro ao listar dados anuais de consumo de água" });
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
}

export default new ConsumoAguaController();
