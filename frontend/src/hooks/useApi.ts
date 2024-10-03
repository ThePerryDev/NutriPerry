import service from "../services/userService";
import { UsersProps } from "../types";
import Search from "../utils/Search";

export const useApi = () => ({
  // VALIDAÇÃO DE TOKEN DESATIVADA PORQUE USA-SE O MONGO
  /*
    validateToken: async (token: string) => {
        const response = await api.post('/validate', {token});
        return response.data;
    },
    */

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
      const id = user.id;
      const name = user.name;
      const email = user.email;
      const password = user.password;
      const height = user.height;
      const weight = user.weight;
      const activityLevel = user.activityLevel;
      const gender = user.gender;
      const goal = user.goal;
      const birthdate = user.birthdate;
      const nutricionista = user.nutricionista;
      const isLogged = true;
      return await service.put({
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
      });
    }
    return null;
  },

  logout: async (email: string) => {
    let user = await getUser(email);
    if (user) {
      const id = user.id;
      const name = user.name;
      const email = user.email;
      const password = user.password;
      const height = user.height;
      const weight = user.weight;
      const activityLevel = user.activityLevel;
      const gender = user.gender;
      const goal = user.goal;
      const birthdate = user.birthdate;
      const nutricionista = user.nutricionista;
      const isLogged = true;
      await service.put({
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
      });
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
  /* Cria lista de emails dos usuários*/
  let mailList: string[] = [];

  /* Se usuários existem, popula a lista de email dos usuários */
  if (users.length > 0) {
    users?.map((user) => mailList.push(user.email));
  }

  let s_number = new Search<number>();

  console.log(users);
  return s_number.sequential_ws(email, mailList);
}

async function getUser(email: string) {
  let position = await getUserPosition(email);

  /* Se o nome ainda não estiver no banco de dados, ele então é cadastrado */
  if (position === -1) {
    console.log("Usuário não cadastrado!");
    return null;
  }
  return users[position];
}
