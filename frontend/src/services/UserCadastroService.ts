import axios from 'axios';

const BASE_URL = 'http://192.168.1.4:3000/user'; // Substitua pela URL correta

export interface UserProps {
  email: string;
  password: string;
  name: string;
  height: number; // em cm
  weight: number; // em kg
  activityLevel: string;
  gender: string | undefined;
  goal: string | undefined;
  birthdate: Date ; // Data de nascimento
  nutricionista?: string; // Opcional
  isLogged: boolean; // Indica se o usuário está logado
  nickname: string; // Nome de usuário
}

class UserCadastroService {
  // Método para criar um novo usuário
  public static async createUser(userData: UserProps): Promise<UserProps> {
    try {
      const response = await axios.post(BASE_URL, userData);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao criar o usuário:", error);
      throw error.response?.data || 'Erro ao criar o usuário';
    }
  }

  // Método para listar todos os usuários
  public static async listUsers(): Promise<UserProps[]> {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao listar usuários:", error);
      throw error.response?.data || 'Erro ao listar usuários';
    }
  }

  // Método para atualizar um usuário
  public static async updateUser(id: string, userData: UserProps): Promise<UserProps> {
    try {
      const response = await axios.put(`${BASE_URL}/${id}`, userData);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao atualizar o usuário:", error);
      throw error.response?.data || 'Erro ao atualizar o usuário';
    }
  }

  // Método para deletar um usuário
  public static async deleteUser(id: string): Promise<void> {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
    } catch (error: any) {
      console.error("Erro ao deletar o usuário:", error);
      throw error.response?.data || 'Erro ao deletar o usuário';
    }
  }
}

export default UserCadastroService;
