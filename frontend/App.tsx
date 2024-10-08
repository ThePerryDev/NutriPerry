import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./src/types/rootStack";
import {
  CadastroAlturaPeso,
  CadastroEmail,
  CadastroNome,
  CadastroSexoIdade,
  CadastroNutriNome,
  CadastroNutriEmail,
  Home,
  TelaFinalizado,
  TelaPPObjetivo,
  CadastroNutriFormacao,
  CadastroNutriTelefone,
  AbrindoApp,
  TelaLogin,
  SeusExercicios,
  FormExercicio,
} from "./src/screen";

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
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
          name="FormExercicio"
          component={FormExercicio}
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
          name="CadastroNutriNome"
          component={CadastroNutriNome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroNutriEmail"
          component={CadastroNutriEmail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroNutriFormacao"
          component={CadastroNutriFormacao}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CadastroNutriTelefone"
          component={CadastroNutriTelefone}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
