import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./src/types/rootStack";
import TelaLogin from "./src/screen/login/Login";
import TelaPPObjetivo from "./src/screen/cadastro/perfil_pessoal/tela_pp_objetivo/tela_pp_objetivo";
import TelaFinalizado from "./src/screen/cadastro/finalizado/tela_finalizado";
import TelaCadNome from "./src/screen/cadastro/perfil_pessoal/tela_pp_nome/cadastroNomeP";
import TelaCadEmailP from "./src/screen/cadastro/perfil_pessoal/tela_pp_email/cadastroEmailP";
import TelaCadNutriEmail from "./src/screen/cadastro/perfil_nutricionista/tela_nutri_email/cadastroEmailP";
import TelaCadNutriNome from "./src/screen/cadastro/perfil_nutricionista/tela_nutri_nome/cadastroNomeP";
import TelaCadNutriFormacao from "./src/screen/cadastro/perfil_nutricionista/tela_nutri_formacao/cadastroFormacaoN";
import TelaCadNutriTelefone from "./src/screen/cadastro/perfil_nutricionista/tela_nutri_telefone/tela_telefone";
import AbrindoApp from "./src/screen/abrindo/tela_abrindo";

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
          name="TelaCadNome"
          component={TelaCadNome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaCadEmailP"
          component={TelaCadEmailP}
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
          name="TelaCadNutriNome"
          component={TelaCadNutriNome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaCadNutriEmail"
          component={TelaCadNutriEmail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaCadNutriFormacao"
          component={TelaCadNutriFormacao}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TelaCadNutriTelefone"
          component={TelaCadNutriTelefone}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
