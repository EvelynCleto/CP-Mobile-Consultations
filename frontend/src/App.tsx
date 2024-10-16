import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import ConsultationsListScreen from './screens/ConsultationsListScreen';
import AddConsultationScreen from './screens/AddConsultationScreen';

// Definindo os tipos para as rotas e seus parâmetros
export type RootStackParamList = {
  Login: undefined;
  Consultations: { role: string; userId?: number };
  AddConsultation: undefined;  // Tela para adicionar consulta
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Consultations"
          component={ConsultationsListScreen}
          options={{ title: 'Consultas' }}
        />
  <Stack.Screen
    name="AddConsultation"
    component={AddConsultationScreen}
    options={{ title: 'Adicionar Consulta' }}
  />
</Stack.Navigator>
    </NavigationContainer>
  );
}
