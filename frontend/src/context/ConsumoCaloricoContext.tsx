// src/context/ConsumoCaloricoContext.tsx
import { createContext, useCallback, useEffect, useState } from 'react';
import { ConsumoCaloricoService } from '../services'; // Agora importado a partir do index de services
import { ConsumoCaloricoProps, ConsumoCaloricoContextProps, ProviderProps, ErrorProps } from '../types';

// Criação do contexto
export const ConsumoCaloricoContext = createContext({} as ConsumoCaloricoContextProps);

export function ConsumoCaloricoProvider({ children }: ProviderProps) {
  const [consumos, setConsumos] = useState<ConsumoCaloricoProps[]>([]); // Especifique o tipo corretamente
  const [error, setError] = useState<ErrorProps | null>(null);

  // Verifica se o objeto é do tipo ErrorProps
  const isErrorProps = (object: any): object is ErrorProps => 'message' in object;

  // Função para buscar todos os consumos calóricos
  const getAllConsumos = useCallback(async () => {
    const response = await ConsumoCaloricoService.getAll();
    if (!isErrorProps(response)) {
      setConsumos(response);
    } else {
      setError(response);
    }
  }, []);

  useEffect(() => {
    getAllConsumos();
  }, [getAllConsumos]);

  // Função para criar um novo consumo calórico
  const create = useCallback(async (consumo: ConsumoCaloricoProps) => {
    const response = await ConsumoCaloricoService.create(consumo);
    if (isErrorProps(response)) {
      setError(response);
    } else {
      setError(null);
      await getAllConsumos(); // Recarrega os consumos após criação
    }
  }, [getAllConsumos]);

  // Função para remover um consumo calórico
  const remove = useCallback(async (id: string) => {
    const response = await ConsumoCaloricoService.delete(id);
    if (isErrorProps(response)) {
      setError(response);
    } else {
      setError(null);
      await getAllConsumos(); // Recarrega os consumos após exclusão
    }
  }, [getAllConsumos]);

  // Função para atualizar um consumo calórico
  const update = useCallback(async (id: string, consumo: Partial<ConsumoCaloricoProps>) => {
    const response = await ConsumoCaloricoService.update(id, consumo);
    if (isErrorProps(response)) {
      setError(response);
    } else {
      setError(null);
      await getAllConsumos(); // Recarrega os consumos após atualização
    }
  }, [getAllConsumos]);

  // Função para obter um consumo calórico por ID
  const getConsumoById = (id: string) => {
    return consumos.find((consumo) => consumo.id === id) || null;
  };

  return (
    <ConsumoCaloricoContext.Provider value={{ consumos, create, remove, update, getConsumoById, error, setError, isErrorProps }}>
      {children}
    </ConsumoCaloricoContext.Provider>
  );
}
