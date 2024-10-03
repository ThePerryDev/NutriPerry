import BotoesInferiorProps from "./BotoesInferior/BotoesInferiorProps";
import { ReactNode } from "react";

export { BotoesInferiorProps };

export interface UsersProps {
  id: string;
  name: string;
  mail: string;
  password: string;
  isLogged: boolean;
}

export interface Error {
  error: string;
  props: string;
}



// Interface para os dados de consumo calórico
export interface ConsumoCaloricoProps {
  id?: string; // Opcional caso não tenha durante a criação
  user: string;
  data: Date;
  tipoRefeicao: string;
  nomeAlimento: string;
  kcal: number;
  proteina: number;
  carboidrato: number;
  peso: number;
  acucar: number;
}

// Interface para o contexto do consumo calórico
export interface ConsumoCaloricoContextProps {
  consumos: ConsumoCaloricoProps[];
  create: (consumo: ConsumoCaloricoProps) => Promise<void>; // Utilize apenas create
  remove: (id: string) => Promise<void>;
  update: (id: string, consumo: Partial<ConsumoCaloricoProps>) => Promise<void>;
  getConsumoById: (id: string) => ConsumoCaloricoProps | null;
  error: ErrorProps | null;
  setError: (error: ErrorProps | null) => void;
  isErrorProps: (object: any) => object is ErrorProps;
}

// Reutilizando a interface de erro
export interface ErrorProps {
  message: string;
}

// ProviderProps como exemplo
export interface ProviderProps {
  children: ReactNode;
}
