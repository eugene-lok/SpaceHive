// src/utils/bookingUtils.ts
import { SerializableBookingFormData } from '../../App';

export const calculateBookingHours = (formData: SerializableBookingFormData): number => {
  if (!formData.dateTime.time) return 4; // Default 4 hours
  
  const start = formData.dateTime.time.start;
  const end = formData.dateTime.time.end;
  
  // Convert to 24-hour format
  let startHour = parseInt(start.time.split(':')[0]);
  let endHour = parseInt(end.time.split(':')[0]);
  
  if (start.period === 'PM' && startHour !== 12) startHour += 12;
  if (end.period === 'PM' && endHour !== 12) endHour += 12;
  if (start.period === 'AM' && startHour === 12) startHour = 0;
  if (end.period === 'AM' && endHour === 12) endHour = 0;
  
  return Math.max(endHour - startHour, 2); // Minimum 2 hours
};

export const formatDateTime = (formData: SerializableBookingFormData): string => {
  if (!formData.dateTime.date) return 'July 4th, 6 - 10PM';
  
  const date = new Date(formData.dateTime.date);
  const dateStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  
  if (formData.dateTime.time) {
    const start = formData.dateTime.time.start;
    const end = formData.dateTime.time.end;
    const timeStr = `${start.time} ${start.period} - ${end.time} ${end.period}`;
    return `${dateStr}, ${timeStr}`;
  }
  
  return dateStr;
};

export const formatGuests = (formData: SerializableBookingFormData): string => {
  const { adults, children, infants } = formData.guests;
  let total = adults + children + infants;
  return `${total} Adult${total !== 1 ? 's' : ''}`;
};