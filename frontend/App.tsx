import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TelaPPObjetivo from "./src/screen/cadastro/perfil_pessoal/tela_pp_objetivo/tela_pp_objetivo";
import TelaFinalizado from "./src/screen/cadastro/finalizado/tela_finalizado";
import { RootStackParamList } from "./src/types/rootStack";
import TelaLogin from "./src/screen/login/Login";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaLogin">
        <Stack.Screen
          name="TelaLogin"
          component={TelaLogin}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
