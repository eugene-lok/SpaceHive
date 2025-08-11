// src/screens/booking/BookingFormScreen.tsx
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { BookingFormData, FormSection, FormState, INITIAL_FORM_DATA } from '../../types/booking';
import LocationSection from '../../components/booking/LocationSection';
import DateTimeSection from '../../components/booking/DateTimeSection';
import GuestsSection from '../../components/booking/GuestsSection';
import BudgetSection from '../../components/booking/BudgetSection';

interface BookingFormScreenProps {
  onBack: () => void;
  onClose: () => void;
}

const BookingFormScreen: React.FC<BookingFormScreenProps> = ({
  onBack,
  onClose,
}) => {
  const [formState, setFormState] = useState<FormState>({
    activeSection: 'location',
    completedSections: [],
    formData: INITIAL_FORM_DATA,
  });

  const updateFormData = useCallback((updates: Partial<BookingFormData>) => {
    setFormState(prev => ({
      ...prev,
      formData: { ...prev.formData, ...updates },
    }));
  }, []);

  const setActiveSection = useCallback((section: FormSection | null) => {
    setFormState(prev => ({
      ...prev,
      activeSection: section,
    }));
  }, []);

  const completeSection = useCallback((section: FormSection) => {
    setFormState(prev => ({
      ...prev,
      activeSection: null,
      completedSections: prev.completedSections.includes(section) 
        ? prev.completedSections 
        : [...prev.completedSections, section],
    }));
  }, []);

  const clearSection = useCallback((section: FormSection) => {
    const defaultData = INITIAL_FORM_DATA;
    
    switch (section) {
      case 'location':
        updateFormData({ location: defaultData.location });
        break;
      case 'dateTime':
        updateFormData({ dateTime: defaultData.dateTime });
        break;
      case 'guests':
        updateFormData({ guests: defaultData.guests });
        break;
      case 'budget':
        updateFormData({ budget: defaultData.budget });
        break;
    }

    setFormState(prev => ({
      ...prev,
      completedSections: prev.completedSections.filter(s => s !== section),
    }));
  }, [updateFormData]);

  const isLocationComplete = () => {
    return formState.formData.location.value !== null || formState.formData.location.isFlexible;
  };

  const isDateTimeComplete = () => {
    const { dateTime } = formState.formData;
    const hasDate = dateTime.date !== null || dateTime.isDateFlexible;
    const hasTime = dateTime.time !== null || dateTime.isTimeFlexible;
    return hasDate && hasTime;
  };

  const isGuestsComplete = () => {
    return formState.formData.guests.adults >= 1;
  };

  const isBudgetComplete = () => {
    const { budget } = formState.formData;
    return budget.min >= 0 && budget.max >= 0 && budget.min <= budget.max;
  };

  const allSectionsComplete = () => {
    return isLocationComplete() && isDateTimeComplete() && isGuestsComplete() && isBudgetComplete();
  };

  const getLocationDisplayText = () => {
    if (formState.formData.location.isFlexible) return 'Flexible';
    return formState.formData.location.value || '';
  };

  const getDateTimeDisplayText = () => {
    const { dateTime } = formState.formData;
    if (dateTime.isDateFlexible && dateTime.isTimeFlexible) return 'Flexible';
    
    let text = '';
    if (dateTime.date) {
      text = dateTime.date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    } else if (dateTime.isDateFlexible) {
      text = 'Flexible date';
    }
    
    if (dateTime.time && !dateTime.isTimeFlexible) {
      const startTime = `${dateTime.time.start.time} ${dateTime.time.start.period}`;
      const endTime = `${dateTime.time.end.time} ${dateTime.time.end.period}`;
      const timeText = `${startTime} - ${endTime}`;
      text += text ? `, ${timeText}` : timeText;
    } else if (dateTime.isTimeFlexible) {
      text += text ? ', Flexible time' : 'Flexible time';
    }
    
    return text;
  };

  const getGuestsDisplayText = () => {
    const { guests } = formState.formData;
    let text = `${guests.adults} Adult${guests.adults !== 1 ? 's' : ''}`;
    if (guests.children > 0) {
      text += `, ${guests.children} Child${guests.children !== 1 ? 'ren' : ''}`;
    }
    if (guests.infants > 0) {
      text += `, ${guests.infants} Infant${guests.infants !== 1 ? 's' : ''}`;
    }
    return text;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerTabs}>
          <Text style={styles.activeTab}>Instant Book</Text>
          <Text style={styles.inactiveTab}>Match Request</Text>
        </View>
        
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, isLocationComplete() && styles.progressBarComplete]} />
          <View style={[styles.progressBar, isDateTimeComplete() && styles.progressBarComplete]} />
          <View style={[styles.progressBar, isGuestsComplete() && styles.progressBarComplete]} />
          <View style={[styles.progressBar, isBudgetComplete() && styles.progressBarComplete]} />
        </View>

        {/* Location Section */}
        <LocationSection
          isActive={formState.activeSection === 'location'}
          isCompleted={isLocationComplete()}
          displayText={getLocationDisplayText()}
          data={formState.formData.location}
          onPress={() => setActiveSection('location')}
          onUpdate={(location) => updateFormData({ location })}
          onSave={() => completeSection('location')}
          onClear={() => clearSection('location')}
        />

        {/* Date & Time Section */}
        <DateTimeSection
          isActive={formState.activeSection === 'dateTime'}
          isCompleted={isDateTimeComplete()}
          displayText={getDateTimeDisplayText()}
          data={formState.formData.dateTime}
          onPress={() => setActiveSection('dateTime')}
          onUpdate={(dateTime) => updateFormData({ dateTime })}
          onSave={() => completeSection('dateTime')}
          onClear={() => clearSection('dateTime')}
        />

        {/* Guests Section */}
        <GuestsSection
          isActive={formState.activeSection === 'guests'}
          isCompleted={isGuestsComplete()}
          displayText={getGuestsDisplayText()}
          data={formState.formData.guests}
          onPress={() => setActiveSection('guests')}
          onUpdate={(guests) => updateFormData({ guests })}
          onSave={() => completeSection('guests')}
          onClear={() => clearSection('guests')}
        />

        {/* Budget Section */}
        <BudgetSection
          isActive={formState.activeSection === 'budget'}
          isCompleted={isBudgetComplete()}
          data={formState.formData.budget}
          onPress={() => setActiveSection('budget')}
          onUpdate={(budget) => updateFormData({ budget })}
          onSave={() => completeSection('budget')}
          onClear={() => clearSection('budget')}
        />
      </ScrollView>

      {/* Floating Save Button - appears when all sections complete */}
      {allSectionsComplete() && formState.activeSection === null && (
        <View style={styles.floatingSaveContainer}>
          <TouchableOpacity 
            style={styles.floatingSaveButton}
            onPress={() => {
              // TODO: Handle form submission in future implementation
              console.log('Form submitted with data:', formState.formData);
            }}
          >
            <Text style={styles.floatingSaveText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTabs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTab: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textDecorationLine: 'underline',
    marginRight: 20,
  },
  inactiveTab: {
    fontSize: 16,
    fontWeight: '400',
    color: '#999',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    paddingHorizontal: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    paddingLeft: 20,
  },
  progressBar: {
    width: 4,
    height: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 12,
    borderRadius: 2,
  },
  progressBarComplete: {
    backgroundColor: '#4CAF50',
  },
  floatingSaveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
    backgroundColor: 'rgba(245, 245, 245, 0.95)',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  floatingSaveButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 18,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingSaveText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
});

export default BookingFormScreen;