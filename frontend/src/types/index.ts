import BotoesInferiorProps from "./BotoesInferior/BotoesInferiorProps";

export { BotoesInferiorProps };

export interface UsersProps {
  id: string;
  email: string;
  password: string;
  name: string;
  height: number; // em cm
  weight: number; // em kg
  activityLevel: 'sedentario' | 'pouco ativo' | 'ativo' | 'muito ativo';
  gender: 'masculino' | 'feminino';
  goal: 'perda de peso' | 'manter meu peso atual' | 'ganho de peso';
  birthdate: Date; // Data de nascimento
  nutricionista?: string; // Referência a um nutricionista existente
  isLogged: boolean; // Indica se o usuário está logado
}

export interface Error {
  error: string;
  props: string;
}
