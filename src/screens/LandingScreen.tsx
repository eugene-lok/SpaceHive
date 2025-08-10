// src/screens/LandingScreen.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { theme } from '../theme/theme';

type LandingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

interface Props {
  navigation: LandingScreenNavigationProp;
}

const LandingScreen: React.FC<Props> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Onboarding');
  };

  return (
    <SafeAreaView style={styles.container}>
      <IconButton
        icon={() => <MaterialIcons name="arrow-back" size={24} color="#000" />}
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      />
      
      <View style={styles.centerContent}>
        <Text variant="headlineMedium" style={styles.welcomeTitle}>
          Welcome to SpaceHive!
        </Text>
        <Text variant="bodyLarge" style={styles.welcomeSubtitle}>
          Your account is ready to go.
        </Text>
        
        {/* SpaceHive Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.hexagonGrid}>
            <View style={[styles.hexagon, { backgroundColor: theme.colors.primary }]} />
            <View style={[styles.hexagon, { backgroundColor: theme.colors.secondary }]} />
            <View style={[styles.hexagon, { backgroundColor: theme.colors.accent }]} />
            <View style={[styles.hexagon, { backgroundColor: '#6C7B7F' }]} />
            <View style={[styles.hexagon, { backgroundColor: theme.colors.primary }]} />
            <View style={[styles.hexagon, { backgroundColor: theme.colors.secondary }]} />
          </View>
          <Text style={styles.logoText}>SPACEHIVE</Text>
        </View>
      </View>
      
      <Button
        mode="contained"
        onPress={handleGetStarted}
        style={styles.getStartedButton}
        labelStyle={styles.buttonText}
      >
        Get Started
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: theme.spacing.md,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  welcomeSubtitle: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  hexagonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  hexagon: {
    width: 30,
    height: 30,
    margin: 2,
    borderRadius: theme.borderRadius.sm,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.accent,
    letterSpacing: 2,
  },
  getStartedButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xl,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: theme.spacing.sm,
  },
});

export default LandingScreen;