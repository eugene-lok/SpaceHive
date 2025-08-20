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
  Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
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

  const insets = useSafeAreaInsets();
  const bottomPadding = 180 + insets.bottom;

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
        </View>
      </SafeAreaView>

      {/* Content */}
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: bottomPadding }
        ]}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Success Modal-like Card */}
        <View style={styles.confirmationCard}>
          <View style={styles.successIcon}>
            <CheckIcon size={32} color="#fff" weight="bold" />
          </View>
          
          <Text style={styles.confirmationTitle}>Booking Complete!</Text>
          <Text style={styles.confirmationSubtitle}>
            Your payment was sucessful.
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
      <View style={[
        styles.bottomButtons,
        { paddingBottom: Math.max(insets.bottom, 20) }
      ]}>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#f5f5f5',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: 'relative', 
    minHeight: 60, 
  },
  headerTabs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24
  },
  activeTab: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    textDecorationLine: 'underline',
  },
  inactiveTab: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#999',
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
    paddingBottom: 240,
  },
  confirmationCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.success,
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
    marginBottom: 24,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    width: '100%',        
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 24
  },
  locationImage: {
    width: 100,
    height: 100,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12, 
},
  detailItem: {
    width: '48%', // Takes roughly half the width with gap
    flexDirection: 'column', // Stack label and value vertically
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    minHeight: 60, 
    borderWidth: 1,
    borderColor: theme.colors.buttonDisabled
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#666',
    marginBottom: 8, // Space between label and value
  },
  detailValue: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    flexWrap: 'wrap', // Allow text to wrap if needed
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
    backgroundColor: 'transparent', 
    paddingHorizontal: 20,
    paddingTop: 20,
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