// src/types/userBooking.ts
import { Space } from './index';

export interface UserBooking extends Space {
  bookingType: 'instant' | 'request';
  status: 'upcoming' | 'pending' | 'past';
  time: string; // e.g., "6-10PM, Jul 4"
  guests: string; // e.g., "10 Adults"
  date: string; // for display purposes
}

// Mock data for user bookings
export const MOCK_USER_BOOKINGS: UserBooking[] = [
  {
    id: 1,
    title: 'Cozy Private City View Condo',
    price: '$35/hour',
    rating: 4.92,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
    location: 'Downtown, Calgary',
    capacity: 10,
    instantBooking: true,
    bookingType: 'instant',
    status: 'upcoming',
    time: '6-10PM, Jul 4',
    guests: '10 Adults',
    date: 'July 4, 2024',
  },
  {
    id: 2,
    title: 'Cozy European Style House',
    price: '$28/hour',
    rating: 4.85,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
    location: 'Fishcreek, Calgary',
    capacity: 8,
    instantBooking: false,
    bookingType: 'request',
    status: 'pending',
    time: '7-10PM, Nov 25',
    guests: '8 Adults',
    date: 'November 25, 2024',
  },
  {
    id: 3,
    title: 'Fenyk Coffee',
    price: '$22/hour',
    rating: 4.70,
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop',
    location: 'Northland, Calgary',
    capacity: 12,
    instantBooking: false,
    bookingType: 'request',
    status: 'past',
    time: '5-8PM, May 3',
    guests: '12 Adults',
    date: 'May 3, 2024',
  },
];