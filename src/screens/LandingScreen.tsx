// src/screens/LandingScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { useTheme } from '../hooks/useTheme'; 

type LandingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

interface Props {
  navigation: LandingScreenNavigationProp;
}

const LandingScreen: React.FC<Props> = ({ navigation }) => {
  const [imageError, setImageError] = useState(false);
  
  // ✨ Use the theme hook
  const { color, spacing, borderRadius, button } = useTheme();

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

  // ✨ Move styles inside component so we can use theme values
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: color('background'), 
      paddingHorizontal: spacing('md'),   
    },
    backButton: {
      alignSelf: 'flex-start',
      marginTop: spacing('sm'),
      marginLeft: -spacing('sm'),
      padding: spacing('sm'),
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: spacing('sm'),
    },
    welcomeTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: color('onSurface'),      
      marginBottom: spacing('sm'),
    },
    welcomeSubtitle: {
      fontSize: 16,
      color: color('onSurfaceVariant'),   
      textAlign: 'center',
      marginBottom: spacing('xxxl'),      
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing('xxl'),     
    },
    logo: {
      height: 160,
      maxWidth: '100%',
      maxHeight: 200,
    },
    logoText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: color('accent'),         
      letterSpacing: 3,
      textAlign: 'center',
    },
    getStartedButton: {
      backgroundColor: color('primary'),  
      borderRadius: borderRadius('md'),    
      marginBottom: spacing('xl'),
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '600',
      color: color('surface'),          
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <MaterialIcons 
          name="arrow-back" 
          size={24} 
          color={color('onSurface')}    
        />
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

export default LandingScreen;