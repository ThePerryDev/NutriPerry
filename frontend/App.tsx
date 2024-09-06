import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaCadNome from "./src/screen/cadastroNome";
import TelaCadEmail from './src/screen/cadastroEmail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TelaCadEmail">
        <Stack.Screen
          name="TelaCadNome"
          component={TelaCadNome}
          options={{ title: 'Cadastro de Nome' }} // Aqui você pode personalizar o título
        />
        <Stack.Screen
          name="TelaCadEmail"
          component={TelaCadEmail}
          options={{ title: 'Cadastro de Email' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}