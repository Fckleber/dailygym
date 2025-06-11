import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
// 1. Importe a sua nova TelaInicial
import TelaInicial from './src/screens/Telainicial'; 
import AddTreino from './src/screens/AddTreino';

// Remova a importação da HomeScreen se não for mais usá-la como tela principal
// import HomeScreen from './src/screens/HomeScreen';


const Stack = createStackNavigator();

function AppNavigator() {
  const { user } = useAuth();

  return (
    // 2. Mude o Stack.Navigator para um Stack.Group para opções diferentes
    <Stack.Navigator>
      {user ? (
        // Telas para usuários logados
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TelaInicial" component={TelaInicial} />
        </Stack.Group>
      ) : (
        // Telas para usuários não logados
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroScreen} />
        </Stack.Group>
      )}
      {/* 3. Adicione a tela de Adicionar Treino como um modal */}
      <Stack.Screen
        name="AddTreino"
        component={AddTreino}
        options={{
          headerShown: false, // Sem cabeçalho
          presentation: 'modal', // Efeito de subir da parte de baixo
        }}
      />
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