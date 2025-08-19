// src/components/booking/EventTypeSelector.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { CaretDownIcon, CaretUpIcon } from 'phosphor-react-native';
import { theme } from '../../theme/theme';

interface EventTypeSelectorProps {
  selectedEventType: string | null;
  onEventTypeSelect: (eventType: string | null) => void;
}

const EVENT_TYPES = [
  'Birthday Party',
  'Workshop', 
  'Hobby Club',
  'Meeting',
  'Pop-up',
];

const EventTypeSelector: React.FC<EventTypeSelectorProps> = ({
  selectedEventType,
  onEventTypeSelect,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectEventType = (eventType: string) => {
    onEventTypeSelect(eventType);
    setIsDropdownOpen(false);
  };

  const getDisplayText = () => {
    return selectedEventType || 'Pick an option';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>What kind of event are you planning?</Text>
      
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={[
            styles.dropdownButton,
            isDropdownOpen && styles.dropdownButtonOpen,
          ]}
          onPress={toggleDropdown}
        >
          <Text style={[
            styles.dropdownText,
            selectedEventType ? styles.dropdownTextSelected : undefined,
            ]}>
            {getDisplayText()}
          </Text>
          {isDropdownOpen ? (
            <CaretUpIcon size={20} color="#666" weight="bold" />
          ) : (
            <CaretDownIcon size={20} color="#666" weight="bold" />
          )}
        </TouchableOpacity>

        {isDropdownOpen && (
          <View style={styles.dropdown}>
            {EVENT_TYPES.map((eventType, index) => (
              <TouchableOpacity
                key={eventType}
                style={[
                  styles.dropdownItem,
                  selectedEventType === eventType && styles.dropdownItemSelected,
                  index === EVENT_TYPES.length - 1 && styles.dropdownItemLast,
                ]}
                onPress={() => selectEventType(eventType)}
              >
                <Text style={[
                  styles.dropdownItemText,
                  selectedEventType === eventType && styles.dropdownItemTextSelected,
                ]}>
                  {eventType}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    marginBottom: 16,
  },
  dropdownContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dropdownButtonOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: theme.fonts.regular,
    color: '#999',
    flex: 1,
  },
  dropdownTextSelected: {
    color: '#000',
    fontFamily: theme.fonts.medium,
  },
  dropdown: {
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
  dropdownItemLast: {
    borderBottomWidth: 0,
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
});

export default EventTypeSelector;