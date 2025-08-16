// src/types/booking.ts

export interface BookingFormData {
  location: {
    value: string | null;
    isFlexible: boolean;
  };
  dateTime: {
    date: Date | null;
    time: {
      start: {
        time: string;  // "06:00"
        period: 'AM' | 'PM';
      };
      end: {
        time: string;  // "10:00" 
        period: 'AM' | 'PM';
      };
    } | null;
    isDateFlexible: boolean;
    isTimeFlexible: boolean;
  };
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
  budget: {
    min: number;
    max: number;
  };
}

export type FormSection = 'location' | 'dateTime' | 'guests' | 'budget';

export interface FormState {
  activeSection: FormSection | null;
  completedSections: FormSection[];
  formData: BookingFormData;
}

export const INITIAL_FORM_DATA: BookingFormData = {
  location: {
    value: null,
    isFlexible: false,
  },
  dateTime: {
    date: null,
    time: {
      start: { time: '06:00', period: 'AM' },
      end: { time: '07:00', period: 'AM' },
    },
    isDateFlexible: false,
    isTimeFlexible: false,
  },
  guests: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  budget: {
    min: 0,
    max: 200,
  },
};

export const LOCATION_SUGGESTIONS = [
  'Inglewood, Calgary',
  'Downtown, Calgary',
];

export type BookingStackParamList = {
  BookingOptions: undefined;
  BookingForm: undefined;
};