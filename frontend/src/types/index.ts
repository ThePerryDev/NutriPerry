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