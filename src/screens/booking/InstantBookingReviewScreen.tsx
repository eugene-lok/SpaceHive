// src/screens/booking/InstantBookingReviewScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { XIcon } from 'phosphor-react-native';
import { RootStackParamList, CustomBookingDetails } from '../../../App';
import { theme } from '../../theme/theme';

// Import child components
import EventTypeSelector from '../../components/booking/EventTypeSelector';
import ExtraServicesSelector from '../../components/booking/ExtraServicesSelector';
import { calculateBookingHours } from '../../utils/bookingUtils';

type InstantBookingReviewNavigationProp = StackNavigationProp<RootStackParamList, 'InstantBookingReview'>;
type InstantBookingReviewRouteProp = RouteProp<RootStackParamList, 'InstantBookingReview'>;

interface InstantBookingReviewScreenProps {
  navigation: InstantBookingReviewNavigationProp;
  route: InstantBookingReviewRouteProp;
}

const InstantBookingReviewScreen: React.FC<InstantBookingReviewScreenProps> = ({
  navigation,
  route,
}) => {
  const { location, formData } = route.params;
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const bookingHours = calculateBookingHours(formData);

  const handleClose = () => {
    navigation.navigate('Home');
  };

  const handleMatchRequest = () => {
    // Navigate to MatchRequestScreen - we need to deserialize formData first
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
    const customDetails: CustomBookingDetails = {
      eventType: selectedEventType,
      extraServices: selectedServices,
    };

    navigation.navigate('InstantBookingPayment', {
      location,
      formData,
      customDetails,
    });
  };

  const handleSkip = () => {
    // Skip with no custom details
    const customDetails: CustomBookingDetails = {
      eventType: null,
      extraServices: [],
    };

    navigation.navigate('InstantBookingPayment', {
      location,
      formData,
      customDetails,
    });
  };

  const getButtonText = () => {
    return selectedEventType ? 'Next' : 'Skip';
  };

  const getButtonHandler = () => {
    return selectedEventType ? handleNext : handleSkip;
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
      <View style={styles.content}>
        <Text style={styles.title}>Customize your event{'\n'}(Optional)</Text>
        
        <EventTypeSelector
          selectedEventType={selectedEventType}
          onEventTypeSelect={setSelectedEventType}
        />
        
        {selectedEventType && (
        <ExtraServicesSelector
            eventType={selectedEventType}
            selectedServices={selectedServices}
            onServicesSelect={setSelectedServices}
            bookingHours={bookingHours}
        />
        )}
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={getButtonHandler()}
        >
          <Text style={styles.nextButtonText}>
            {getButtonText()}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
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
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: '#000',
    marginBottom: 32,
    lineHeight: 34,
  },
  bottomButtons: {
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

export default InstantBookingReviewScreen;