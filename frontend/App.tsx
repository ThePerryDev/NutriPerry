import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./src/types/rootStack";
import AuthProvider from "./src/context/auth/AuthProvider";
import { ConsumoCaloricoProvider } from "./src/context";
import { UserCadastroProvider } from "./src/context/UserCadastroContext";
import { CadastroAlturaPeso, CadastroEmail, CadastroNome, CadastroSexoIdade, Home, TelaFinalizado, TelaPPObjetivo, AbrindoApp, TelaLogin, CadastrarAlimento, PesquisaAlimento, AdicionarAlimento, ErroAlimento, MonitorCalorico, MenuDietas, CafedaManha, Almoco, Jantar, Lanches, Configuracoes, Informacoes, Senha, InformacoesNutri1, InformacoesNutri2, ConfiguracoesNutri, SenhaNutri, SeusExercicios, NewExercicise, ConsumoAgua, Perfil, Pesos, GraficoConsumoAgua} from "./src/screen";
import React from "react";


const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <UserCadastroProvider>
        <ConsumoCaloricoProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="AbrindoApp">
              <Stack.Screen
                name="AbrindoApp"
                component={AbrindoApp}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TelaLogin"
                component={TelaLogin}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="NewExercicise"
                component={NewExercicise}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SeusExercicios"
                component={SeusExercicios}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CadastroAlturaPeso"
                component={CadastroAlturaPeso}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CadastroEmail"
                component={CadastroEmail}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CadastroNome"
                component={CadastroNome}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CadastroSexoIdade"
                component={CadastroSexoIdade}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TelaPPObjetivo"
                component={TelaPPObjetivo}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TelaFinalizado"
                component={TelaFinalizado}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PesquisaAlimento"
                component={PesquisaAlimento}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AdicionarAlimento"
                component={AdicionarAlimento}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CadastrarAlimento"
                component={CadastrarAlimento}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ErroAlimento"
                component={ErroAlimento}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MonitorCalorico"
                component={MonitorCalorico}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MenuDietas"
                component={MenuDietas}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CafedaManha"
                component={CafedaManha}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Almoco"
                component={Almoco}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Jantar"
                component={Jantar}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Lanches"
                component={Lanches}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TelaConfiguracoes"
                component={Configuracoes}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TelaInformacoes"
                component={Informacoes}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TelaTrocaSenha"
                component={Senha}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TelaConfiguracoesNutri"
                component={ConfiguracoesNutri}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TelaInformacoesNutri1"
                component={InformacoesNutri1}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TelaInformacoesNutri2"
                component={InformacoesNutri2}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TelaTrocaSenhaNutri"
                component={SenhaNutri}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ConsumoAgua"
                component={ConsumoAgua}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TelaPerfil"
                component={Perfil}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="TelaPeso"
                component={Pesos}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="GraficoConsumoAgua"
                component={GraficoConsumoAgua}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </ConsumoCaloricoProvider>
      </UserCadastroProvider>
    </AuthProvider>
  );
}


