// src/components/BookingCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { UserBooking } from '../types/userBooking';
import { theme } from '../theme/theme';

interface BookingCardProps {
  booking: UserBooking;
  isInAllView?: boolean;
}

const { width } = Dimensions.get('window');
const CARD_MARGIN = 16;
const CARD_WIDTH = width - (CARD_MARGIN * 2);

const BookingCard: React.FC<BookingCardProps> = ({ booking, isInAllView = false }) => {
  const isPastBooking = booking.status === 'past';
  const shouldFade = isInAllView && isPastBooking;

  const getButtonText = () => {
    switch (booking.status) {
      case 'past':
        return 'Write a Review';
      case 'upcoming':
      case 'pending':
      default:
        return 'View Details';
    }
  };

  const handleButtonPress = () => {
    const action = booking.status === 'past' ? 'Write Review' : 'View Details';
    console.log(`${action} pressed for:`, booking.title);
  };

  const getBookingTypeLabel = () => {
    return booking.bookingType === 'instant' ? 'Instant Booking' : 'Request & Match';
  };

  return (
    <View style={[styles.container, shouldFade && styles.fadedContainer]}>
      <View style={styles.card}>
        {/* Image with booking type overlay */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: booking.image }} style={styles.image} resizeMode="cover" />
          
          {/* Booking type label */}
          <View style={styles.bookingTypeContainer}>
            <View style={[
              styles.bookingTypeLabel,
              booking.bookingType === 'instant' ? styles.instantBookingLabel : styles.requestMatchLabel
            ]}>
              <Text style={styles.bookingTypeText}>{getBookingTypeLabel()}</Text>
            </View>
          </View>
          
          {shouldFade && <View style={styles.fadeOverlay} />}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>{booking.title}</Text>
          <Text style={styles.details}>{booking.time} • {booking.guests} • {booking.location}</Text>
          
          {/* Action Button */}
          <TouchableOpacity
            style={[
              styles.actionButton,
              booking.status === 'past' ? styles.reviewButton : styles.detailsButton
            ]}
            onPress={handleButtonPress}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.actionButtonText,
              booking.status === 'past' ? styles.reviewButtonText : styles.detailsButtonText
            ]}>
              {getButtonText()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: 20,
  },
  fadedContainer: {
    opacity: 0.6,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    padding: 10
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  bookingTypeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  bookingTypeLabel: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  instantBookingLabel: {
    backgroundColor: theme.colors.accent,
    borderWidth: 1,
    borderColor: "#000"
  },
  requestMatchLabel: {
    backgroundColor: theme.colors.accent,
    borderWidth: 1,
    borderColor: "#000"
  },
  bookingTypeText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#000',
  },
  fadeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  content: {
    paddingVertical: 16,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 20,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.onSurface,
    marginBottom: 8,
    lineHeight: 24,
  },
  details: {
    fontSize: 14,
    fontFamily: theme.fonts.regular,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 16,
    lineHeight: 20,
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsButton: {
    backgroundColor: '#000',
  },
  reviewButton: {
    backgroundColor: '#000',
  },
  actionButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
  },
  detailsButtonText: {
    color: '#fff',
  },
  reviewButtonText: {
    color: '#fff',
  },
});

export default BookingCard;