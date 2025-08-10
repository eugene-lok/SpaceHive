// src/screens/LandingScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type LandingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

interface Props {
  navigation: LandingScreenNavigationProp;
}

const LandingScreen: React.FC<Props> = ({ navigation }) => {
  const [imageError, setImageError] = useState(false);

  const handleGetStarted = () => {
    navigation.navigate('Onboarding');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleImageError = () => {
    console.log('Logo failed to load, showing fallback text');
    setImageError(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <MaterialIcons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      
      {/* Main Content */}
      <View style={styles.content}>
        {/* Welcome Text */}
        <Text style={styles.welcomeTitle}>Welcome to SpaceHive!</Text>
        <Text style={styles.welcomeSubtitle}>Your account is ready to go.</Text>
        
        {/* Logo */}
        <View style={styles.logoContainer}>
          {imageError ? (
            <Text style={styles.logoText}>SPACEHIVE</Text>
          ) : (
            <Image 
              source={require('../../assets/images/SpaceHiveLogo.png')}
              style={styles.logo}
              resizeMode="contain"
              onError={handleImageError}
            />
          )}
        </View>
      </View>
      
      {/* Get Started Button */}
      <TouchableOpacity onPress={handleGetStarted} style={styles.getStartedButton}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    marginLeft: -8,
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 80,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  logo: {
    height: 160,
    maxWidth: '100%', // Match button width
    maxHeight: 200,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F4D03F',
    letterSpacing: 3,
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: '#4A90A4',
    borderRadius: 12,
    marginBottom: 32,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});

export default LandingScreen;