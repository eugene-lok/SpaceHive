// App.tsx
import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import components
import LandingScreen from './src/screens/LandingScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import InstantBookingScreen from './src/screens/search/InstantBookingScreen';
import InstantBookingDetailsScreen from './src/screens/search/InstantBookingDetailsScreen';
import MatchRequestScreen from './src/screens/search/MatchRequestScreen';
import BookingsScreen from './src/screens/BookingScreen';
import PlaceholderScreen from './src/screens/PlaceholderScreen'; 

// Booking flow screens
import InstantBookingReviewScreen from './src/screens/booking/InstantBookingReviewScreen';
import InstantBookingPaymentScreen from './src/screens/booking/InstantBookingPaymentScreen';
import PaymentProcessingScreen from './src/screens/booking/PaymentProcessingScreen';
import InstantBookingConfirmationScreen from './src/screens/booking/InstantBookingConfirmationScreen';

import { useCustomFonts } from "./src/hooks/useFonts"
import * as SplashScreen from 'expo-splash-screen';
import { BookingFormData } from './src/types/booking';
import { Location } from './src/types/instantBooking';

export interface SerializableBookingFormData {
  location: {
    value: string | null;
    isFlexible: boolean;
  };
  dateTime: {
    date: string | null;
    time: {
      start: { time: string; period: 'AM' | 'PM' };
      end: { time: string; period: 'AM' | 'PM' };
    } | null;
    isDateFlexible: boolean;
    isTimeFlexible: boolean;
  };
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  budget: {
    min: number;
    max: number;
  };
}

// NEW: Interface for custom details from the review screen
export interface CustomBookingDetails {
  eventType: string | null;
  extraServices: string[];
}

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Types
export type RootStackParamList = {
  Landing: undefined;
  Onboarding: undefined;
  Home: undefined;
  InstantBooking: {
    formData: SerializableBookingFormData;
  };
  InstantBookingDetails: {
    location: Location;
    formData: SerializableBookingFormData; // ADD THIS
  };
  MatchRequest: {
    formData: BookingFormData;
  };
  Bookings: undefined;
  Placeholder: {
    activeTab: string; // Add this new screen
  };
  InstantBookingReview: {
    location: Location;
    formData: SerializableBookingFormData;
  };
  InstantBookingPayment: {
    location: Location;
    formData: SerializableBookingFormData;
    customDetails: CustomBookingDetails;
  };
  PaymentProcessing: {
    location: Location;
    formData: SerializableBookingFormData;
    customDetails: CustomBookingDetails;
  };
  InstantBookingConfirmation: {
    location: Location;
    formData: SerializableBookingFormData;
    customDetails: CustomBookingDetails;
    paymentMethod: string;
  };
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
        <Stack.Screen name="InstantBooking" component={InstantBookingScreen} />
        <Stack.Screen 
          name="InstantBookingDetails" 
          component={InstantBookingDetailsScreen}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'push',
          }}
        />
        <Stack.Screen 
          name="MatchRequest" 
          component={MatchRequestScreen}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'push',
          }}
        />
        <Stack.Screen name="Bookings" component={BookingsScreen} />
        <Stack.Screen name="Placeholder" component={PlaceholderScreen} />
        <Stack.Screen 
          name="InstantBookingReview" 
          component={InstantBookingReviewScreen}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'push',
          }}
        />
        <Stack.Screen 
          name="InstantBookingPayment" 
          component={InstantBookingPaymentScreen}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'push',
          }}
        />
        <Stack.Screen 
          name="PaymentProcessing" 
          component={PaymentProcessingScreen}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'push',
          }}
        />
        <Stack.Screen 
          name="InstantBookingConfirmation" 
          component={InstantBookingConfirmationScreen}
          options={{
            presentation: 'modal',
            animationTypeForReplace: 'push',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;