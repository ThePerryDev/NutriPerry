import { Request, Response } from 'express';
import ConsumoCaloricoModel from '../models/ConsumoCaloricoModel';
import moment from 'moment';

class ConsultaConsumoController {
  // Método para listar os consumos de calorias
  async listarConsumos(req: Request, res: Response) {
    const { userId, data, tipoRefeicao } = req.body;

    // Logando os parâmetros recebidos
    console.log('Parâmetros recebidos:', { userId, data, tipoRefeicao });

    const dataFormatada = moment(data).format("YYYY-MM-DD");

    try {
      const resultados = await ConsumoCaloricoModel.find({
        user: userId,
        tipoRefeicao: tipoRefeicao,
        data: dataFormatada,
      });

      // Logando os resultados encontrados
      console.log('Resultados da agregação:', resultados);

      if (resultados.length === 0) {
        return res.status(404).json({ message: 'Nenhum consumo encontrado.' });
      }

      // Somar os campos desejados
      const totalKcal = resultados.reduce((acc, curr) => acc + curr.kcal, 0);
      const totalProteina = resultados.reduce((acc, curr) => acc + curr.proteina, 0);
      const totalCarboidrato = resultados.reduce((acc, curr) => acc + curr.carboidrato, 0);
      const totalPeso = resultados.reduce((acc, curr) => acc + curr.peso, 0);
      const totalAcucar = resultados.reduce((acc, curr) => acc + curr.acucar, 0);

      // Responder com os totais e os alimentos
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

  // Método para deletar um alimento
  async deletarConsumo(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const resultado = await ConsumoCaloricoModel.findByIdAndDelete(id);

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
