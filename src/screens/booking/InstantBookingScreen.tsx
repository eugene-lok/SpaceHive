// src/screens/booking/InstantBookingScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { BookingFormData } from '../../types/booking';
import { Location, MOCK_LOCATIONS } from '../../types/instantBooking';
import InstantBookingSummary from '../../components/booking/InstantBookingSummary';
import InstantBookingMap from '../../components/booking/InstantBookingMap';
import InstantBookingOptions from '../../components/booking/InstantBookingOptions';
import BottomNavigation from '../../components/BottomNavigation';

type InstantBookingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'InstantBooking'>;
type InstantBookingScreenRouteProp = RouteProp<RootStackParamList, 'InstantBooking'>;

interface InstantBookingScreenProps {
  navigation: InstantBookingScreenNavigationProp;
  route: InstantBookingScreenRouteProp;
}

const InstantBookingScreen: React.FC<InstantBookingScreenProps> = ({
  navigation,
  route,
}) => {
  const { formData } = route.params;
  const [selectedLocationId, setSelectedLocationId] = useState<number | undefined>();
  const [isCarouselExpanded, setIsCarouselExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('search');

  const handleSummaryPress = () => {
    navigation.goBack();
  };

  const handleMarkerPress = (location: Location) => {
    setSelectedLocationId(location.id);
  };

  const handleLocationPress = (location: Location) => {
    console.log('Location selected:', location.title);
    // TODO: Navigate to location details or booking confirmation
  };

  const handleCarouselExpandedChange = (expanded: boolean) => {
    setIsCarouselExpanded(expanded);
  };

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    console.log('Tab pressed:', tabId);
    
    switch (tabId) {
      case 'search':
        break;
      case 'bookings':
        console.log('Navigate to Bookings');
        break;
      case 'saved':
        console.log('Navigate to Saved');
        break;
      case 'messages':
        console.log('Navigate to Messages');
        break;
      case 'profile':
        console.log('Navigate to Profile');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Filter Summary */}
      <SafeAreaView edges={['top']} style={styles.summaryContainer}>
        <InstantBookingSummary
          formData={formData}
          onPress={handleSummaryPress}
        />
      </SafeAreaView>

      {/* Map */}
      <View style={styles.mapContainer}>
        <InstantBookingMap
          locations={MOCK_LOCATIONS}
          selectedLocationId={selectedLocationId}
          onMarkerPress={handleMarkerPress}
        />
      </View>

      {/* Sliding Options Carousel */}
      <InstantBookingOptions
        locations={MOCK_LOCATIONS}
        onLocationPress={handleLocationPress}
        isExpanded={isCarouselExpanded}
        onExpandedChange={handleCarouselExpandedChange}
      />

      {/* Bottom Navigation - always visible */}
      <SafeAreaView edges={['bottom']} style={styles.navigationContainer}>
        <BottomNavigation
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  summaryContainer: {
    backgroundColor: '#fff',
    zIndex: 1000,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 1001,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});

export default InstantBookingScreen;