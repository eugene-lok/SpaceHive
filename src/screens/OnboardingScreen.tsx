// src/screens/OnboardingScreen.tsx
import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { OnboardingData } from '../types';
import { theme } from '../theme/theme';

const { width: screenWidth } = Dimensions.get('window');

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

const onboardingData: OnboardingData[] = [
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
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=600&fit=crop',
    title: 'Discover what\'s nearby.',
    subtitle: 'Start browsing nearby spaces or share your\nown with the SpaceHive community.'
  }
];

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  const isLastPage = currentPage === onboardingData.length - 1;

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      flatListRef.current?.scrollToIndex({ index: nextPage, animated: true });
    } else {
      navigation.navigate('Home');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Home');
  };

  const renderOnboardingItem = ({ item }: { item: OnboardingData }) => (
    <View style={styles.slide}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {/* Top Section - Hide close button on last page */}
          <View style={styles.topSection}>
            {!isLastPage && (
              <IconButton
                icon={() => <MaterialIcons name="close" size={24} color="white" />}
                onPress={handleSkip}
                style={styles.closeButton}
              />
            )}
          </View>
          
          {/* Content */}
          <View style={styles.content}>
            <Text variant="headlineLarge" style={styles.title}>
              {item.title}
            </Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
              {item.subtitle}
            </Text>
            
            {/* Pagination Dots - Centered for last page, otherwise in navigation row */}
            {isLastPage ? (
              <View style={styles.paginationContainerCentered}>
                {onboardingData.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      index === currentPage 
                        ? styles.paginationDotActive 
                        : styles.paginationDotInactive
                    ]}
                  />
                ))}
              </View>
            ) : (
              /* Navigation Section - Only for first two pages */
              <View style={styles.bottomSection}>
                <TouchableOpacity onPress={handleSkip}>
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
                
                <View style={styles.paginationContainer}>
                  {onboardingData.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.paginationDot,
                        index === currentPage 
                          ? styles.paginationDotActive 
                          : styles.paginationDotInactive
                      ]}
                    />
                  ))}
                </View>
                
                <IconButton
                  icon={() => <MaterialIcons name="arrow-forward" size={20} color="white" />}
                  onPress={handleNext}
                  style={styles.nextButton}
                />
              </View>
            )}
          </View>
          
          {/* Large Explore Now Button - Only on last page */}
          {isLastPage && (
            <View style={styles.exploreButtonContainer}>
              <TouchableOpacity onPress={handleNext} style={styles.exploreButton}>
                <Text style={styles.exploreButtonText}>Explore Now</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderOnboardingItem}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  slide: {
    width: screenWidth,
    height: '100%',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  topSection: {
    alignItems: 'flex-end',
    paddingTop: theme.spacing.lg,
    minHeight: 60, // Reserve space even when button is hidden
  },
  closeButton: {
    margin: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    fontSize: 28,
    lineHeight: 34,
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 22,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  
  /* Navigation for first two pages */
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,
  },
  skipText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    padding: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: theme.colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    margin: 0,
  },
  
  /* Centered pagination for last page */
  paginationContainerCentered: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  
  /* Larger pagination dots */
  paginationDot: {
    width: 12,        // ✨ Increased from 8px
    height: 12,       // ✨ Increased from 8px  
    borderRadius: 6,  // ✨ Increased from 4px
    marginHorizontal: 6, // ✨ Increased spacing
  },
  paginationDotActive: {
    backgroundColor: theme.colors.accent,
  },
  paginationDotInactive: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  
  /* Large Explore Now Button */
  exploreButtonContainer: {
    paddingBottom: theme.spacing.xl,
    paddingHorizontal: 0, // Use full width
  },
  exploreButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    height: 56, // Same as Get Started button
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0, // Full width within container
  },
  exploreButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.background,
  },
});

export default OnboardingScreen;