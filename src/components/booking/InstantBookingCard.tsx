// src/components/booking/InstantBookingCard.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Location } from '../../types/instantBooking';
import { theme } from '../../theme/theme';

interface InstantBookingCardProps {
  location: Location;
  onPress: (location: Location) => void;
}

const InstantBookingCard: React.FC<InstantBookingCardProps> = ({
  location,
  onPress,
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(location)}
      activeOpacity={0.95}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: location.image }} style={styles.image} />
        <TouchableOpacity style={styles.heartButton}>
          <MaterialIcons name="favorite-border" size={20} color="#fff" />
        </TouchableOpacity>
        <View style={styles.instantBookingBadge}>
          <Text style={styles.badgeText}>Instant Booking</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {location.title}
          </Text>
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{location.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.distance}>{location.distance}</Text>
        <Text style={styles.bookingInfo}>
          Recently booked {location.recentBookings} times
        </Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.price}>
            <Text style={styles.priceAmount}>${location.price}</Text>
            <Text style={styles.priceUnit}>/{location.priceUnit}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instantBookingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFD700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: theme.fonts.bold,
    color: '#000',
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: theme.colors.onSurface,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    fontSize: 14,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.onSurface,
  },
  distance: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 2,
  },
  bookingInfo: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceAmount: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: theme.colors.onSurface,
  },
  priceUnit: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.onSurface,
  },
});

export default InstantBookingCard;