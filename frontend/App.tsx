import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import TelaPPObjetivo from "./src/screen/cadastro/perfil_pessoal/tela_pp_objetivo/tela_pp_objetivo";
import TelaFinalizado from "./src/screen/cadastro/finalizado/tela_finalizado";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro Finalizado">
        <Stack.Screen
          name="Cadastro Finalizado"
          component={TelaFinalizado}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*<Stack.Navigator initialRouteName="Cadastro de Usuário">
<Stack.Screen
  name="Cadastro de Usuário"
  component={TelaPPObjetivo}
  options={{ headerShown: false }}
/>
</Stack.Navigator>
*/
