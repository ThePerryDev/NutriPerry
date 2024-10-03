// src/controller/NutricionistaController.ts

import { Request, Response } from 'express';
import NutricionistaModel from '../models/NutricionistaModel'; // ajuste o caminho conforme necessário
import mongoose from 'mongoose';

class NutricionistaController {
  
  // Função para criar um novo nutricionista
  public async create(req: Request, res: Response): Promise<void> {
    try {
      // Cria uma nova instância de Nutricionista com os dados do corpo da requisição
      const novoNutricionista = new NutricionistaModel({
        email: req.body.email,
        password: req.body.password,
        nome: req.body.nome,
        birthdate: req.body.birthdate,
        genero: req.body.genero,
      });

      // Salva o nutricionista no banco de dados
      const nutricionistaSalvo = await novoNutricionista.save();

      // Retorna a resposta com o nutricionista criado e um status de sucesso
      res.status(201).json({
        message: 'Nutricionista criado com sucesso!',
        data: nutricionistaSalvo,
      });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        // Captura erros de validação específicos do Mongoose
        const validationErrors = Object.values(error.errors).map((err: any) => err.message);
        res.status(400).json({
          message: 'Erro de validação.',
          errors: validationErrors,
        });
      } else if (error instanceof Error) {
        // Captura outros erros, como erros do sistema
        res.status(500).json({
          message: 'Erro ao criar nutricionista.',
          error: error.message,
        });
      } else {
        // Captura erros desconhecidos
        res.status(500).json({
          message: 'Erro desconhecido ao criar nutricionista.',
          error: 'Erro desconhecido',
        });
      }
    }
  }

  // Função para atualizar um nutricionista
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { nome, birthdate, genero, password } = req.body;

      // Encontra o nutricionista pelo ID e atualiza os campos fornecidos
      const nutricionistaAtualizado = await NutricionistaModel.findByIdAndUpdate(
        id,
        { nome, birthdate, genero, password },
        { new: true, runValidators: true } // `new: true` retorna o documento atualizado, `runValidators: true` aplica validações
      );

      if (!nutricionistaAtualizado) {
        // Retorna a resposta com status 404 e mensagem de erro se o nutricionista não for encontrado
        res.status(404).json({
          message: 'Nutricionista não encontrado.',
        });
        return;
      }

      // Retorna a resposta com o nutricionista atualizado e um status de sucesso
      res.status(200).json({
        message: 'Nutricionista atualizado com sucesso!',
        data: nutricionistaAtualizado,
      });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        // Captura erros de validação específicos do Mongoose
        const validationErrors = Object.values(error.errors).map((err: any) => err.message);
        res.status(400).json({
          message: 'Erro de validação.',
          errors: validationErrors,
        });
      } else if (error instanceof Error) {
        // Captura outros erros, como erros do sistema
        res.status(500).json({
          message: 'Erro ao atualizar nutricionista.',
          error: error.message,
        });
      } else {
        // Captura erros desconhecidos
        res.status(500).json({
          message: 'Erro desconhecido ao atualizar nutricionista.',
          error: 'Erro desconhecido',
        });
      }
    }
  }

  // Função para listar nutricionistas
  public async list(req: Request, res: Response): Promise<void> {
    try {
      // Obtém parâmetros de consulta (query params) da requisição
      const { nome, genero } = req.query;

      // Construa um objeto de filtro baseado nos parâmetros de consulta
      const filtro: any = {};
      if (nome) filtro.nome = { $regex: new RegExp(nome as string, 'i') }; // 'i' para case-insensitive
      if (genero) filtro.genero = genero;

      // Busca nutricionistas com base no filtro
      const nutricionistas = await NutricionistaModel.find(filtro);

      // Retorna a resposta com a lista de nutricionistas e um status de sucesso
      res.status(200).json({
        message: 'Lista de nutricionistas.',
        data: nutricionistas,
      });
    } catch (error) {
      if (error instanceof Error) {
        // Captura outros erros, como erros do sistema
        res.status(500).json({
          message: 'Erro ao listar nutricionistas.',
          error: error.message,
        });
      } else {
        // Captura erros desconhecidos
        res.status(500).json({
          message: 'Erro desconhecido ao listar nutricionistas.',
          error: 'Erro desconhecido',
        });
      }
    }
  }


  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const nutricionista = await NutricionistaModel.findByIdAndDelete(id);
      if (!nutricionista) {
        return res.status(404).json({ message: 'Nutricionista não encontrado' });
      }
      return res.status(204).send(); // 204 No Content
    } catch (error) {
      console.error('Erro ao deletar nutricionista:', error);
      return res.status(500).json({ message: 'Erro ao deletar nutricionista', error });
    }
  }
}

// Exporta uma instância da classe NutricionistaController
export default new NutricionistaController();
  