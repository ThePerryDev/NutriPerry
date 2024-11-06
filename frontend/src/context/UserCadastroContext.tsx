import React, { createContext, useContext, useState } from 'react';
import UserCadastroService from '../services/UserCadastroService';
import { UserProps } from '../services/UserCadastroService'; // Certifique-se de que o caminho está correto

interface UserCadastroContextType {
  users: UserProps[];
  userData: Partial<UserProps>; // Usando Partial para dados que não estão completos ainda
  createUser: () => Promise<void>;
  updateUserData: (data: Partial<UserProps>) => void;
  listUsers: () => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

const UserCadastroContext = createContext<UserCadastroContextType | undefined>(undefined);

export const UserCadastroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserProps[]>([]);
  const [userData, setUserData] = useState<Partial<UserProps>>({});

  const createUser = async () => {
    try {
      await UserCadastroService.createUser(userData as UserProps);
      await listUsers(); // Atualiza a lista após criar um usuário
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      // Aqui você pode adicionar um estado para exibir uma mensagem de erro, se desejar
    }
  };

  const updateUserData = (data: Partial<UserProps>) => {
    setUserData((prevData) => ({ ...prevData, ...data }));
  };

  const listUsers = async () => {
    try {
      const userList = await UserCadastroService.listUsers();
      setUsers(userList);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await UserCadastroService.deleteUser(id);
      await listUsers(); // Atualiza a lista após deletar um usuário
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  return (
    <UserCadastroContext.Provider value={{ users, userData, createUser, updateUserData, listUsers, deleteUser }}>
      {children}
    </UserCadastroContext.Provider>
  );
};

export const useUserCadastro = () => {
  const context = useContext(UserCadastroContext);
  if (!context) {
    throw new Error('useUserCadastro must be used within a UserCadastroProvider');
  }
  return context;
};