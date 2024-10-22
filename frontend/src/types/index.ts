import BotoesInferiorProps from "./BotoesInferior/BotoesInferiorProps";
import { ReactNode } from "react";

export { BotoesInferiorProps };

export interface UsersProps {
  id: string;
  email: string;
  password: string;
  activityLevel: 'sedentario' | 'pouco ativo' | 'ativo' | 'muito ativo';
  name: string;
  nickname: string;
  height: number; // em cm
  weight: number; // em kg
  gender: 'masculino' | 'feminino';
  goal: 'perda de peso' | 'manutenção de peso' | 'ganho de peso';
  birthdate: Date; // Data de nascimento
  nutricionista?: string; // Referência a um nutricionista existente
  isLogged: boolean; // Indica se o usuário está logado
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

export interface consoleTesteProps{
  consoleTeste: string;
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

// Interfaces para os dados de produtos
export interface Nutriments {
  'energy-kcal_100g'?: number;
  proteins?: number;
  carbohydrates?: number;
  sugars?: number;
  'sodium_100g'?: number;
  'sugars_100g'?: number;
  'fat_100g'?:number;
  'saturated-fat_100g'?: number;
  'fiber_100g'?: number;
  
}

export interface Product {
  product_name?: string;
  nutriments?: {
    'energy-kcal_100g'?: number;
    proteins?: number;
    carbohydrates?: number;
    'salt_100g'?: number;
    'sugars_100g'?: number;
    'fat_100g'?:number;
    'saturated-fat_100g'?: number;
    'fiber_100g'?: number;
    // Adicione mais nutrientes se necessário
  };
}

// Interface para o AlimentoTacoModel
export interface AlimentoTaco {
  id: string;
  description: string;
  energy: {
    label: string;
    value: number;
    unit: string;
  };
  protein: {
    label: string;
    value: number;
    unit: string;
  };
  carbohydrate: {
    label: string;
    value: number;
    unit: string;
  };
}

export interface NutritionalValues {
  kcal: string;
  protein: string;
  carbohydrate: string;
  sodium: string;
  sugar: string;
  gordura: string;
  gordura_saturada: string;
  fibra: string;
}
