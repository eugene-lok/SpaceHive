// src/components/IdeaCard.tsx
import React from 'react';
import { 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground, 
  Platform,
  Dimensions
} from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme/theme';

export interface IdeaCardData {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  tag: string;
}

interface IdeaCardProps {
  idea: IdeaCardData;
  onPress?: () => void;
}

const { width: screenWidth } = Dimensions.get('window');

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onPress }) => {
  const cardWidth = screenWidth * 0.7; 
  const cardHeight = cardWidth * 0.8; 

  const getTagStyle = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'hot':
        return styles.hotTag;
      case 'new':
      default:
        return styles.newTag;
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.card, { width: cardWidth, height: cardHeight }]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <ImageBackground
        source={{ uri: idea.image }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        {/* Tag in top left */}
        <View style={styles.tagContainer}>
          <View style={[styles.tag, getTagStyle(idea.tag)]}>
            <Text style={styles.tagText}>{idea.tag}</Text>
          </View>
        </View>

        {/* Gradient overlay */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
          locations={[0, 0.6, 1]}
        >
          {/* Content at bottom left */}
          <View style={styles.contentContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {idea.title}
            </Text>
           {/*  {idea.subtitle && (
              <Text style={styles.subtitle} numberOfLines={1}>
                {idea.subtitle}
              </Text>
            )} */}
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
    // Platform-specific shadow
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
  tagContainer: {
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.md,
    zIndex: 2,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  newTag: {
    backgroundColor: theme.colors.accent,
    borderColor: '#000',
  },
  hotTag: {
    backgroundColor: theme.colors.accent,
    borderColor: '#000',
  },
  tagText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 18,
    fontFamily: theme.fonts.medium,
    color: '#ffffff',
    marginBottom: theme.spacing.xs,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
  },
});

export default IdeaCard;