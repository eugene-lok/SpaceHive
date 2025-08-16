// components/LocationSection.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { theme } from '../../theme/theme';
import { LOCATION_SUGGESTIONS } from '../../types/booking';
import { Feather } from '@expo/vector-icons';

interface LocationData {
  value: string | null;
  isFlexible: boolean;
}

interface LocationSectionProps {
  isActive: boolean;
  isCompleted: boolean;
  displayText: string;
  data: LocationData;
  onPress: () => void;
  onUpdate: (data: LocationData) => void;
  onSave: () => void;
  onClear: () => void;
}

const LocationSection: React.FC<LocationSectionProps> = ({
  isActive,
  isCompleted,
  displayText,
  data,
  onPress,
  onUpdate,
  onSave,
  onClear,
}) => {
  const [searchText, setSearchText] = useState(data.value || '');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleLocationToggle = (isLocation: boolean) => {
    if (isLocation) {
      onUpdate({ ...data, isFlexible: false });
      setShowSuggestions(false);
    } else {
      onUpdate({ ...data, isFlexible: true, value: null });
      setSearchText('');
      setShowSuggestions(false);
    }
  };

  const handleSearchFocus = () => {
    setShowSuggestions(true);
  };

  const handleOutsideTouch = () => {
    setShowSuggestions(false);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchText(suggestion);
    onUpdate({ ...data, value: suggestion, isFlexible: false });
    setShowSuggestions(false);
  };

  const handleSearchSubmit = () => {
    if (searchText.trim()) {
      onUpdate({ ...data, value: searchText.trim(), isFlexible: false });
    }
    setShowSuggestions(false);
  };

  if (!isActive && isCompleted) {
    // Completed state - show summary
    return (
      <TouchableOpacity style={styles.completedSection} onPress={onPress}>
        <View style={styles.completedContent}>
          <Text style={styles.sectionLabel}>Location</Text>
          <Text style={styles.sectionValue}>{displayText}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (!isActive && !isCompleted) {
    // Incomplete state
    return (
      <TouchableOpacity style={styles.completedSection} onPress={onPress}>
        <View style={styles.completedContent}>
          <Text style={styles.sectionLabel}>Location</Text>
          <Text style={styles.sectionValue}>None</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (!isActive) {
    return (
        <TouchableOpacity style={styles.section} onPress={onPress}>
        <Text style={styles.sectionLabel}>Location</Text>
        </TouchableOpacity>
    );
}

  // Active state
  return (
    <View style={styles.activeSection}>
      <Text style={styles.sectionTitle}>Where will it take place?</Text>
      
      {/* Location/Flexible Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, !data.isFlexible && styles.toggleButtonActive]}
          onPress={() => handleLocationToggle(true)}
        >
          <Text style={[styles.toggleText, !data.isFlexible && styles.toggleTextActive]}>
            Location
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, data.isFlexible && styles.toggleButtonActive]}
          onPress={() => handleLocationToggle(false)}
        >
          <Text style={[styles.toggleText, data.isFlexible && styles.toggleTextActive]}>
            Flexible
          </Text>
        </TouchableOpacity>
      </View>

      {data.isFlexible && (
        <View style={styles.flexibleDescriptionContainer}>
            <Text style={styles.flexibleDescription}>
            Completely flexible - any location works for you.
            </Text>
        </View>
        )}

      {/* Search Input and Suggestions */}
      {!data.isFlexible && (
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Feather name="search" size={18} color={theme.colors.buttonDisabled} style={{ marginRight: 6 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search locations"
              value={searchText}
              onChangeText={setSearchText}
              onFocus={handleSearchFocus}
              onSubmitEditing={handleSearchSubmit}
              returnKeyType="done"
            />
          </View>

          {/* Suggestions */}
          {showSuggestions && (
            <View style={styles.dropdownContainer}>
              {LOCATION_SUGGESTIONS.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => handleSuggestionSelect(suggestion)}
                > 
                  <Feather name="map-pin" style={styles.pinIcon} />
                  <Text style={styles.dropdownItemText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.clearButton} onPress={onClear}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
  backgroundColor: '#fff',
  borderRadius: 16,
  padding: 20,
  marginBottom: 16,
  marginHorizontal: 8, 
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
},

activeSection: {
  backgroundColor: '#fff',
  borderRadius: 16,
  padding: 20,
  marginBottom: 16,
  marginHorizontal: 8, 
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
},

completedSection: {
  backgroundColor: '#fff',
  borderRadius: 16,
  padding: 20,
  marginBottom: 16,
  marginHorizontal: 8, 
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
},
  completedContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: theme.fonts.bold,
    color: '#000',
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#666',
    marginBottom: 4,
  },
  sectionValue: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: theme.fonts.semibold
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 4,
    marginBottom: 16,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 21,
  },
  toggleButtonActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleText: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#666',
  },
  toggleTextActive: {
    color: '#000',
    fontFamily: theme.fonts.semibold
  },
  searchContainer: {
    marginBottom: 0,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: theme.colors.buttonDisabled,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: theme.spacing.xs,
    
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#000',
  },
  dropdownContainer: {
    position: 'absolute',
    top: '100%', // Position below search input
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1000,
    maxHeight: 120,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  dropdownItemText: {
    fontSize: 16,
    color: theme.colors.onSurface,
    flex: 1,
  },
  pinIcon: {
    fontSize: 16,
    marginRight: 12,
    color: theme.colors.onSurfaceDisabled
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: 4,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  suggestionText: {
    fontSize: 16,
    color: theme.colors.onSurfaceDisabled
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.md,
  },
  clearButton: {
  flex: 1,
  marginRight: 8,
  alignItems: 'center',
  justifyContent: 'center',
},
  clearButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000000',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  saveButton: {
    flex: 1,
    backgroundColor: theme.colors.buttonPrimary,
    paddingVertical: 16,
    borderRadius: 12,
    marginLeft: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#fff',
    textAlign: 'center',
  },

  flexibleDescriptionContainer: {
  backgroundColor: '#f8f9fa',
  borderRadius: 12,
  padding: 16,
  marginBottom: 20,
  borderLeftWidth: 4,
  borderLeftColor: theme.colors.buttonPrimary,
},
flexibleDescription: {
  fontSize: 15,
  color: '#666',
  lineHeight: 20,
  fontStyle: 'italic',
},
});

export default LocationSection;