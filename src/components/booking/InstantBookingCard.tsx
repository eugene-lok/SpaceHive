// src/components/booking/InstantBookingCard.tsx - Redesigned to match reference image
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
        // Enhanced shadow when selected (applied to whole card area)
        isSelected && styles.selectedContainer
      ]} 
      onPress={() => onPress(location)}
      activeOpacity={0.95}
    >
      {/* Rounded Image Container */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: location.image }} style={styles.image} />
        <TouchableOpacity style={styles.heartButton}>
          <MaterialIcons name="favorite-border" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Content Below Image */}
      <View style={styles.content}>
        {/* Property Title */}
        <Text style={styles.title} numberOfLines={1}>
          {location.title}
        </Text>
        
        {/* Location */}
        <Text style={styles.location}>{location.location}</Text>
        
        {/* Distance */}
        <Text style={styles.distance}>{location.distance}</Text>
        
        {/* Booking Info */}
        <Text style={styles.bookingInfo}>
          Recently booked {location.recentBookings} times
        </Text>
        
        {/* Price and Rating Row */}
        <View style={styles.bottomRow}>
          <Text style={styles.price}>
            <Text style={styles.priceAmount}>${location.price}</Text>
            <Text style={styles.priceUnit}>/{location.priceUnit}</Text>
          </Text>
          
          <View style={styles.ratingContainer}>
            <MaterialIcons name="star" size={16} color="#000" />
            <Text style={styles.rating}>{location.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  // Enhanced selection state for whole card area
  selectedContainer: {
    // Subtle background tint when selected
    backgroundColor: 'rgba(65, 158, 157, 0.05)',
    borderRadius: 12,
    padding: 4,
    margin: 12, // Adjust margin when padding added
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
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
  content: {
    paddingTop: 12,
    paddingHorizontal: 4, // Minimal horizontal padding
  },
  // Property title (new field)
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
    lineHeight: 22,
  },
  // Location (was previously title)
  location: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    marginBottom: 2,
    lineHeight: 20,
  },
  distance: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
    lineHeight: 18,
  },
  bookingInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 18,
  },
  bottomRow: {
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    marginLeft: 4,
  },
});

export default InstantBookingCard;