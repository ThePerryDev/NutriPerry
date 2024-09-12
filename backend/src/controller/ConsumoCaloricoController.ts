import { Request, Response } from 'express';
import ConsumoCalorico from '../models/ConsumoCaloricoModel'; // Ajuste o caminho conforme necessário
import UserModel from '../models/UserModel';
import axios from 'axios'; // Biblioteca para fazer requisições HTTP

class ConsumoCaloricoController {

  // Método para criar um novo registro de consumo calórico
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      // Obtém o userID do usuário logado (presumindo que o middleware de autenticação já preenche req.user)
      const userID = req.user?.id;
      if (!userID) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
      }
      
      const { data, refeicoes } = req.body;

      // Valida se todos os campos obrigatórios estão presentes
      if (!data || !refeicoes) {
        return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
      }
      
      // Valida se o usuário existe
      // No caso de autenticação baseada em JWT, é assumido que o usuário já foi validado e o userID é confiável
      // Se necessário, você pode fazer uma verificação adicional, embora geralmente não seja necessário aqui
      // const user = await User.findById(userID);
      // if (!user) {
      //   return res.status(404).json({ message: 'Usuário não encontrado.' });
      // }

      // Função para buscar detalhes do alimento
      const obterDetalhesAlimento = async (nome: string) => {
        try {
          // Substitua pela URL da API externa que fornece as informações nutricionais
          const response = await axios.get(`https://api.exemplo.com/alimentos/${encodeURIComponent(nome)}`); // VERIFICAR COMO SERÁ A INFORMAÇÃO VINDA DO FOOD FACTS
          return response.data;
        } catch (error) {
          console.error('Erro ao buscar detalhes do alimento:', error);
          throw new Error('Erro ao buscar detalhes do alimento.');
        }
      };
      
      // Processa as refeições e alimentos
      const refeicoesComDetalhes = await Promise.all(
        refeicoes.map(async (refeicao: any) => {
          const alimentosComDetalhes = await Promise.all(
            refeicao.alimentos.map(async (alimento: any) => {
              if (!alimento.nome || !alimento.peso) {
                throw new Error('Nome do alimento e peso são obrigatórios.');
              }

              const detalhes = await obterDetalhesAlimento(alimento.nome);

              return {
                nome: alimento.nome,
                kcal: detalhes.kcal,
                proteina: detalhes.proteina,
                carboidrato: detalhes.carboidrato,
                peso: alimento.peso,
              };
            })
          );

          return {
            tipo: refeicao.tipo,
            alimentos: alimentosComDetalhes,
          };
        })
      );

      // Cria o novo registro de consumo calórico
      const novoConsumoCalorico = new ConsumoCalorico({
        userID,
        data,
        refeicoes: refeicoesComDetalhes,
      });
      
      // Salva o registro no banco de dados
      const resultado = await novoConsumoCalorico.save();
      
      // Retorna a resposta com sucesso
      return res.status(201).json(resultado);
    } catch (error) {
      // Trata erros e retorna uma resposta de erro
      console.error('Erro ao criar o consumo calórico:', error);
      return res.status(500).json({ message: 'Erro ao criar o consumo calórico.', error: error.message });
    }
  }
}

export default ConsumoCaloricoController;
