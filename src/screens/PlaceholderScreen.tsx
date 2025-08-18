// src/screens/PlaceholderScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  Dimensions,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import BottomNavigation from '../components/BottomNavigation';
import { theme } from '../theme/theme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type PlaceholderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Placeholder'>;

interface PlaceholderScreenProps {
  navigation: PlaceholderScreenNavigationProp;
  route: {
    params: {
      activeTab: string;
    };
  };
}

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ 
  navigation, 
  route 
}) => {
  const [activeTab, setActiveTab] = useState(route.params?.activeTab || 'saved');

  useFocusEffect(
    React.useCallback(() => {
      setActiveTab(route.params?.activeTab || 'saved');
    }, [route.params?.activeTab])
  );

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    console.log('Tab pressed:', tabId);
    
    switch (tabId) {
      case 'search':
        navigation.navigate('Home');
        break;
      case 'bookings':
        navigation.navigate('Bookings');
        break;
      case 'saved':
      case 'messages':
      case 'profile':
        // Stay on placeholder screen but update active tab
        navigation.setParams({ activeTab: tabId });
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar backgroundColor={theme.colors.surface} barStyle="dark-content" />
      
      {/* Main Content - Centered */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Coming soon!</Text>
        
        {/* Under Construction Image */}
        <View style={styles.imageContainer}>
          <View style={styles.constructionSign}>
              <View style={styles.toolsContainer}>
                <Image 
                    source={require('../../assets/images/construction-tools.png')} 
                    style={styles.constructionSign}
                    />
              </View>
          </View>
        </View>
        
        {/* Description */}
        <Text style={styles.description}>
          Our team is busy building something exciting for you.
        </Text>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 120, // Account for bottom navigation
  },
  title: {
    fontSize: 32,
    fontFamily: theme.fonts.bold,
    color: theme.colors.onSurface,
    textAlign: 'center',
    marginBottom: theme.spacing.xl * 2,
    lineHeight: 38,
  },
  imageContainer: {
    marginBottom: theme.spacing.xl * 2,
    alignItems: 'center',
  },
  constructionSign: {
    width: screenWidth * 0.7,
    height: screenWidth * 0.7,
    maxWidth: 300,
    maxHeight: 300,
    minWidth: 160,
    minHeight: 160,
  },
  constructionText: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#000000',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: theme.spacing.sm,
  },
  toolsContainer: {
    marginTop: theme.spacing.xs,
  },
  toolsIcon: {
    fontSize: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: screenWidth * 0.8,
  },
});

export default PlaceholderScreen;