// src/screens/HomeScreen.tsx
import { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { Space, EventCategory } from '../types';
import SearchBar from '../components/SearchBar';
import SpaceCard from '../components/SpaceCard';
import EventCategoryCard from '../components/EventCategoryCard';
import BottomNavigation from '../components/BottomNavigation';
import BookingOptionsScreen from './booking/BookingOptionsScreen';
import BookingFormScreen from './booking/BookingFormScreen';
import { theme } from '../theme/theme';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

// Mock data for event categories (filter buttons)
const eventCategories: EventCategory[] = [
  {
    id: 1,
    title: 'Party',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=400&fit=crop&crop=center',
  },
  {
    id: 2,
    title: 'Anniversary',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&h=400&fit=crop&crop=center',
  },
  {
    id: 3,
    title: 'Hobby Club',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=300&h=400&fit=crop&crop=center',
  },
  {
    id: 4,
    title: 'Workshop',
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=300&h=400&fit=crop&crop=center',
  },
  {
    id: 5,
    title: 'Meeting',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=300&h=400&fit=crop&crop=center',
  },
  {
    id: 6,
    title: 'Pop-up',
    image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=300&h=400&fit=crop&crop=center',
  },
];

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

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('search');

  const [showBookingFlow, setShowBookingFlow] = useState(false);
  const [bookingStep, setBookingStep] = useState<'options' | 'form'>('options');

  const handleSearchBarPress = () => {
    setShowBookingFlow(true);
    setBookingStep('options');
  };

  const handleBookRightAway = () => {
    setBookingStep('form');
  };

  const handleRequestMatch = () => {
    // Placeholder for future implementation
    console.log('Request a Match - Coming Soon!');
  };

  const handleCloseBookingFlow = () => {
    setShowBookingFlow(false);
  };

  const handleSpacePress = (space: Space) => {
    console.log('Space selected:', space.id);
  };

  const handleCategoryPress = (category: EventCategory) => {
    console.log('Category selected:', category.title);
    // TODO: Implement filtering logic here
    // This would filter the spaces based on the selected category
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <SearchBar onPress={handleSearchBarPress} />
        
        {/* What are you planning? - Event Categories */}
        <View style={styles.section}>
          <Text variant="headlineSmall" style={styles.sectionTitle}>
            What are you planning?
          </Text>
          <FlatList
            data={eventCategories}
            renderItem={({ item }) => (
              <EventCategoryCard
                category={item}
                onPress={handleCategoryPress}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
          />
        </View>
        
        {/* Trending Spaces */}
        <View style={styles.section}>
          <Text variant="headlineSmall" style={styles.sectionTitle}>
            Trending spaces
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
        {showBookingFlow && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000 }}>
            {bookingStep === 'options' && (
              <BookingOptionsScreen
                onBookRightAway={handleBookRightAway}
                onRequestMatch={handleRequestMatch}
                onClose={handleCloseBookingFlow}
              />
            )}
            {bookingStep === 'form' && (
              <BookingFormScreen
                onBack={() => setBookingStep('options')}
                onClose={handleCloseBookingFlow}
              />
            )}
  </View>
)}
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
    marginVertical: 2, 
  },
  sectionTitle: {
    fontFamily: theme.fonts.bold,
    color: theme.colors.onSurface,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    marginTop: 2, 
  },
  horizontalList: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.lg, 
  },
  bottomSpacer: {
    height: 50, 
  },
});

export default HomeScreen;