// src/types/instantBooking.ts - Updated with separated title and location

export interface Location {
  id: number;
  title: string;        // NEW: Actual property name
  location: string;     // NEW: Renamed from 'title' - actual location
  distance: string;
  rating: number;
  recentBookings: number;
  price: number;
  priceUnit: string;
  image: string;
  instantBooking: boolean; // NEW: Added as data field
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
    title: 'Modern Condo with Skyline View',
    location: 'Downtown, Calgary',
    distance: '1 km away',
    rating: 4.96,
    recentBookings: 5,
    price: 30,
    priceUnit: 'hr',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
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