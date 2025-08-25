import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreens';
import OtpVerificationScreen from './src/screens/OtpVerificationScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import ChatScreen from './src/screens/ChatScreens';

import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerTitleAlign: 'center' }}>
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }}  />
          <Stack.Screen name="Register" component={RegisterScreen}  options={{ headerShown: false }}  />
          <Stack.Screen name="OTP" component={OtpVerificationScreen} options={{ headerShown: false }}  />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }}  />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}  options={{ headerShown: false }}  />
          <Stack.Screen name="Chat" component={ChatScreen}  options={{ headerShown: false }}  />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
