import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar telas
import WelcomeScreen from '../screens/WelcomeScreen';
import InputDataScreen from '../screens/InputDataScreen';
import RiskViewScreen from '../screens/RiskViewScreen';
import HistoryScreen from '../screens/HistoryScreen';
import MitigationScreen from '../screens/MitigationScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498db',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ 
            title: 'Monitoramento de Deslizamentos',
            headerShown: false
          }} 
        />
        <Stack.Screen 
          name="InputData" 
          component={InputDataScreen} 
          options={{ title: 'Inserir Dados' }} 
        />
        <Stack.Screen 
          name="RiskView" 
          component={RiskViewScreen} 
          options={{ title: 'Visualização de Risco' }} 
        />
        <Stack.Screen 
          name="History" 
          component={HistoryScreen} 
          options={{ title: 'Histórico' }} 
        />
        <Stack.Screen 
          name="Mitigation" 
          component={MitigationScreen} 
          options={{ title: 'Ações de Mitigação' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

