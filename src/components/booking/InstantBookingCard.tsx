// src/components/booking/InstantBookingCard.tsx - Updated with selection state
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Location } from '../../types/instantBooking';
import { theme } from '../../theme/theme';

interface InstantBookingCardProps {
  location: Location;
  isSelected?: boolean;
  onPress: (location: Location) => void;
}

const InstantBookingCard: React.FC<InstantBookingCardProps> = ({
  location,
  isSelected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container,
        // NEW: Enhanced shadow when selected
        isSelected && styles.selectedContainer
      ]} 
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
    overflow: 'hidden',
    // Default shadow
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // NEW: Enhanced shadow for selected state
  selectedContainer: {
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    // Subtle border to enhance selection
    borderWidth: 1,
    borderColor: theme.colors.primary || '#419E9D',
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
    backgroundColor: theme.colors.primary || '#419E9D',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginLeft: 2,
  },
  distance: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  bookingInfo: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  priceUnit: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666',
  },
});

export default InstantBookingCard;