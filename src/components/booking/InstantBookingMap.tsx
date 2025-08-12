// src/components/booking/InstantBookingMap.tsx - SIMPLIFIED VERSION
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { Location, CALGARY_CENTER } from '../../types/instantBooking';
import { theme } from '../../theme/theme';

interface InstantBookingMapProps {
  locations: Location[];
  selectedLocationId?: number;
  onMarkerPress: (location: Location) => void;
}

const InstantBookingMap: React.FC<InstantBookingMapProps> = ({
  locations,
  selectedLocationId,
  onMarkerPress,
}) => {
  const [mapReady, setMapReady] = useState(false);

  // Simple region definition
  const region: Region = {
    latitude: 51.0447,
    longitude: -114.0719,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const handleMapReady = () => {
    console.log('Map ready!');
    setMapReady(true);
  };

  const renderMarker = (location: Location) => {
    const isSelected = selectedLocationId === location.id;
    
    return (
      <Marker
        key={location.id}
        coordinate={location.coordinates}
        onPress={() => onMarkerPress(location)}
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
      >
        {locations.map(renderMarker)}
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
  markerContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  markerSelectedContainer: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  markerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
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
  },
});

export default InstantBookingMap;