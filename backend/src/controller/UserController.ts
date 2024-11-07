import { Request, Response } from "express";
import { User } from "../models";
import UserModel from "../models/UserModel";

class UsersController {

  public create = async (req: Request, res: Response): Promise<void> => {
    const {
        email,
        password,
        name,
        height,
        weight,
        activityLevel,
        gender,
        goal,
        birthdate,
        nutricionista,
        nickname,
        isLogged
    } = req.body;

    console.log("Dados recebidos para criação de usuário:", req.body);
    try {
        // Calcular a idade
        const idade = this.getIdade(birthdate);

        // Calcular a Taxa Metabólica Basal (TMB)
        let taxaBasal: number;
        if (gender === 'masculino') {
            taxaBasal = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * idade);
        } else {
            taxaBasal = 447.6 + (9.25 * weight) + (3.1 * height) - (4.3 * idade);
        }

        // Calcular o fator de atividade para definir as calorias totais
        let fatorAtividade: number;
        switch (activityLevel) {
            case 'sedentario':
                fatorAtividade = 1.2;
                break;
            case 'levemente_ativo':
                fatorAtividade = 1.375;
                break;
            case 'moderadamente_ativo':
                fatorAtividade = 1.55;
                break;
            case 'altamente_ativo':
                fatorAtividade = 1.725;
                break;
            case 'extremamente_ativo':
                fatorAtividade = 1.9;
                break;
            default:
                fatorAtividade = 1.2;
        }

        console.log("taxaBasal", taxaBasal)

        // Calcular kcalObjetivo
        const kcalObjetivo = taxaBasal * fatorAtividade;
        console.log("kcalObjetivo", kcalObjetivo)

        // Calcular proteinaObjetivo
        const proteinaObjetivo = (activityLevel === 'altamente_ativo' || activityLevel === 'extremamente_ativo') ? 1.8 * weight : 1.2 * weight;
        console.log("proteinaObjetivo", proteinaObjetivo)

        // Calcular carboidratoObjetivo
        const carboidratoObjetivo = (activityLevel === 'altamente_ativo' || activityLevel === 'extremamente_ativo') ? 9 * weight : 5 * weight;
        console.log("carboidratoObjetivo", carboidratoObjetivo)

        // Calcular acucarObjetivo (pode ajustar conforme necessário)
        const acucarObjetivo = carboidratoObjetivo * 0.1; // Exemplo: 10% dos carboidratos
        console.log("acucarObjetivo", acucarObjetivo)

        // Cria um novo usuário com os dados recebidos e os cálculos realizados
        const newUser = new UserModel({
            email,
            password,
            name,
            nickname,
            height,
            weight,
            activityLevel,
            gender,
            goal,
            birthdate,
            nutricionista,  // Pode ser undefined, pois é opcional
            isLogged,
            kcalObjetivo,
            taxaBasal,
            proteinaObjetivo,
            acucarObjetivo,
            carboidratoObjetivo
        });

        console.log("Objeto antes de salvar:", newUser.toObject());

        // Salva o usuário no banco de dados
        const response = await newUser.save();
        console.log("Resposta após salvar:", response);
        res.status(201).send(response);
    } catch (e: any) {
        if (e.code === 11000) {
            res.status(400).send({ message: `O email ou nome de usuário já estão em uso.` });
        } else if (e.errors) {
            const messages = Object.values(e.errors).map((err: any) => err.message);
            res.status(400).send({ message: messages });
        } else {
            res.status(500).send({ message: e.message || 'Erro interno do servidor' });
        }
    }
}

// Função auxiliar para calcular idade com base na data de nascimento
private getIdade(birthdate: string): number {
    const hoje = new Date();
    const nascimento = new Date(birthdate);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade;
}


public async getUserDataById(req: Request, res: Response): Promise<Response> {
  const { userId } = req.query;

  // Verifica se o userId foi fornecido
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ message: 'O ID do usuário é necessário.' });
  }

  console.log("Parâmetro recebido:", { userId });

  try {
    // Busca o usuário pelo ID
    const userData = await UserModel.findById(userId).select('height weight activityLevel gender goal birthdate kcalObjetivo taxaBasal proteinaObjetivo acucarObjetivo carboidratoObjetivo');

    // Verifica se o usuário foi encontrado
    if (!userData) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Retorna os dados do usuário encontrado
    return res.status(200).json(userData);
  } catch (error:any) {
    console.error("Erro ao buscar dados do usuário:", error);
    return res.status(500).json({ message: 'Erro ao buscar dados do usuário.', error: error.message });
  }
}

public async list(_: Request, res: Response): Promise<void> {
  res.send(await User.find());
}

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.body;
    const response = await User.findByIdAndDelete(id);
    if (response) {
      res.json(response);
    } else {
      res.json({ message: "Registro inexistente" });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const {
      id,
      email,
      password,
      name,
      nickname,
      isLogged,
      height,
      weight,
      activityLevel,
      gender,
      goal,
      birthdate,
      nutricionista,
    } = req.body;
    try {
      const response = await User.findByIdAndUpdate(
        id,
        {
          email,
          password,
          name,
          nickname,
          isLogged,
          height,
          weight,
          activityLevel,
          gender,
          goal,
          birthdate,
          nutricionista,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (response) {
        res.json(response);
      } else {
        res.json({ message: "Registro inexistente" });
      }
    } catch (e: any) {
      if (e.code === 11000) {
        res.send({ message: `O e-mail ${email} já está em uso` });
      } else if (e.errors?.email) {
        res.send({ message: e.errors.mail.message });
      } else {
        res.send({ message: e });
      }
    }
  }


  public updatePeso = async (req: Request, res: Response): Promise<void> => {
    const { height, weight, activityLevel, gender, goal, birthdate } = req.body;
    const userId = req.params.id;  // Mantendo o uso do parâmetro na URL
  
    console.log("Dados recebidos do frontend:", req.body);
    
    try {
      // Busca o usuário no banco de dados usando o userId da URL
      const user = await UserModel.findById(userId);
      if (!user) {
        res.status(404).send({ message: "Usuário não encontrado" });
        return;
      }
  
      // Atualiza os campos básicos do usuário
      user.height = height || user.height;
      user.weight = weight || user.weight;
      user.activityLevel = activityLevel || user.activityLevel;
      user.gender = gender || user.gender;
      user.goal = goal || user.goal;
      user.birthdate = birthdate || user.birthdate;
  
      // Calcular a idade com base no campo `birthdate` atualizado
      const idade = this.getIdadeUpdate(user.birthdate);
  
      // Calcular a Taxa Metabólica Basal (TMB) com base no gênero
      let taxaBasal: number;
      if (user.gender === 'masculino') {
        taxaBasal = 88.36 + (13.4 * user.weight) + (4.8 * user.height) - (5.7 * idade);
      } else {
        taxaBasal = 447.6 + (9.25 * user.weight) + (3.1 * user.height) - (4.3 * idade);
      }
  
      // Calcular o fator de atividade para definir as calorias totais
      let fatorAtividade: number;
      switch (user.activityLevel) {
        case 'sedentario':
          fatorAtividade = 1.2;
          break;
        case 'levemente_ativo':
          fatorAtividade = 1.375;
          break;
        case 'moderadamente_ativo':
          fatorAtividade = 1.55;
          break;
        case 'altamente_ativo':
          fatorAtividade = 1.725;
          break;
        case 'extremamente_ativo':
          fatorAtividade = 1.9;
          break;
        default:
          fatorAtividade = 1.2;
      }
  
      // Calcular kcalObjetivo
      const kcalObjetivo = taxaBasal * fatorAtividade;
  
      // Atualizar e salvar o usuário
      user.taxaBasal = taxaBasal; // Salvar a taxa basal no usuário
      user.kcalObjetivo = kcalObjetivo; // Salvar o objetivo calórico no usuário
  
      // Salvar no banco
      await user.save();
  
      res.status(200).send(user);
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
      res.status(500).send({ message: "Erro ao atualizar os dados" });
    }
  };
  
  

private getIdadeUpdate(birthdate: Date | string): number {
  const hoje = new Date();
  const nascimento = typeof birthdate === 'string' ? new Date(birthdate) : birthdate;
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
  }

  return idade;
}


}

export default new UsersController();
