import axios from 'axios';

//const API_URL = 'http://10.68.55.162:3000/consumocalorico';
const API_URL = 'http://10.68.55.162:3000/consumocalorico';
//'http://10.68.55.162:3000/consumocalorico';

interface ConsumoCaloricoData {
  user: string;
  data: string;
  tipoRefeicao: string;
  nomeAlimento: string;
  kcal: number;
  proteina: number;
  carboidrato: number;
  peso: number;
  acucar: number;
}

class ConsumoCaloricoService {
  // Criar um novo consumo calórico
  async create(consumo: ConsumoCaloricoData) {
    try {
      const response = await axios.post(API_URL, consumo);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar consumo calórico:', error);
      throw error;
    }
  }

  // Obter todos os consumos calóricos
  async getAll() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar consumos calóricos:', error);
      throw error;
    }
  }

  // Obter um consumo calórico específico por ID
  async getById(id: string) {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao obter consumo calórico:', error);
      throw error;
    }
  }

  // Atualizar um consumo calórico existente
  async update(id: string, consumo: Partial<ConsumoCaloricoData>) {
    try {
      const response = await axios.put(`${API_URL}/${id}`, consumo);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar consumo calórico:', error);
      throw error;
    }
  }

  // Deletar um consumo calórico
  async delete(id: string) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Erro ao deletar consumo calórico:', error);
      throw error;
    }
  }
}

// Exporta a classe para ser usada por outros módulos
export default new ConsumoCaloricoService();
