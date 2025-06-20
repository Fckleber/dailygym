import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import TelaInicial from './src/screens/Telainicial';
import AddTreino from './src/screens/AddTreino';
// CORREÇÃO: Altere o nome do arquivo na importação para corresponder ao seu arquivo
import SelecionarExercicio from './src/screens/Selecionarexercicio'; // O nome aqui deve ser igual ao nome do arquivo
import ConfigExercicio from './src/screens/ConfigExercicio';
import Treino from './src/screens/Treino';



const Stack = createStackNavigator();

function AppNavigator() {
  const { user } = useAuth();

return (
    <Stack.Navigator>
      {user ? (
        // Telas para usuários LOGADOS
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TelaInicial" component={TelaInicial} />
          <Stack.Screen name="Treino" component={Treino} />
          <Stack.Screen name="AddTreino" component={AddTreino} options={{ presentation: 'modal' }} />
          <Stack.Screen name="SelecionarExercicio" component={SelecionarExercicio} />
          <Stack.Screen name="ConfigExercicio" component={ConfigExercicio} />
        </Stack.Group>
      ) : (
        // Telas para usuários NÃO LOGADOS
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}


export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}