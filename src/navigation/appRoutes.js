import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import Weather from '../screens/weather';
import Register from '../screens/register';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Weather} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
