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
        const proteinaObjetivo = (activityLevel === 'altamente_ativo' || activityLevel === 'extremamente_ativo') ? 1.5 * weight : 1 * weight;
        console.log("proteinaObjetivo", proteinaObjetivo)

        // Calcular carboidratoObjetivo
        const carboidratoObjetivo = (activityLevel === 'altamente_ativo' || activityLevel === 'extremamente_ativo') ? 8 * weight : 4 * weight;
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
}

export default new UsersController();
