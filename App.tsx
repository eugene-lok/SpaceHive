// App.tsx
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import components
import LandingScreen from './src/screens/LandingScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import InstantBookingScreen from './src/screens/booking/InstantBookingScreen';

import { useCustomFonts } from "./src/hooks/useFonts"
import * as SplashScreen from 'expo-splash-screen';
import { BookingFormData } from './src/types/booking';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Types
export type RootStackParamList = {
  Landing: undefined;
  Onboarding: undefined;
  Home: undefined;
  InstantBooking: {
    formData: BookingFormData;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
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
    <NavigationContainer
    onReady={() => setIsReady(true)}
    onStateChange={() => console.log('Navigation state changed')}
    >
      <StatusBar style="dark" backgroundColor="white" />
      <Stack.Navigator 
        initialRouteName="Landing"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="InstantBooking" component={InstantBookingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;