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

const SpaceCard: React.FC<SpaceCardProps> = ({ space, onPress }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Mock multiple images for pagination - in real app, this would come from space.images array
  const images = space.images;

  // Auto-rotate images every 3 seconds (you can adjust this)
  useEffect(() => {
  if (images.length > 1) {
    // 🚀 Preload next image before switching
    const preloadAndSwitch = () => {
      const nextIndex = (currentImageIndex + 1) % images.length;
      
      // Preload next image
      const nextImageUri = Image.resolveAssetSource(images[nextIndex]).uri;
      Image.prefetch(nextImageUri).then(() => {
        // Only switch after preloading
        setCurrentImageIndex(nextIndex);
      }).catch(() => {
        // Fallback: switch anyway if preload fails
        setCurrentImageIndex(nextIndex);
      });
    };

    const interval = setInterval(preloadAndSwitch, 15000);
    return () => clearInterval(interval);
  }
}, [images, currentImageIndex]);

  useEffect(() => {
    // Preload all images when component mounts
    const preloadAllImages = async () => {
      try {
        const preloadPromises = images.map(imageSource => {
          const uri = Image.resolveAssetSource(imageSource).uri;
          return Image.prefetch(uri);
        });
        await Promise.all(preloadPromises);
      } catch (error) {
        console.warn('Image preloading failed:', error);
      }
    };

    preloadAllImages();
  }, [images]);

  // Calculate card width for mobile-first design
  const cardWidth = screenWidth * 0.5; 
  const cardHeight = cardWidth * 1; 
  return (
    <TouchableOpacity 
      style={[styles.card, { width: cardWidth, height: cardHeight }]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={images[currentImageIndex]}
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
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
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
    fontFamily: theme.fonts.semibold,
  },
});

export default SpaceCard;