// src/types/instantBooking.ts - Updated with separated title and location
import { ImageSourcePropType } from 'react-native';
export interface Location {
  id: number;
  title: string;       
  location: string;     
  distance: string;
  rating: number;
  recentBookings: number;
  price: number;
  priceUnit: string;
  images: ImageSourcePropType[];
  instantBooking: boolean; 
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface MapMarker {
  id: number;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  price: number;
  isSelected?: boolean;
}

export const MOCK_LOCATIONS: Location[] = [
  {
    id: 1,
    title: 'Charming Event Space',
    location: 'Downtown, Calgary',
    distance: '1 km away',
    rating: 4.96,
    recentBookings: 5,
    price: 30,
    priceUnit: 'hr',
    images: [
      require('../../assets/images/SearchResults/CharmingLogCabin/pexels-andreaedavis-4617771.jpg'),
      require('../../assets/images/SearchResults/CharmingLogCabin/pexels-andreaedavis-10853448.jpg'),
      require('../../assets/images/SearchResults/CharmingLogCabin/pexels-andreaedavis-10855157.jpg'),
    ],
    instantBooking: true,
    coordinates: {
      latitude: 51.0447,
      longitude: -114.0719,
    },
  },
  {
    id: 2,
    title: 'Luxury Downtown Loft',
    location: 'Beltline, Calgary',
    distance: '2.1 km away',
    rating: 4.82,
    recentBookings: 8,
    price: 25,
    priceUnit: 'hr',
     images: [
      require('../../assets/images/SearchResults/Modern Studio in the Heart of the City/pexels-fotoaibe-813688.jpg'),
      require('../../assets/images/SearchResults/Modern Studio in the Heart of the City/pexels-fotoaibe-813691.jpg'),
      require('../../assets/images/SearchResults/Modern Studio in the Heart of the City/pexels-fotoaibe-813692.jpg'),
    ],
    instantBooking: true,
    coordinates: {
      latitude: 51.0366,
      longitude: -114.0708,
    },
  },
  {
    id: 3,
    title: 'Bright Riverside Studio',
    location: 'Kensington, Calgary',
    distance: '3.5 km away',
    rating: 4.74,
    recentBookings: 3,
    price: 22,
    priceUnit: 'hr',
     images: [
      require('../../assets/images/SearchResults/Spacious Duplex Apartment with Private Balcony/pexels-heyho-7018828.jpg'),
      require('../../assets/images/SearchResults/Spacious Duplex Apartment with Private Balcony/pexels-heyho-7018830.jpg'),
      require('../../assets/images/SearchResults/Spacious Duplex Apartment with Private Balcony/pexels-heyho-7018832.jpg'),
    ],
    instantBooking: false,
    coordinates: {
      latitude: 51.0581,
      longitude: -114.0892,
    },
  },
];

// Calgary downtown center coordinates
export const CALGARY_CENTER = {
  latitude: 51.0447,
  longitude: -114.0719,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};