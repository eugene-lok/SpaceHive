// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Chip } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Space, PlanningOption } from '../types';
import SearchBar from '../components/SearchBar';
import SpaceCard from '../components/SpaceCard';
import BottomNavigation from '../components/BottomNavigation';
import { theme } from '../theme/theme';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

// Mock data - 4 cards matching the Figma design
const trendingSpaces: Space[] = [
  {
    id: 1,
    title: 'Modern Condo with Skyline View',
    price: '$35 hour',
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    location: 'Downtown, Calgary',
  },
  {
    id: 2,
    title: 'Bright Room with Balcony',
    price: '$30 hour',
    rating: 4.66,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    location: 'Kensington, Calgary',
  },
  {
    id: 3,
    title: 'Upscale Meeting Room',
    price: '$40 hour',
    rating: 4.70,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    location: 'Beltline, Calgary',
  },
  {
    id: 4,
    title: 'Sunlit Garden Room with Plants',
    price: '$28 hour',
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=300&fit=crop',
    location: 'Hillhurst, Calgary',
  }
];

const justForYouSpaces: Space[] = [
  {
    id: 5,
    title: 'Cozy Living Room',
    price: '$32 hour',
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    location: 'Mission, Calgary',
  },
  {
    id: 6,
    title: 'Modern Office Space',
    price: '$45 hour',
    rating: 4.91,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    location: 'Eau Claire, Calgary',
  }
];

const planningOptions: PlanningOption[] = [
  { id: 1, title: 'Party', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=150&h=150&fit=crop' },
  { id: 2, title: 'Anniversary', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=150&h=150&fit=crop' },
  { id: 3, title: 'Hobby Club', image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=150&h=150&fit=crop' },
  { id: 4, title: 'Work', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&h=150&fit=crop' }
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('search');

  // Handler for when the search button is pressed
  const handleSearchPress = () => {
    console.log('Search button pressed - navigating to search screen');
    // TODO: Navigate to search/planning screen when implemented
    // navigation.navigate('SearchScreen');
  };

  const handleSpacePress = (space: Space) => {
    console.log('Space pressed:', space.title);
    // Navigate to space details
  };

  const handleMessageHost = (space: Space) => {
    console.log('Message host for:', space.title);
    // Navigate to messaging
  };

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    console.log('Tab pressed:', tabId);
    
    // Future navigation logic for different tabs
    switch (tabId) {
      case 'search':
        // Already on home/search screen
        break;
      case 'bookings':
        // Navigate to bookings screen
        console.log('Navigate to Bookings');
        break;
      case 'saved':
        // Navigate to saved/favorites screen
        console.log('Navigate to Saved');
        break;
      case 'messages':
        // Navigate to messages screen
        console.log('Navigate to Messages');
        break;
      case 'profile':
        // Navigate to profile screen
        console.log('Navigate to Profile');
        break;
      default:
        break;
    }
  };

  const renderPlanningOption = ({ item }: { item: PlanningOption }) => (
    <View style={styles.planningOption}>
      <View style={styles.planningImagePlaceholder} />
      <Text variant="bodySmall" style={styles.planningText}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <SearchBar />
        
        {/* What are you planning? */}
        <View style={styles.section}>
          <Text variant="headlineSmall" style={styles.sectionTitle}>
            What are you planning?
          </Text>
          <FlatList
            data={planningOptions}
            renderItem={renderPlanningOption}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>
        
        {/* Trending Spaces */}
        <View style={styles.section}>
          <Text variant="headlineSmall" style={styles.sectionTitle}>
            Trending in your area
          </Text>
          <FlatList
            data={trendingSpaces}
            renderItem={({ item }) => (
              <SpaceCard
                space={item}
                onPress={() => handleSpacePress(item)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>
        
        {/* Just for you */}
        <View style={styles.section}>
          <Text variant="headlineSmall" style={styles.sectionTitle}>
            Just for you
          </Text>
          <FlatList
            data={justForYouSpaces}
            renderItem={({ item }) => (
              <SpaceCard
                space={item}
                onPress={() => handleSpacePress(item)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
      
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
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginVertical: theme.spacing.md,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: theme.colors.onSurface,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  horizontalList: {
    paddingHorizontal: theme.spacing.md,
  },
  planningOption: {
    alignItems: 'center',
    marginRight: theme.spacing.md,
    width: 80,
  },
  planningImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surfaceVariant,
    marginBottom: theme.spacing.sm,
  },
  planningText: {
    textAlign: 'center',
    fontWeight: '500',
    color: theme.colors.onSurface,
  },
  bottomSpacer: {
    height: 100, // Space for bottom navigation
  },
});

export default HomeScreen;