import { Request, Response } from 'express';
import AlimentoTaco from '../models/AlimentoTacoModel'; // Ajuste o caminho conforme sua estrutura

class AlimentoTacoController {
  // Método para criar um novo alimento
  async create(req: Request, res: Response) {
    try {
      const { id, description, energy, protein, carbohydrate } = req.body;

      // Certifique-se de que todos os campos obrigatórios estão presentes
      if (!id || !description || !energy || !protein || !carbohydrate) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
      }

      const novoAlimento = new AlimentoTaco({
        id,
        description,
        energy,
        protein,
        carbohydrate,
      });

      await novoAlimento.save();
      return res.status(201).json(novoAlimento);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao criar alimento', error });
    }
  }

  // Método para listar alimentos com base na descrição
  async list(req: Request, res: Response) {
    try {
      const { description } = req.query;
  
      const alimentos = description 
        ? await AlimentoTaco.find({ description: new RegExp(description as string, 'i') })
            .select('id description energy protein carbohydrate') // Seleciona apenas os campos desejados
        : await AlimentoTaco.find().select('id description energy protein carbohydrate');
  
      return res.status(200).json(alimentos);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao listar alimentos', error });
    }
  }
  

  // Método para deletar um alimento pelo ID
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const alimento = await AlimentoTaco.findOneAndDelete({ id }); // Mudança para buscar pelo campo 'id'

      if (!alimento) {
        return res.status(404).json({ message: 'Alimento não encontrado' });
      }

      return res.status(200).json({ message: 'Alimento deletado com sucesso' });
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao deletar alimento', error });
    }
  }
}

export default new AlimentoTacoController();
