// src/components/EventCategoryCard.tsx
import React from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground,
  Dimensions 
} from 'react-native';
import { Text } from 'react-native-paper';
import { EventCategory } from '../types';
import { theme } from '../theme/theme';

const { width: screenWidth } = Dimensions.get('window');

interface EventCategoryCardProps {
  category: EventCategory;
  onPress?: (category: EventCategory) => void;
}

const EventCategoryCard: React.FC<EventCategoryCardProps> = ({ 
  category, 
  onPress 
}) => {
  // Calculate responsive sizing - mobile first
  const cardSize = screenWidth > 768 ? 80 : 70; // Larger on desktop/tablet
  const imageSize = screenWidth > 768 ? 60 : 50; // Larger on desktop/tablet

  return (
    <TouchableOpacity 
      style={[styles.container, { width: cardSize }]} 
      onPress={() => onPress?.(category)}
      activeOpacity={0.7}
    >
      {/* Circular Image Container */}
      <View style={[styles.imageContainer, { 
        width: imageSize, 
        height: imageSize,
        borderRadius: imageSize / 2 
      }]}>
        <ImageBackground
          source={{ uri: category.image }}
          style={styles.imageBackground}
          imageStyle={[styles.image, { borderRadius: imageSize / 2 }]}
        >
          {/* Optional overlay for better text contrast if needed */}
          <View style={styles.imageOverlay} />
        </ImageBackground>
      </View>

      {/* Category Label */}
      <Text 
        variant="bodySmall" 
        style={styles.categoryText}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {category.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  imageContainer: {
    marginBottom: theme.spacing.sm,
    overflow: 'hidden',
    ...theme.elevation.small,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    // borderRadius is applied in the component for responsive sizing
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Subtle overlay for better image quality
  },
  categoryText: {
    textAlign: 'center',
    fontWeight: '500',
    color: theme.colors.onSurfaceVariant, // Using grey text as requested
    fontSize: 12,
    maxWidth: '100%',
  },
});

export default EventCategoryCard;