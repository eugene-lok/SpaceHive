// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { Space, EventCategory } from '../types';
import SearchBar from '../components/SearchBar';
import SpaceCard from '../components/SpaceCard';
import IdeaCard from '../components/IdeaCard';
import EventCategoryCard from '../components/EventCategoryCard';
import BottomNavigation from '../components/BottomNavigation';
import BookingOptionsScreen from './search/BookingOptionsScreen';
import BookingFormScreen from './search/BookingFormScreen';
import { theme } from '../theme/theme';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
interface Props {
  navigation: HomeScreenNavigationProp;
}
interface IdeaCardData {
  id: number;
  title: string;
  subtitle?: string;
  image: any;
  tag: string;
}

// Mock data for event categories (filter buttons)
const eventCategories: EventCategory[] = [
  {
    id: 1,
    title: 'Party',
    image: require('../../assets/images/EventCategories/party.jpg'),
  },
  {
    id: 2,
    title: 'Anniversary',
    image: require('../../assets/images/EventCategories/anniversary.jpg'),
  },
  {
    id: 3,
    title: 'Hobby Club',
    image: require('../../assets/images/EventCategories/hobbyclub.jpg'),
  },
  {
    id: 4,
    title: 'Workshop',
    image: require('../../assets/images/EventCategories/workshop.jpg'),
  },
  {
    id: 5,
    title: 'Meeting',
    image: require('../../assets/images/EventCategories/meeting.jpg'),
  },
  {
    id: 6,
    title: 'Pop-up',
    image: require('../../assets/images/EventCategories/popup.jpg'),
  },
];

// Mock data - 4 cards matching the Figma design
const trendingSpaces: Space[] = [
  {
    id: 1,
    title: 'Modern Condo with Skyline View',
    price: '$35 hour',
    rating: 4.92,
    images: [
      require('../../assets/images/TrendingSpaces/ModernCondo/pexels-heyho-6890392.jpg'),
      require('../../assets/images/TrendingSpaces/ModernCondo/pexels-heyho-6890394.jpg'),
      require('../../assets/images/TrendingSpaces/ModernCondo/pexels-heyho-6890395.jpg'),
    ],
    location: 'Downtown, Calgary',
    capacity: 8,
    instantBooking: true,
  },
  {
    id: 2,
    title: 'Bright Room with Balcony',
    price: '$30 hour',
    rating: 4.66,
    images: [
      require('../../assets/images/TrendingSpaces/BrightRoom/pexels-rachel-claire-5490295.jpg'),
      require('../../assets/images/TrendingSpaces/BrightRoom/pexels-rachel-claire-5490363.jpg'),
      require('../../assets/images/TrendingSpaces/BrightRoom/pexels-rachel-claire-5490364.jpg'),
    ],
    location: 'Kensington, Calgary',
    capacity: 6,
    instantBooking: false,
  },
  {
    id: 3,
    title: 'Upscale Meeting Room',
    price: '$28 hour',
    rating: 4.85,
    images: [
      require('../../assets/images/TrendingSpaces/UpscaleMeeting/pexels-ansar-muhammad-380085065-27562206.jpg'),
      require('../../assets/images/TrendingSpaces/UpscaleMeeting/pexels-ansar-muhammad-380085065-27562207.jpg'),
      require('../../assets/images/TrendingSpaces/UpscaleMeeting/pexels-ansar-muhammad-380085065-27562218.jpg'),
    ],
    location: 'Beltline, Calgary',
    capacity: 10,
    instantBooking: true,
  },
];

const justForYouSpaces: Space[] = [
  {
    id: 5,
    title: 'Higher Ground Cafe',
    price: '$32 hour',
    rating: 4.85,
    images: [
      require('../../assets/images/JustForYou/HigherGroundCafe/pexels-rachel-claire-5490827.jpg'),
      require('../../assets/images/JustForYou/HigherGroundCafe/pexels-rachel-claire-5490830.jpg'),
      require('../../assets/images/JustForYou/HigherGroundCafe/pexels-rachel-claire-5865071.jpg'),
    ],
    location: 'Mission, Calgary',
  },
  {
    id: 6,
    title: 'Rooftop Gathering Spot',
    price: '$45 hour',
    rating: 4.91,
    images: [
      require('../../assets/images/JustForYou/RooftopGatheringSpot/pexels-heyho-7546603.jpg'),
      require('../../assets/images/JustForYou/RooftopGatheringSpot/pexels-heyho-7546605.jpg'),
      require('../../assets/images/JustForYou/RooftopGatheringSpot/pexels-heyho-7546778.jpg'),
    ],
    location: 'Eau Claire, Calgary',
  },
  {
    id: 7,
    title: 'Sunlit Garden House',
    price: '$32 hour',
    rating: 4.85,
    images: [
      require('../../assets/images/JustForYou/SunlitGardenHouse/pexels-curtis-adams-1694007-5008400.jpg'),
      require('../../assets/images/JustForYou/SunlitGardenHouse/pexels-heyho-7061660.jpg'),
      require('../../assets/images/JustForYou/SunlitGardenHouse/pexels-heyho-7061663.jpg'),
    ],
    location: 'Mission, Calgary',
  },
];

const ideaCards: IdeaCardData[] = [
  {
    id: 1,
    title: '5 Hidden Gems for Your Next Birthday',
    subtitle: 'Unique venues you haven\'t discovered yet',
    image: require('../../assets/images/Blog/birthday.jpg'),
    tag: 'New',
  },
  {
    id: 2,
    title: 'Spaces With Killer Views Under $30/Hour',
    subtitle: 'Budget-friendly options that don\'t compromise on style',
    image: require('../../assets/images/Blog/cityviewkiller.jpg'),
    tag: 'Hot',
  },
  {
    id: 3,
    title: 'Perfect Last Minute Meeting Rooms',
    subtitle: 'Professional venues for your next big presentation',
    image: require('../../assets/images/Blog/meetingroom.jpg'),
    tag: 'New',
  },
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('search');
  const [bookingFormInitialTab, setBookingFormInitialTab] = useState<'instant-book' | 'match-request'>('instant-book');
  const [formInitialTab, setFormInitialTab] = useState<'instant-book' | 'match-request'>('instant-book');
  const [showBookingFlow, setShowBookingFlow] = useState(false);
  const [bookingStep, setBookingStep] = useState<'options' | 'form'>('options');

  useFocusEffect(
    React.useCallback(() => {
      setActiveTab('search');
    }, [])
  );

  const handleSearchBarPress = () => {
    setShowBookingFlow(true);
    setBookingStep('options');
  };

  const handleBookRightAway = () => {
    setFormInitialTab('instant-book');
    setBookingStep('form');
  };

  const handleRequestMatch = () => {
    setFormInitialTab('match-request');
    setBookingStep('form');
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

  const handleIdeaPress = (idea: IdeaCardData) => {
    console.log('Idea pressed:', idea.title);
    // Navigate to idea details or open relevant content
  };

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
      navigation.navigate('Placeholder', { activeTab: 'saved' });
      break;
    case 'messages':
      navigation.navigate('Placeholder', { activeTab: 'messages' });
      break;
    case 'profile':
      navigation.navigate('Placeholder', { activeTab: 'profile' });
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

        {/* Available this week */}
        {/* <View style={styles.section}>
          <Text variant="headlineSmall" style={styles.sectionTitle}>
            Available this week
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
        </View> */}

        {/* Need Ideas? */}
        <View style={styles.section}>
          <Text variant="headlineSmall" style={styles.sectionTitle}>
            Need Ideas?
          </Text>
          <FlatList
            data={ideaCards}
            renderItem={({ item }) => (
              <IdeaCard
                idea={item}
                onPress={() => handleIdeaPress(item)}
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
              initialTab={formInitialTab}
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
    fontFamily: theme.fonts.semibold,
    color: theme.colors.onSurface,
    marginHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
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