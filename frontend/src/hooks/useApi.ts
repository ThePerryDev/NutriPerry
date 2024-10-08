import service from "../services/userService";
import { UsersProps } from "../types";
import Search from "../utils/Search";

export const useApi = () => ({
  validateUser: async (name: string) => {
    const user = await getUser(name);
    let response;

    if (user) {
      response = user.isLogged === true ? user : null;
    }

    return response;
  },

  signin: async (email: string, password: string) => {
    let user = await getUser(email);
    if (user && user.password === password) {
      const { id, name, nickname, height, weight, activityLevel, gender, goal, birthdate, nutricionista } = user;
      const isLogged = true;
      return await service.put({
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
      });
    }
    return null;
  },

  logout: async (email: string) => {
    let user = await getUser(email);
    if (user) {
      const { id, name, nickname, password, height, weight, activityLevel, gender, goal, birthdate, nutricionista } = user;
      const isLogged = false; // Set isLogged to false on logout
      await service.put({
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
      });
    }
  },

  register: async (props: {
    email: string;
    password: string;
    name: string;
    nickname:string;
    height: number;
    weight: number;
    activityLevel: "sedentario" | "pouco ativo" | "ativo" | "muito ativo";
    gender: "masculino" | "feminino";
    goal: "perda de peso" | "manutenção de peso" | "ganho de massa";
    birthdate: Date;
    nutricionista?: string;
    isLogged: boolean;
  }) => {
    const user = await getUser(props.email);
    if (!user) {
      return await service.post(props); // Cadastro de novo usuário
    } else {
      throw new Error("Usuário já cadastrado");
    }
  },
});

let users: UsersProps[] = [];

async function getUsers() {
  try {
    const data = await service.get();
    users = data;
  } catch (error) {
    console.log(error);
  }
}

async function getUserPosition(email: string) {
  await getUsers();
  let mailList: string[] = [];

  if (users.length > 0) {
    users.map((user) => mailList.push(user.email));
  }

  let s_number = new Search<number>();

  console.log(users);
  return s_number.sequential_ws(email, mailList);
}

async function getUser(email: string) {
  let position = await getUserPosition(email);

  if (position === -1) {
    console.log("Usuário não cadastrado!");
    return null;
  }
  return users[position];
}
