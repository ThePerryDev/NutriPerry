import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TelaPPObjetivo from "./src/screen/tela_pp_objetivo/tela_pp_objetivo";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro de Usuário">
        <Stack.Screen
          name="Cadastro de Usuário"
          component={TelaPPObjetivo}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

