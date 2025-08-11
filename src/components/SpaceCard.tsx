// src/components/SpaceCard.tsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground, 
  Dimensions 
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

const SpaceCard: React.FC<SpaceCardProps> = ({ space, onPress }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Mock multiple images for pagination - in real app, this would come from space.images array
  const images = [
    space.image,
    space.image, // For demo purposes, using same image
    space.image, // In real implementation, you'd have space.images array
  ];

  // Auto-rotate images every 3 seconds (you can adjust this)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Calculate card width for mobile-first design
  const cardWidth = screenWidth * 0.75; // 75% of screen width for horizontal scroll
  const cardHeight = cardWidth * 0.8; // 4:5 aspect ratio

  return (
    <TouchableOpacity 
      style={[styles.card, { width: cardWidth, height: cardHeight }]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: images[currentImageIndex] }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        {/* Gradient overlay from transparent to teal at bottom */}
        <LinearGradient
          colors={['transparent', theme.colors.primary, theme.colors.primary]}
          style={styles.gradient}
          locations={[0, 1, 1]}
        >
          {/* Content at bottom */}
          <View style={styles.contentContainer}>
            {/* Pagination dots */}
            <View style={styles.paginationContainer}>
              {images.map((_, index) => (
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
                    color={theme.colors.accent} 
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
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.elevation.medium,
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
    paddingBottom: theme.spacing.lg,
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
    color: 'rgba(255, 255, 255, 0.95)', // White text for better contrast on dark gradient
    fontFamily: theme.fonts.semibold,
    fontSize: 16,
  },
  priceRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: 'rgba(255, 255, 255, 0.95)', // White text for better contrast
    fontFamily: theme.fonts.medium,
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs / 2,
  },
  rating: {
    color: 'rgba(255, 255, 255, 0.95)', // White text for better contrast
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SpaceCard;