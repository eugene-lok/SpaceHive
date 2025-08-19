// src/screens/search/InstantBookingScreen.tsx - Updated with navigation to details
import React, { useState, useCallback, useRef, useMemo } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { BookingFormData } from '../../types/booking';
import { Location, MOCK_LOCATIONS } from '../../types/instantBooking';
import { SerializableBookingFormData } from '../../../App';
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

const deserializeFormData = (serializable: SerializableBookingFormData): BookingFormData => {
  return {
    ...serializable,
    dateTime: {
      ...serializable.dateTime,
      date: serializable.dateTime.date 
        ? new Date(serializable.dateTime.date) 
        : null,
    },
  };
};

const InstantBookingScreen: React.FC<InstantBookingScreenProps> = ({
  navigation,
  route,
}) => {
  const formData = useMemo(() => 
    deserializeFormData(route.params.formData), 
    [route.params.formData]
  );
  const [selectedLocationId, setSelectedLocationId] = useState<number | undefined>();
  const [isCarouselExpanded, setIsCarouselExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('search');

  useFocusEffect(
    React.useCallback(() => {
      setActiveTab('search');
    }, [])
  );
  
  // Debouncing ref for marker presses
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const handleSummaryPress = () => {
    navigation.goBack();
  };

  // Debounced marker press handler (300ms debounce)
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

  // Updated location press handler with navigation to details
  const handleLocationPress = useCallback((location: Location) => {
    console.log('Location card pressed:', location.title);
    // Navigate to InstantBookingDetails screen
    navigation.navigate('InstantBookingDetails', {
      location: location,
      formData: route.params.formData
    });
  }, [navigation]);

  const handleCarouselExpandedChange = (expanded: boolean) => {
    setIsCarouselExpanded(expanded);
  };

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
    console.log('Tab pressed:', tabId);
    
    switch (tabId) {
      case 'search':
        navigation.navigate('Home');
        break;
      case 'bookings':
        navigation.navigate('Bookings');
        break;
      case 'saved':
        navigation.navigate('Placeholder', { activeTab: 'saved' });
        break;
      case 'messages':
        navigation.navigate('Placeholder', { activeTab: 'messages' });
        break;
      case 'profile':
        navigation.navigate('Placeholder', { activeTab: 'profile' });
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

      {/* Sliding Options Carousel */}
      <InstantBookingOptions
        locations={MOCK_LOCATIONS}
        selectedLocationId={selectedLocationId}
        onLocationPress={handleLocationPress}
        isExpanded={isCarouselExpanded}
        onExpandedChange={handleCarouselExpandedChange}
      />

      {/* Bottom Navigation */}
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