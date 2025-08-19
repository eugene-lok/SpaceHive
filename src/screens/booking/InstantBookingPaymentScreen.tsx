// src/screens/booking/InstantBookingPaymentScreen.tsx
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
import { XIcon, StarIcon, MapPinIcon, CalendarIcon, UsersIcon, PencilIcon } from 'phosphor-react-native';
import { RootStackParamList } from '../../../App';
import { theme } from '../../theme/theme';

import { calculateBookingHours, formatDateTime, formatGuests } from '../../utils/bookingUtils';

type InstantBookingPaymentNavigationProp = StackNavigationProp<RootStackParamList, 'InstantBookingPayment'>;
type InstantBookingPaymentRouteProp = RouteProp<RootStackParamList, 'InstantBookingPayment'>;

interface InstantBookingPaymentScreenProps {
  navigation: InstantBookingPaymentNavigationProp;
  route: InstantBookingPaymentRouteProp;
}

const InstantBookingPaymentScreen: React.FC<InstantBookingPaymentScreenProps> = ({
  navigation,
  route,
}) => {
  const { location, formData, customDetails } = route.params;
  
  

  const handleClose = () => {
    navigation.navigate('Home');
  };

  const handleMatchRequest = () => {
    // Navigate to MatchRequestScreen
    const deserializedFormData = {
      ...formData,
      dateTime: {
        ...formData.dateTime,
        date: formData.dateTime.date ? new Date(formData.dateTime.date) : null,
      },
    };
    
    navigation.navigate('MatchRequest', {
      formData: deserializedFormData,
    });
  };

  const handleNext = () => {
    navigation.navigate('PaymentProcessing', {
      location,
      formData,
      customDetails,
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const bookingHours = calculateBookingHours(formData);
  const basePrice = location.price * bookingHours;
  
  // Calculate extra services cost
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

  const getExtraServicesDisplay = () => {
    if (customDetails.extraServices.length === 0) return null;
    
    const serviceNames: { [key: string]: string } = {
      photographer: 'Photographer (2h)',
      string_lights: 'String Lights Setup',
      decor_packages: 'Decor Packages',
      catering: 'Catering',
    };
    
    return customDetails.extraServices.map(service => serviceNames[service] || service).join(', ');
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
          <TouchableOpacity onPress={handleMatchRequest}>
            <Text style={styles.inactiveTab}>Match Request</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <XIcon size={18} color="#fff" weight="bold" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Review booking details</Text>
        
        {/* Location Card */}
        <View style={styles.locationCard}>
          <Image source={location.images[0]} style={styles.locationImage} />
          <View style={styles.locationInfo}>
            <Text style={styles.locationTitle}>{location.title}</Text>
            <View style={styles.ratingContainer}>
              <StarIcon size={16} color="#000" weight="fill" />
              <Text style={styles.ratingText}>4.66 (110 reviews)</Text>
            </View>
          </View>
        </View>

        {/* Booking Details Container */}
        <View style={styles.detailsContainer}>
          {/* Your Booking Details */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your Booking Details</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editText}>Edit</Text>
                <PencilIcon size={16} color={theme.colors.primary} weight="bold" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.detailRow}>
              <MapPinIcon size={20} color="#666" weight="regular" />
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Location</Text>
                <Text style={styles.detailValue}>{location.location}</Text>
              </View>
            </View>
            
            <View style={styles.detailRow}>
                <CalendarIcon size={20} color="#666" weight="regular" />
                <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Date & Time</Text>
                <Text style={styles.detailValue}>{formatDateTime(formData)}</Text>
                </View>
            </View>
            
            <View style={styles.detailRow}>
                <UsersIcon size={20} color="#666" weight="regular" />
                <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Guests</Text>
                <Text style={styles.detailValue}>{formatGuests(formData)}</Text>
                </View>
            </View>
          </View>

          {/* Custom Details */}
          {(customDetails.eventType || customDetails.extraServices.length > 0) && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Your Custom Details</Text>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editText}>Edit</Text>
                  <PencilIcon size={16} color={theme.colors.primary} weight="bold" />
                </TouchableOpacity>
              </View>
              
              {customDetails.eventType && (
                <View style={styles.detailRow}>
                  <MapPinIcon size={20} color="#666" weight="regular" />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Event Type</Text>
                    <Text style={styles.detailValue}>• {customDetails.eventType}</Text>
                  </View>
                </View>
              )}
              
              {customDetails.extraServices.length > 0 && (
                <View style={styles.detailRow}>
                  <MapPinIcon size={20} color="#666" weight="regular" />
                  <View style={styles.detailContent}>
                    <Text style={styles.detailLabel}>Extra Services</Text>
                    <Text style={styles.detailValue}>• {getExtraServicesDisplay()}</Text>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Price Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Price Details</Text>
            
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceValue}>${basePrice}</Text>
            </View>
            
            {extraServicesCost > 0 && (
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Extra Services</Text>
                <Text style={styles.priceValue}>${extraServicesCost}</Text>
              </View>
            )}
            
            <View style={[styles.priceRow, styles.totalPriceRow]}>
              <View style={styles.totalPriceIcon}>
                <Text style={styles.dollarSign}>$</Text>
              </View>
              <Text style={styles.totalPriceLabel}>Total Price</Text>
              <Text style={styles.totalPriceValue}>${totalPrice}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleGoBack}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
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
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: '#000',
    marginTop: 20,
    marginBottom: 24,
    lineHeight: 34,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  locationInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  locationTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    marginBottom: 8,
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
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 120, // Space for floating buttons
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.primary,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: theme.colors.primary,
    marginRight: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  detailContent: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#000',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#000',
  },
  priceValue: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
  },
  totalPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 8,
  },
  totalPriceIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  dollarSign: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#fff',
  },
  totalPriceLabel: {
    flex: 1,
    fontSize: 18,
    fontFamily: theme.fonts.semibold,
    color: '#000',
  },
  totalPriceValue: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#000',
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
  nextButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  nextButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.semibold,
    color: '#fff',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#000',
    paddingVertical: 18,
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.semibold,
    color: '#fff',
    textAlign: 'center',
  },
});

export default InstantBookingPaymentScreen;