// src/types/index.ts
import { ImageSourcePropType } from 'react-native';
export interface Space {
  id: number;
  title: string;
  price: string;
  rating: number;
  images: ImageSourcePropType[];
  location?: string;
  capacity?: number;
  amenities?: string[];
  instantBooking?: boolean;
}

export interface PlanningOption {
  id: number;
  title: string;
  image: string;
}

export interface EventCategory {
  id: number;
  title: string;
  image: ImageSourcePropType;
}

export interface OnboardingData {
  image: string;
  title: string;
  subtitle: string;
}