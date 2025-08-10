// App.tsx
import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import components
import LandingScreen from './src/screens/LandingScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';

import { useCustomFonts } from "./src/hooks/useFonts"
import * as SplashScreen from 'expo-splash-screen';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Types
export type RootStackParamList = {
  Landing: undefined;
  Onboarding: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();


const App: React.FC = () => {
  const fontsLoaded = useCustomFonts();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor="white" />
      <Stack.Navigator 
        initialRouteName="Landing"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;