import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

// Mock data for spaces
const trendingSpaces = [
  {
    id: 1,
    title: 'Modern Condo with Sk...',
    price: '$35 hour',
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    title: 'Bright Room with Ba...',
    price: '$30 hour',
    rating: 4.86,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop'
  }
];

const justForYouSpaces = [
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'
  }
];

const planningOptions = [
  { id: 1, title: 'Party', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=150&h=150&fit=crop' },
  { id: 2, title: 'Anniversary', image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=150&h=150&fit=crop' },
  { id: 3, title: 'Hobby Club', image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=150&h=150&fit=crop' },
  { id: 4, title: 'Work', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=150&h=150&fit=crop' }
];

// Landing Page Component
const LandingPage = ({ onGetStarted }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <TouchableOpacity style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      
      <View style={styles.centerContent}>
        <Text style={styles.welcomeTitle}>Welcome to SpaceHive!</Text>
        <Text style={styles.welcomeSubtitle}>Your account is ready to go.</Text>
        
        {/* SpaceHive Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.hexagonGrid}>
            <View style={[styles.hexagon, { backgroundColor: '#4A90A4' }]} />
            <View style={[styles.hexagon, { backgroundColor: '#5BA4B0' }]} />
            <View style={[styles.hexagon, { backgroundColor: '#F4D03F' }]} />
            <View style={[styles.hexagon, { backgroundColor: '#6C7B7F' }]} />
            <View style={[styles.hexagon, { backgroundColor: '#4A90A4' }]} />
            <View style={[styles.hexagon, { backgroundColor: '#5BA4B0' }]} />
          </View>
          <Text style={styles.logoText}>SPACEHIVE</Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.getStartedButton} onPress={onGetStarted}>
        <Text style={styles.getStartedText}>Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Onboarding Component
const OnboardingScreen = ({ onComplete, onSkip }) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const onboardingData = [
    {
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=600&fit=crop',
      title: 'Find your space.',
      subtitle: 'Browse curated spaces for any occasion —\nquick, easy, and tailored to you.'
    },
    {
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop',
      title: 'Rent your way.',
      subtitle: 'Flexible, affordable rentals made simple —\nbook by the hour or day.'
    },
    {
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=600&fit=crop',
      title: 'Discover what\'s nearby.',
      subtitle: 'Start browsing nearby spaces or share your\nown with the SpaceHive community.'
    }
  ];

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  return (
    <View style={styles.onboardingContainer}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <Image 
        source={{ uri: onboardingData[currentPage].image }}
        style={styles.onboardingImage}
      />
      
      <View style={styles.onboardingOverlay}>
        <TouchableOpacity style={styles.closeButton}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.backButtonOnboarding}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <View style={styles.onboardingContent}>
          <Text style={styles.onboardingTitle}>{onboardingData[currentPage].title}</Text>
          <Text style={styles.onboardingSubtitle}>{onboardingData[currentPage].subtitle}</Text>
          
          <View style={styles.onboardingBottom}>
            <TouchableOpacity onPress={onSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
            
            <View style={styles.paginationContainer}>
              {onboardingData.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    index === currentPage ? styles.paginationDotActive : styles.paginationDotInactive
                  ]}
                />
              ))}
            </View>
            
            <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
              {currentPage === onboardingData.length - 1 ? (
                <Text style={styles.exploreNowText}>Explore Now</Text>
              ) : (
                <Ionicons name="arrow-forward" size={20} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// Main Home Screen Component
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <ScrollView style={styles.homeScrollView}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              placeholder="Plan your next gathering — start here!"
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* What are you planning? */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What are you planning?</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {planningOptions.map((option) => (
              <TouchableOpacity key={option.id} style={styles.planningOption}>
                <Image source={{ uri: option.image }} style={styles.planningImage} />
                <Text style={styles.planningText}>{option.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Trending Spaces */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending spaces</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {trendingSpaces.map((space) => (
              <TouchableOpacity key={space.id} style={styles.trendingSpace}>
                <Image source={{ uri: space.image }} style={styles.trendingImage} />
                <View style={styles.trendingOverlay}>
                  <Text style={styles.trendingTitle}>{space.title}</Text>
                  <View style={styles.trendingInfo}>
                    <Text style={styles.trendingPrice}>{space.price}</Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={12} color="#FFD700" />
                      <Text style={styles.ratingText}>{space.rating}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Just for you */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Just for you</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {justForYouSpaces.map((space) => (
              <TouchableOpacity key={space.id} style={styles.justForYouSpace}>
                <Image source={{ uri: space.image }} style={styles.justForYouImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
      
      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.navItemActive]}>
          <Ionicons name="search" size={24} color="#4A90A4" />
          <Text style={[styles.navText, styles.navTextActive]}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#999" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Main App Component
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('landing'); // 'landing', 'onboarding', 'home'

  const handleGetStarted = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('home');
  };

  const handleSkipOnboarding = () => {
    setCurrentScreen('home');
  };

  if (currentScreen === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (currentScreen === 'onboarding') {
    return (
      <OnboardingScreen 
        onComplete={handleOnboardingComplete}
        onSkip={handleSkipOnboarding}
      />
    );
  }

  return <HomeScreen />;
};

const styles = StyleSheet.create({
  // Landing Page Styles
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 16,
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
    marginBottom: 20,
  },
  hexagon: {
    width: 30,
    height: 30,
    margin: 2,
    borderRadius: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4D03F',
    letterSpacing: 2,
  },
  getStartedButton: {
    backgroundColor: '#4A90A4',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 40,
  },
  getStartedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },

  // Onboarding Styles
  onboardingContainer: {
    flex: 1,
  },
  onboardingImage: {
    width: screenWidth,
    height: '100%',
    position: 'absolute',
  },
  onboardingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  backButtonOnboarding: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
  },
  onboardingContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  onboardingTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  onboardingSubtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 22,
  },
  onboardingBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  paginationContainer: {
    flexDirection: 'row',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#F4D03F',
  },
  paginationDotInactive: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  nextButton: {
    backgroundColor: '#4A90A4',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exploreNowText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // Home Screen Styles
  homeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  homeScrollView: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#4A90A4',
    padding: 8,
    borderRadius: 8,
  },
  section: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 20,
    marginBottom: 16,
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  planningOption: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  planningImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginBottom: 8,
  },
  planningText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  trendingSpace: {
    width: 200,
    height: 200,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  trendingImage: {
    width: '100%',
    height: '100%',
  },
  trendingOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
  },
  trendingTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  trendingInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trendingPrice: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
  },
  justForYouSpace: {
    width: 160,
    height: 120,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0',
  },
  justForYouImage: {
    width: '100%',
    height: '100%',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navItemActive: {
    backgroundColor: 'rgba(74, 144, 164, 0.1)',
    borderRadius: 8,
  },
  navText: {
    fontSize: 10,
    marginTop: 4,
  },
  navTextActive: {
    color: '#4A90A4',
    fontWeight: '600',
  },
});

export default App;