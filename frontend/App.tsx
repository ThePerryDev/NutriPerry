import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./src/types/rootStack";
import { CadastroAlturaPeso, CadastroSexoIdade, Home, TelaFinalizado, TelaPPObjetivo } from "./src/screen";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CadastroSexoIdade">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroSexoIdade"
          component={CadastroSexoIdade}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroAlturaPeso"
          component={CadastroAlturaPeso}
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
