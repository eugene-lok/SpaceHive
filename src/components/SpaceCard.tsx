// src/components/SpaceCard.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground, 
  Dimensions,
  Platform,
  Image
} from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Space } from '../types';
import { theme } from '../theme/theme';

interface SpaceCardProps {
  space: Space;
  onPress?: () => void;
}

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth * 0.8;
const cardHeight = 280;

const SpaceCard: React.FC<SpaceCardProps> = ({ space, onPress }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % space.images.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [space.images.length]);

  return (
    // Shadow wrapper - handles shadows and positioning
    <View style={styles.shadowContainer}>
      <TouchableOpacity 
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <ImageBackground
          source={space.images[currentImageIndex]}
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          >
            <View style={styles.contentContainer}>
              {/* Pagination dots */}
              <View style={styles.paginationContainer}>
                {space.images.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.paginationDot,
                      index === currentImageIndex ? 
                        styles.paginationDotActive : 
                        styles.paginationDotInactive
                    ]}
                  />
                ))}
              </View>

              {/* Space information */}
              <View style={styles.textContainer}>
                {/* Space name with ellipsis */}
                <Text 
                  variant="titleMedium" 
                  style={styles.spaceName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {space.title}
                </Text>

                {/* Price and rating row */}
                <View style={styles.priceRatingRow}>
                  <Text variant="bodyMedium" style={styles.price}>
                    {space.price}
                  </Text>
                  
                  <View style={styles.ratingContainer}>
                    <MaterialIcons 
                      name="star" 
                      size={16} 
                      color={theme.colors.buttonDisabled} 
                    />
                    <Text variant="bodyMedium" style={styles.rating}>
                      {space.rating}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // NEW: Shadow container that doesn't clip shadows
  shadowContainer: {
    marginRight: theme.spacing.md,
    width: cardWidth,
    height: cardHeight,
    // Apply shadows to the wrapper
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        shadowColor: theme.colors.shadowDark,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  card: {
    flex: 1,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden', // Now safe to use since shadows are on wrapper
    backgroundColor: 'transparent', // Ensure no background interferes
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    borderRadius: theme.borderRadius.md,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  paginationDotActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  paginationDotInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  textContainer: {
    gap: theme.spacing.xs,
  },
  spaceName: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontFamily: theme.fonts.semibold,
    fontSize: 16,
  },
  priceRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontFamily: theme.fonts.medium,
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs / 2,
  },
  rating: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 14,
    fontFamily: theme.fonts.semibold,
  },
});

export default SpaceCard;