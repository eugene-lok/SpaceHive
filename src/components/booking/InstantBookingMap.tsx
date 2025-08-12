// src/components/booking/InstantBookingMap.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Location as LocationType, CALGARY_CENTER } from '../../types/instantBooking';
import { theme } from '../../theme/theme';

interface InstantBookingMapProps {
  locations: LocationType[];
  selectedLocationId?: number;
  onMarkerPress: (location: LocationType) => void;
}

const InstantBookingMap: React.FC<InstantBookingMapProps> = ({
  locations,
  selectedLocationId,
  onMarkerPress,
}) => {
  const [mapReady, setMapReady] = useState(false);
  const [userLocation, setUserLocation] = useState<Region | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);

  // Default region (Calgary)
  const defaultRegion: Region = {
  latitude: 37.78825,
  longitude: -122.4324, // San Francisco
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

  useEffect(() => {
    requestLocationPermission();
    
    // Debug: Check API key
    console.log('🔑 API Key:', process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY);
    
    // Debug timeout - force hide loading after 5 seconds
    const timeout = setTimeout(() => {
      console.log('⏰ Timeout: Force hiding loader');
      setMapReady(true);
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        setLocationPermission(true);
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
        setLocationPermission(false);
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setLocationPermission(false);
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      const userRegion: Region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      
      setUserLocation(userRegion);
    } catch (error) {
      console.error('Error getting current location:', error);
    }
  };

  const handleMapReady = () => {
    console.log('✅ Map ready! Setting mapReady to true');
    setMapReady(true);
    console.log('✅ mapReady state should now be:', true);
  };

  // Add layout event handler for additional debugging
  const handleMapLayout = () => {
    console.log('📐 Map layout complete');
  };

  const renderMarker = (location: LocationType) => {
    const isSelected = selectedLocationId === location.id;
    
    return (
      <Marker
        key={location.id}
        coordinate={location.coordinates}
        onPress={() => onMarkerPress(location)}
        title={location.title}
        description={`$${location.price}/${location.priceUnit}`}
      >
        <View style={[
          styles.markerContainer,
          isSelected && styles.markerSelectedContainer
        ]}>
          <Text style={[
            styles.markerText,
            isSelected && styles.markerSelectedText
          ]}>
            ${location.price}
          </Text>
        </View>
      </Marker>
    );
  };

  // Use user location if available, otherwise use default Calgary region
  const initialRegion = userLocation || defaultRegion;

  return (
    <View style={styles.container}>
      <MapView
        style={[styles.map, { width: '100%', height: 400 }]}
        initialRegion={initialRegion}
        provider={undefined}
        onMapReady={handleMapReady}
        onLayout={handleMapLayout}
        showsUserLocation={false}
        showsMyLocationButton={false}
        rotateEnabled={false}
        pitchEnabled={false}
        zoomControlEnabled={true}
        mapType="standard"
      >
        {locations.map(renderMarker)}
      </MapView>
      
      {!mapReady && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading map...</Text>
          <Text style={styles.debugText}>mapReady: {mapReady.toString()}</Text>
        </View>
      )}
      
      {/* Debug info overlay */}
      <View style={styles.debugInfo}>
        <Text style={styles.debugText}>Map Ready: {mapReady.toString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    minWidth: 60,
    alignItems: 'center',
  },
  markerSelectedContainer: {
    backgroundColor: '#000',
    borderColor: '#000',
    transform: [{ scale: 1.1 }],
  },
  markerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  markerSelectedText: {
    color: '#fff',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(245, 245, 245, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  debugInfo: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    borderRadius: 4,
    zIndex: 1000,
  },
  debugText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default InstantBookingMap;