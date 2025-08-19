// src/components/match-request/EventTypeStep.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { CaretDownIcon, CaretUpIcon } from 'phosphor-react-native';
import { MatchRequestData } from '../../screens/search/MatchRequestScreen';
import { theme } from '../../theme/theme';

interface EventTypeStepProps {
  data: MatchRequestData;
  onUpdate: (updates: Partial<MatchRequestData>) => void;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
  buttonText: string;
}

const EVENT_TYPES = [
  'Birthday Party',
  'Workshop',
  'Hobby Club',
  'Meeting',
  'Pop-up',
];

const EventTypeStep: React.FC<EventTypeStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
  canProceed,
  buttonText,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleEventTypeSelect = (eventType: string) => {
    onUpdate({ eventType });
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <View style={styles.container}>
        <View style={styles.content}>
        <View style={styles.contentContainer}>
            <Text style={styles.title}>What kind of event are you planning?</Text>
            
            <View style={styles.dropdownContainer}>
            <TouchableOpacity 
                style={[
                styles.dropdownButton,
                isDropdownOpen && styles.dropdownButtonActive
                ]}
                onPress={toggleDropdown}
            >
                <Text style={[
                styles.dropdownButtonText,
                !data.eventType && styles.dropdownPlaceholder
                ]}>
                {data.eventType || 'Birthday Party'}
                </Text>
                {isDropdownOpen ? (
                <CaretUpIcon size={20} color="#666" weight="bold" />
                ) : (
                <CaretDownIcon size={20} color="#666" weight="bold" />
                )}
            </TouchableOpacity>
            
            {isDropdownOpen && (
                <View style={styles.dropdownMenu}>
                {EVENT_TYPES.map((eventType) => (
                    <TouchableOpacity
                    key={eventType}
                    style={[
                        styles.dropdownItem,
                        data.eventType === eventType && styles.dropdownItemSelected
                    ]}
                    onPress={() => handleEventTypeSelect(eventType)}
                    >
                    <Text style={[
                        styles.dropdownItemText,
                        data.eventType === eventType && styles.dropdownItemTextSelected
                    ]}>
                        {eventType}
                    </Text>
                    </TouchableOpacity>
                ))}
                </View>
            )}
            </View>
        </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
        <TouchableOpacity 
            style={styles.nextButton}
            onPress={onNext}
            disabled={!canProceed}
        >
            <Text style={[
            styles.nextButtonText,
            !canProceed && styles.nextButtonTextDisabled
            ]}>
            {buttonText}
            </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
            style={styles.backButton}
            onPress={onBack}
        >
            <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: '#000',
    marginBottom: 32,
    lineHeight: 34,
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownButtonActive: {
    borderColor: theme.colors.primary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  dropdownButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#000',
  },
  dropdownPlaceholder: {
    color: '#999',
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 1001,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  dropdownItemSelected: {
    backgroundColor: '#F0F8F8',
  },
  dropdownItemText: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#000',
  },
  dropdownItemTextSelected: {
    color: theme.colors.primary,
    fontFamily: theme.fonts.semibold,
  },
  bottomButtons: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f5f5f5',
  },
  nextButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 12,
  },
  nextButtonText: {
    fontSize: 22,
    fontFamily: theme.fonts.bold,
    color: '#fff',
    textAlign: 'center',
  },
  nextButtonTextDisabled: {
    opacity: 0.5,
  },
  backButton: {
    backgroundColor: '#000',
    paddingVertical: 20,
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.bold,
    color: '#fff',
    textAlign: 'center',
  },
});

export default EventTypeStep;