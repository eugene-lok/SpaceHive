// src/screens/booking/InstantBookingConfirmationScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { 
  CheckIcon, 
  StarIcon, 
  DownloadIcon,
  ShareIcon,
} from 'phosphor-react-native';
import { RootStackParamList } from '../../../App';
import { theme } from '../../theme/theme';

import { calculateBookingHours, formatDateTime, formatGuests } from '../../utils/bookingUtils';

type InstantBookingConfirmationNavigationProp = StackNavigationProp<RootStackParamList, 'InstantBookingConfirmation'>;
type InstantBookingConfirmationRouteProp = RouteProp<RootStackParamList, 'InstantBookingConfirmation'>;

interface InstantBookingConfirmationScreenProps {
  navigation: InstantBookingConfirmationNavigationProp;
  route: InstantBookingConfirmationRouteProp;
}

const InstantBookingConfirmationScreen: React.FC<InstantBookingConfirmationScreenProps> = ({
  navigation,
  route,
}) => {
  const { location, formData, customDetails, paymentMethod } = route.params;

  const handleGoToBookings = () => {
    navigation.navigate('Bookings');
  };

  const handleBackToSearch = () => {
    navigation.navigate('Home');
  };

  const handleGetReceipt = () => {
    // TODO: Implement PDF receipt generation
    console.log('Get PDF Receipt pressed');
  };

  const handleShare = () => {
    // TODO: Implement sharing functionality
    console.log('Share pressed');
  };

  const bookingHours = calculateBookingHours(formData);
  const basePrice = location.price * bookingHours;
  
  const getExtraServicesCost = () => {
    const costs: { [key: string]: number } = {
      photographer: 50 * bookingHours,
      string_lights: 15,
      decor_packages: 10,
      catering: 0,
    };
    
    return customDetails.extraServices.reduce((total, service) => {
      return total + (costs[service] || 0);
    }, 0);
  };

  const extraServicesCost = getExtraServicesCost();
  const totalPrice = basePrice + extraServicesCost;

  const formatConfirmationDate = () => {
    if (!formData.dateTime.date) return '6-10PM, Jul 4';
    
    const date = new Date(formData.dateTime.date);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    if (formData.dateTime.time) {
      const start = formData.dateTime.time.start;
      const end = formData.dateTime.time.end;
      const timeStr = `${start.time}${start.period}-${end.time}${end.period}`;
      return `${timeStr}, ${dateStr}`;
    }
    
    return dateStr;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* Header */}
      <SafeAreaView style={styles.header}>
        <View style={styles.headerTabs}>
          <TouchableOpacity>
            <Text style={styles.activeTab}>Instant Book</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.inactiveTab}>Match Request</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
          <ShareIcon size={18} color="#000" weight="bold" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Content */}
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Success Modal-like Card */}
        <View style={styles.confirmationCard}>
          <View style={styles.successIcon}>
            <CheckIcon size={32} color="#fff" weight="bold" />
          </View>
          
          <Text style={styles.confirmationTitle}>Booking Complete!</Text>
          <Text style={styles.confirmationSubtitle}>
            Your payment has been successfully done.
          </Text>
          
          {/* Location Info */}
          <View style={styles.locationContainer}>
            <Image source={location.images[0]} style={styles.locationImage} />
            <View style={styles.locationInfo}>
              <Text style={styles.locationTitle}>{location.title}</Text>
              <View style={styles.ratingContainer}>
                <StarIcon size={16} color="#000" weight="fill" />
                <Text style={styles.ratingText}>4.66 (110 reviews)</Text>
              </View>
            </View>
          </View>
          
          {/* Booking Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Booking Date & Time</Text>
              <Text style={styles.detailValue}>{formatConfirmationDate()}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Number of Guests</Text>
              <Text style={styles.detailValue}>{formatGuests(formData)}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Payment Method</Text>
              <Text style={styles.detailValue}>{paymentMethod}</Text>
            </View>
            
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Total Payment</Text>
              <Text style={styles.detailValue}>${totalPrice}</Text>
            </View>
          </View>
          
          {/* Get PDF Receipt */}
          <TouchableOpacity style={styles.receiptButton} onPress={handleGetReceipt}>
            <DownloadIcon size={20} color={theme.colors.primary} weight="bold" />
            <Text style={styles.receiptButtonText}>Get PDF Receipt</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity 
          style={styles.bookingsButton}
          onPress={handleGoToBookings}
        >
          <Text style={styles.bookingsButtonText}>Go to My Bookings</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.searchButton}
          onPress={handleBackToSearch}
        >
          <Text style={styles.searchButtonText}>Back to Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
  },
  headerTabs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTab: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    textDecorationLine: 'underline',
    marginRight: 20,
  },
  inactiveTab: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#999',
    marginRight: 20,
  },
  shareButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 120, // Space for floating buttons
  },
  confirmationCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#27B837',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  confirmationTitle: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  confirmationSubtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',
  },
  locationImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  locationInfo: {
    flex: 1,
  },
  locationTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#666',
    marginLeft: 4,
  },
  detailsGrid: {
    width: '100%',
    gap: 16,
    marginBottom: 32,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#666',
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    textAlign: 'right',
  },
  receiptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: '#F0F8F8',
  },
  receiptButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.primary,
    marginLeft: 8,
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f5f5f5',
  },
  bookingsButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  bookingsButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.semibold,
    color: '#fff',
    textAlign: 'center',
  },
  searchButton: {
    backgroundColor: '#000',
    paddingVertical: 18,
    borderRadius: 12,
  },
  searchButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.semibold,
    color: '#fff',
    textAlign: 'center',
  },
});

export default InstantBookingConfirmationScreen;