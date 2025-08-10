export interface Space {
  id: number;
  title: string;
  price: string;
  rating: number;
  image: string;
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

export interface OnboardingData {
  image: string;
  title: string;
  subtitle: string;
}