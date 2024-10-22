import { createContext, useCallback, useEffect, useState, ReactNode } from 'react';
import { ConsumoCaloricoService } from '../services'; // Importação do serviço
import { ConsumoCaloricoProps, ConsumoCaloricoContextProps, ProviderProps, ErrorProps } from '../types';

// Criação do contexto
export const ConsumoCaloricoContext = createContext({} as ConsumoCaloricoContextProps);

export function ConsumoCaloricoProvider({ children }: ProviderProps) {
  const [consumos, setConsumos] = useState<ConsumoCaloricoProps[]>([]); // Estado para armazenar os consumos calóricos
  const [error, setError] = useState<ErrorProps | null>(null); // Estado para capturar erros

  // Função para verificar se o objeto de resposta é um erro
  const isErrorProps = (object: any): object is ErrorProps => 'message' in object;

  // Função para buscar todos os consumos calóricos
  const getAllConsumos = useCallback(async () => {
    try {
      const response = await ConsumoCaloricoService.getAll();
      if (!isErrorProps(response)) {
        setConsumos(response); // Atualiza a lista de consumos
      } else {
        setError(response); // Define o erro se houver
      }
    } catch (err) {
      console.error("Erro ao buscar consumos:", err);
    }
  }, []);

  useEffect(() => {
    getAllConsumos(); // Chama a função para carregar consumos na inicialização
  }, [getAllConsumos]);

  // Função para criar um novo consumo calórico
  const create = useCallback(async (consumo: ConsumoCaloricoProps) => {
    try {
      console.log("Dados que estão sendo enviados para o contexto:", consumo);
      const response = await ConsumoCaloricoService.create(consumo); // Chama o serviço para criar
      if (isErrorProps(response)) {
        setError(response); // Define o erro se houver
      } else {
        setError(null);
        await getAllConsumos(); // Recarrega os consumos após a criação
      }
    } catch (err) {
      console.error("Erro ao criar consumo:", err);
    }
  }, [getAllConsumos]);

  // Função para remover um consumo calórico
  const remove = useCallback(async (id: string) => {
    try {
      const response = await ConsumoCaloricoService.delete(id);
      if (isErrorProps(response)) {
        setError(response);
      } else {
        setError(null);
        await getAllConsumos(); // Recarrega os consumos após a exclusão
      }
    } catch (err) {
      console.error("Erro ao remover consumo:", err);
    }
  }, [getAllConsumos]);

  // Função para atualizar um consumo calórico
  const update = useCallback(async (id: string, consumo: Partial<ConsumoCaloricoProps>) => {
    try {
      const response = await ConsumoCaloricoService.update(id, consumo);
      if (isErrorProps(response)) {
        setError(response);
      } else {
        setError(null);
        await getAllConsumos(); // Recarrega os consumos após a atualização
      }
    } catch (err) {
      console.error("Erro ao atualizar consumo:", err);
    }
  }, [getAllConsumos]);

  // Função para obter um consumo calórico por ID
  const getConsumoById = (id: string) => {
    return consumos.find((consumo) => consumo.id === id) || null;
  };

  // Log de depuração para garantir que os valores do Provider estão corretos
  console.log("Valor fornecido pelo contexto:", { 
    consumos, 
    create, 
    remove, 
    update, 
    getConsumoById, 
    error, 
    setError, 
    isErrorProps 
  });

  return (
    <ConsumoCaloricoContext.Provider value={{ 
      consumos, 
      create, 
      remove, 
      update, 
      getConsumoById, 
      error, 
      setError, 
      isErrorProps 
    }}>
      {children}
    </ConsumoCaloricoContext.Provider>
  );
}
