import { Request, Response } from "express";
import User from "../models/UserModel";

class UsersController {
  public async create(req: Request, res: Response): Promise<void> {
    const {
      email,
      password,
      name,
      isLogged,
      height,
      weight,
      activityLevel,
      gender,
      goal,
      birthdate,
      nutricionista
    } = req.body;

    try {
      const response = await User.create({
        email,
        password,
        name,
        isLogged,
        height,
        weight,
        activityLevel,
        gender,
        goal,
        birthdate,
        nutricionista,
      });
      res.send(response);
    } catch (e: any) {
      if (e.code === 11000) {
        res.send({ message: `O e-mail ${email} já está em uso` });
      } else if (e.errors?.mail) {
        res.send({ message: e.errors.mail.message });
      } else {
        res.send({ message: e });
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
