import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, Button, IconButton } from 'react-native-paper';
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
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=600&fit=crop',
    title: 'Discover what\'s nearby.',
    subtitle: 'Start browsing nearby spaces or share your\nown with the SpaceHive community.'
  }
];

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef<FlatList>(null);

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
      <View style={styles.imageContainer}>
        {/* Background image would be implemented with ImageBackground */}
        <View style={styles.imagePlaceholder} />
      </View>
      <View style={styles.overlay}>
        <View style={styles.topSection}>
          <IconButton
            icon={() => <MaterialIcons name="close" size={24} color="white" />}
            onPress={handleSkip}
            style={styles.closeButton}
          />
        </View>
        
        <View style={styles.content}>
          <Text variant="headlineLarge" style={styles.title}>
            {item.title}
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            {item.subtitle}
          </Text>
          
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
              icon={() => currentPage === onboardingData.length - 1 
                ? <Text style={styles.exploreText}>Explore</Text>
                : <MaterialIcons name="arrow-forward" size={20} color="white" />
              }
              onPress={handleNext}
              style={styles.nextButton}
            />
          </View>
        </View>
      </View>
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
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const page = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
          setCurrentPage(page);
        }}
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
  imageContainer: {
    flex: 1,
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: '#333',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  topSection: {
    alignItems: 'flex-end',
    paddingTop: theme.spacing.lg,
  },
  closeButton: {
    margin: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 22,
  },
  bottomSection: {
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
    backgroundColor: theme.colors.accent,
  },
  paginationDotInactive: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  nextButton: {
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 0,
  },
  exploreText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default OnboardingScreen;