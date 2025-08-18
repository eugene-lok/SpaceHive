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
  const cardWidth = screenWidth > 768 ? 100 : 85; // Larger on desktop/tablet
  const cardHeight = screenWidth > 768 ? 120 : 100; // Aspect ratio maintained

  return (
    <TouchableOpacity 
      style={[styles.container, { width: cardWidth, height: cardHeight }]} 
      onPress={() => onPress?.(category)}
      activeOpacity={0.8}
    >
      <ImageBackground
        source={category.image} 
        style={styles.imageBackground}
        imageStyle={styles.image}
        resizeMode="cover"
      >
        {/* White overlay at bottom for text */}
        <View style={styles.textOverlay}>
          <Text 
            variant="bodySmall" 
            style={styles.categoryText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {category.title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    ...theme.elevation.small,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: theme.borderRadius.md,
  },
  textOverlay: {
    backgroundColor: 'rgba(255, 255, 255, 1)', 
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    width: '100%',
  },
  categoryText: {
    textAlign: 'center',
    fontFamily: theme.fonts.semibold,
    color: theme.colors.onSurface,
    fontSize: 12,
    lineHeight: 14,
  },
});

export default EventCategoryCard;