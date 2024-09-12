import { Request, Response } from 'express';
import ConsumoCalorico from '../models/ConsumoCaloricoModel'; // Ajuste o caminho conforme necessário
import User from '../models/UserModel'; // Ajuste o caminho conforme necessário

class ConsumoCaloricoController {
  
  // Método para criar um novo registro de consumo calórico
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      // Valida se o usuário existe
      const user = await User.findById(req.body.userID);
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }
      
      // Cria o novo registro de consumo calórico
      const novoConsumoCalorico = new ConsumoCalorico({
        userID: req.body.userID,
        data: req.body.data,
        refeicoes: req.body.refeicoes,
      });
      
      // Salva o registro no banco de dados
      const resultado = await novoConsumoCalorico.save();
      
      // Retorna a resposta com sucesso
      return res.status(201).json(resultado);
    } catch (error) {
      // Trata erros e retorna uma resposta de erro
      console.error('Erro ao criar o consumo calórico:', error);
      return res.status(500).json({ message: 'Erro ao criar o consumo calórico.', error });
    }
  }
}

export default ConsumoCaloricoController;
