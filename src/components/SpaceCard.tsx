// src/components/SpaceCard.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Button, Chip } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Space } from '../types';
import { theme } from '../theme/theme';

interface SpaceCardProps {
  space: Space;
  onPress?: () => void;
  onMessageHost?: () => void;
  showActions?: boolean;
}

const SpaceCard: React.FC<SpaceCardProps> = ({ 
  space, 
  onPress, 
  onMessageHost, 
  showActions = true 
}) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover source={{ uri: space.image }} style={styles.cardImage} />
      
      {space.instantBooking && (
        <Chip 
          style={styles.instantBookingChip}
          textStyle={styles.chipText}
          mode="flat"
        >
          Instant Booking
        </Chip>
      )}
      
      <Card.Content style={styles.cardContent}>
        <Text variant="titleMedium" style={styles.title} numberOfLines={1}>
          {space.title}
        </Text>
        
        {space.location && (
          <Text variant="bodySmall" style={styles.location}>
            {space.location}
          </Text>
        )}
        
        <View style={styles.ratingPriceRow}>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color={theme.colors.accent} />
            <Text variant="bodySmall" style={styles.rating}>
              {space.rating}
            </Text>
          </View>
          
          <Text variant="titleSmall" style={styles.price}>
            {space.price}
          </Text>
        </View>
        
        {showActions && (
          <View style={styles.actionButtons}>
            <Button
              mode="outlined"
              onPress={onMessageHost}
              style={[styles.button, styles.outlineButton]}
              labelStyle={styles.outlineButtonText}
              compact
            >
              Message Host
            </Button>
            <Button
              mode="contained"
              onPress={onPress}
              style={[styles.button, styles.containedButton]}
              labelStyle={styles.containedButtonText}
              compact
            >
              View Details
            </Button>
          </View>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    elevation: 2,
    backgroundColor: theme.colors.surface,
  },
  cardImage: {
    height: 180,
    borderTopLeftRadius: theme.borderRadius.md,
    borderTopRightRadius: theme.borderRadius.md,
  },
  instantBookingChip: {
    position: 'absolute',
    top: theme.spacing.md,
    left: theme.spacing.md,
    backgroundColor: theme.colors.accent,
    zIndex: 1,
  },
  chipText: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    padding: theme.spacing.md,
  },
  title: {
    fontWeight: '600',
    marginBottom: theme.spacing.xs,
    color: theme.colors.onSurface,
  },
  location: {
    color: '#666',
    marginBottom: theme.spacing.sm,
  },
  ratingPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: theme.spacing.xs,
    color: '#666',
  },
  price: {
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  button: {
    flex: 1,
    borderRadius: theme.borderRadius.sm,
  },
  outlineButton: {
    borderColor: theme.colors.outline,
  },
  outlineButtonText: {
    color: theme.colors.onSurface,
    fontSize: 12,
  },
  containedButton: {
    backgroundColor: theme.colors.onSurface,
  },
  containedButtonText: {
    color: theme.colors.surface,
    fontSize: 12,
  },
});

export default SpaceCard;