// frontend/src/services/GastoCalorico.ts

import axios from 'axios';

const API_URL = 'http://192.168.0.128:3000/gastocalorico';
//const API_URL = 'http://192.168.0.128:3000/gastocalorico';

interface GastoCaloricoData {
  userID: string;
  atividadeFisica: string;
  gastoCalorico: number;
  data: Date;
  tempo: number;
}

class GastoCaloricoService {
  async getAll(): Promise<GastoCaloricoData[]> {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao listar gastos calóricos:', error);
      throw error;
    }
  }

  async getById(id: string): Promise<GastoCaloricoData> {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar gasto calórico:', error);
      throw error;
    }
  }

  async create(gastoCalorico: GastoCaloricoData): Promise<GastoCaloricoData> {
    try {
      const response = await axios.post(API_URL, gastoCalorico);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar gasto calórico:', error);
      throw error;
    }
  }

  async update(id: string, gastoCalorico: Partial<GastoCaloricoData>): Promise<GastoCaloricoData> {
    try {
      const response = await axios.put(`${API_URL}/${id}`, gastoCalorico);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar gasto calórico:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Erro ao deletar gasto calórico:', error);
      throw error;
    }
  }
}

export default new GastoCaloricoService();