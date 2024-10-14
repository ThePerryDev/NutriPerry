import { Request, Response } from 'express';
import ConsumoCaloricoModel from '../models/ConsumoCaloricoModel';
import moment from 'moment';

class ConsultaConsumoController {
  // Método para listar os consumos de calorias
  async listarConsumos(req: Request, res: Response) {
    const { userId, data, tipoRefeicao } = req.query;

    console.log('Parâmetros recebidos:', { userId, data, tipoRefeicao });

    const dataFormatada = moment(data as string).format("YYYY-MM-DD");

    try {
      const resultados = await ConsumoCaloricoModel.find({
        user: userId,
        tipoRefeicao: tipoRefeicao,
        data: dataFormatada,
      });

      console.log('Resultados da agregação:', resultados);

      if (resultados.length === 0) {
        return res.status(404).json({ message: 'Nenhum consumo encontrado.' });
      }

      const totalKcal = resultados.reduce((acc, curr) => acc + curr.kcal, 0);
      const totalProteina = resultados.reduce((acc, curr) => acc + curr.proteina, 0);
      const totalCarboidrato = resultados.reduce((acc, curr) => acc + curr.carboidrato, 0);
      const totalPeso = resultados.reduce((acc, curr) => acc + curr.peso, 0);
      const totalAcucar = resultados.reduce((acc, curr) => acc + curr.acucar, 0);

      return res.status(200).json({
        alimentos: resultados.map((consumo) => consumo.nomeAlimento),
        totalKcal,
        totalProteina,
        totalCarboidrato,
        totalPeso,
        totalAcucar,
      });
    } catch (error) {
      console.error('Erro ao listar consumos:', error);
      return res.status(500).json({ message: 'Erro ao listar consumos.', error });
    }
  }

  // Método para listar o total de calorias
  async listTotalKcal(req: Request, res: Response) {
    const { userId, data } = req.query;

    console.log('Parâmetros recebidos para totalKcal:', { userId, data });

    const dataFormatada = moment(data as string).format("YYYY-MM-DD");

    try {
      const resultados = await ConsumoCaloricoModel.find({
        user: userId,
        data: dataFormatada,
      });

      console.log('Resultados para totalKcal:', resultados);

      if (resultados.length === 0) {
        return res.status(404).json({ message: 'Nenhum consumo encontrado.' });
      }

      const totalKcal = resultados.reduce((acc, curr) => acc + curr.kcal, 0);

      return res.status(200).json({ totalKcal });
    } catch (error) {
      console.error('Erro ao listar totalKcal:', error);
      return res.status(500).json({ message: 'Erro ao listar totalKcal.', error });
    }
  }

// Método para listar alimentos por refeição
async listAlimentoRefeicao(req: Request, res: Response) {
  const { userId, data, tipoRefeicao } = req.query; // Alterado para pegar da query

  console.log('Parâmetros recebidos para listAlimentoRefeicao:', { userId, data, tipoRefeicao });

  const dataFormatada = moment(data as string).format("YYYY-MM-DD");

  try {
      const resultados = await ConsumoCaloricoModel.find({
          user: userId,
          tipoRefeicao: tipoRefeicao,
          data: dataFormatada,
      });

      console.log('Resultados para listAlimentoRefeicao:', resultados);

      if (resultados.length === 0) {
          return res.status(404).json({ message: 'Nenhum alimento encontrado para esta refeição.' });
      }

      const alimentos = resultados.reduce<Record<string, number>>((acc, curr) => {
          const nome = curr.nomeAlimento;
          const peso = curr.peso;

          if (!acc[nome]) {
              acc[nome] = 0;
          }
          acc[nome] += peso;

          return acc;
      }, {});

      return res.status(200).json(alimentos);
  } catch (error) {
      console.error('Erro ao listar alimentos por refeição:', error);
      return res.status(500).json({ message: 'Erro ao listar alimentos por refeição.', error });
  }
}

  

  // Método para deletar um alimento
  async deletarConsumo(req: Request, res: Response) {
    const { _id } = req.body;
    console.log('Tentando deletar o consumo com ID:', _id); // Adicione isto para depuração
  
    try {
      const resultado = await ConsumoCaloricoModel.findByIdAndDelete(_id);
  
      if (!resultado) {
        return res.status(404).json({ message: 'Consumo não encontrado.' });
      }
  
      return res.status(200).json({ message: 'Consumo deletado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar consumo.', error });
    }
  }
}

export default new ConsultaConsumoController();