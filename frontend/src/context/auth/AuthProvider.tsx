import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { UsersProps } from "../../types";
import { useApi } from "../../hooks/useApi";

export default function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<UsersProps | null>(null);
  const api = useApi();
  
  useEffect(() => {
    const validateUser = async () => {
      const email = await AsyncStorage.getItem("authEmail");
      if (email) {
        const data = await api.validateUser(email);
        if (data && data.isLogged) {
          setUser(data);
        }
      }
    };

    validateUser();
  }, []);

  const signin = async (email: string, password: string) => {
    const data = await api.signin(email, password);
    console.log(data)

    if (data && data.isLogged) {
      setUser(data);
      setLocalStorage(data);
      return true;
    }
    return false;
  };

  const signout = async () => {
    let email = user?.email ? user?.email : "";
    await api.logout(email);
    setUser(null);
    await AsyncStorage.clear(); // Limpa o AsyncStorage
    // Em vez de window.location.reload(), use a navegação que você precisa
  };

  const setLocalStorage = async (user: UsersProps) => {
    await AsyncStorage.setItem("authEmail", user.email);
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
