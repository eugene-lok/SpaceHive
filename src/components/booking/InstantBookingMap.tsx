// src/components/booking/InstantBookingMap.tsx - Final optimized version
import React, { useState, useCallback, memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { Location } from '../../types/instantBooking';
import { theme } from '../../theme/theme';

interface InstantBookingMapProps {
  locations: Location[];
  selectedLocationId?: number;
  onMarkerPress: (location: Location) => void;
}

// Memoized marker component to prevent unnecessary re-renders
const MapMarker = memo<{
  location: Location;
  isSelected: boolean;
  onPress: (location: Location) => void;
}>(({ location, isSelected, onPress }) => {
  const handlePress = useCallback(() => {
    onPress(location);
  }, [location, onPress]);

  return (
    <Marker
      coordinate={location.coordinates}
      onPress={handlePress}
      // CRITICAL: Prevents flickering during map movement
      tracksViewChanges={false}
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
});

MapMarker.displayName = 'MapMarker';

const InstantBookingMap: React.FC<InstantBookingMapProps> = ({
  locations,
  selectedLocationId,
  onMarkerPress,
}) => {
  const [mapReady, setMapReady] = useState(false);

  // Calgary region optimized for the 3 mock locations
  const region: Region = {
    latitude: 51.0447,
    longitude: -114.0719,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const handleMapReady = useCallback(() => {
    console.log('Map ready!');
    setMapReady(true);
  }, []);

  // Memoized marker press handler to maintain reference stability
  const handleMarkerPress = useCallback((location: Location) => {
    onMarkerPress(location);
  }, [onMarkerPress]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onMapReady={handleMapReady}
        showsUserLocation={false}
        showsMyLocationButton={false}
        rotateEnabled={false}
        pitchEnabled={false}
        // Performance optimizations
        moveOnMarkerPress={false}
        showsCompass={false}
        showsScale={false}
        showsTraffic={false}
        showsIndoors={false}
        showsBuildings={false}
      >
        {locations.map((location) => (
          <MapMarker
            key={location.id}
            location={location}
            isSelected={selectedLocationId === location.id}
            onPress={handleMarkerPress}
          />
        ))}
      </MapView>
      
      {!mapReady && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading map...</Text>
        </View>
      )}
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
  // OPTIMIZED: Consistent pill shape with mobile-first design
  markerContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    // Mobile-first: Minimum touch target of 44x44pt
    minHeight: 32,
    minWidth: 50,
    // Large borderRadius ensures perfect pill shape
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    // Enhanced shadows for better visibility
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  markerSelectedContainer: {
    backgroundColor: theme.colors.onSurface || '#000',
    borderColor: theme.colors.onSurface|| '#000',
  },
  markerText: {
    fontSize: 13,
    fontWeight: '700',
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
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
});

export default memo(InstantBookingMap);