// src/components/booking/InstantBookingSummary.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { BookingFormData } from '../../types/booking';
import { theme } from '../../theme/theme';
import { Feather } from '@expo/vector-icons';

interface InstantBookingSummaryProps {
  formData: BookingFormData;
  onPress: () => void;
}

const InstantBookingSummary: React.FC<InstantBookingSummaryProps> = ({
  formData,
  onPress,
}) => {
  const formatLocationText = (): string => {
    if (formData.location.isFlexible) {
      return 'Flexible location';
    } else if (formData.location.value) {
      return formData.location.value;
    }
    return 'Add location';
  };

  const formatDetailsText = (): string => {
    const parts: string[] = [];
    
    // Date
    if (formData.dateTime.isDateFlexible) {
      parts.push('Flexible date');
    } else if (formData.dateTime.date) {
      const dateStr = formData.dateTime.date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
      parts.push(dateStr);
    }
    
    // Time  
    if (formData.dateTime.isTimeFlexible) {
      if (!formData.dateTime.isDateFlexible) {
        parts.push('Flexible time');
      }
    } else if (formData.dateTime.time) {
      const startTime = `${formData.dateTime.time.start.time} ${formData.dateTime.time.start.period}`;
      const endTime = `${formData.dateTime.time.end.time} ${formData.dateTime.time.end.period}`;
      parts.push(`${startTime} - ${endTime}`);
    }
    
    // Guests
    const { guests } = formData;
    let guestText = `${guests.adults} guest${guests.adults !== 1 ? 's' : ''}`;
    parts.push(guestText);
    
    // Budget
    parts.push(`$${formData.budget.min} - ${formData.budget.max}`);
    
    return parts.join(' · ');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Feather name="search" size={24} color={theme.colors.buttonDisabled} style={{ marginRight: 6 }} />
          <View style={styles.textContent}>
            <Text style={styles.locationText} numberOfLines={1}>
              {formatLocationText()}
            </Text>
            <Text style={styles.detailsText} numberOfLines={1}>
              {formatDetailsText()}
            </Text>
          </View>
        </View>
        <View style={styles.tuneIconContainer}>
          <Feather name="sliders" size={16} color={theme.colors.onSurfaceVariant}/>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: 28,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: theme.spacing.sm,
    gap: 12,
  },
  summaryText: {
    flex: 1,
    fontSize: 15,
    fontFamily: theme.fonts.medium,
    color: theme.colors.onSurface,
    marginRight: 8,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  textContent: {
    flex: 1,
  },
  locationText: {
    fontSize: 15,
    fontFamily: theme.fonts.medium,
    color: theme.colors.onSurface,
    marginBottom: 2,
  },
  detailsText: {
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: theme.colors.onSurfaceVariant,
  },
  tuneIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InstantBookingSummary;