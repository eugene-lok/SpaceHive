// src/screens/booking/InstantBookingScreen.tsx - Updated with scroll-to-card functionality
import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { BookingFormData } from '../../types/booking';
import { Location, MOCK_LOCATIONS } from '../../types/instantBooking';
import InstantBookingSummary from '../../components/search/InstantBookingSummary';
import InstantBookingMap from '../../components/search/InstantBookingMap';
import InstantBookingOptions from '../../components/search/InstantBookingOptions';
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
  
  // NEW: Debouncing ref for marker presses
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleSummaryPress = () => {
    navigation.goBack();
  };

  // NEW: Debounced marker press handler (300ms debounce)
  const handleMarkerPress = useCallback((location: Location) => {
    // Clear existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    // Set new timeout
    debounceRef.current = setTimeout(() => {
      console.log('Map marker pressed:', location.title);
      setSelectedLocationId(location.id);
    }, 100); // Fast debounce for responsive feel
  }, []);

  // NEW: Updated location press handler with reverse interaction
  const handleLocationPress = useCallback((location: Location) => {
    console.log('Location card pressed:', location.title);
    // Reverse interaction: card press also updates map marker selection
    setSelectedLocationId(location.id);
    // TODO: Navigate to location details or booking confirmation
  }, []);

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

  // Cleanup debounce on unmount
  React.useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

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

      {/* Sliding Options Carousel - NOW with selectedLocationId prop */}
      <InstantBookingOptions
        locations={MOCK_LOCATIONS}
        selectedLocationId={selectedLocationId}
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