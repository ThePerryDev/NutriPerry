import { Request, Response } from "express";
import { User } from "../models";
import UserModel from "../models/UserModel";

class UsersController {
    
    public async create(req: Request, res: Response): Promise<void> {
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
          // Cria um novo usuário com os dados recebidos
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
            isLogged
          });
    
          // Salva o usuário no banco de dados
          const response = await newUser.save();
          res.status(201).send(response);
        } catch (e: any) {
          if (e.code === 11000) {
            // Captura erro de duplicidade (email ou name já existentes)
            res.status(400).send({ message: `O email ou nome de usuário já estão em uso.` });
          } else if (e.errors) {
            // Captura erros de validação específicos (por exemplo, email inválido)
            const messages = Object.values(e.errors).map((err: any) => err.message);
            res.status(400).send({ message: messages });
          } else {
            // Erro genérico
            res.status(500).send({ message: e.message || 'Erro interno do servidor' });
          }
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
}

export default new UsersController();
