// components/GuestsSection.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { theme } from '../../theme/theme';

interface GuestsData {
  adults: number;
  children: number;
  infants: number;
}

interface GuestsSectionProps {
  isActive: boolean;
  isCompleted: boolean;
  displayText: string;
  data: GuestsData;
  onPress: () => void;
  onUpdate: (data: GuestsData) => void;
  onSave: () => void;
  onClear: () => void;
}

const GuestsSection: React.FC<GuestsSectionProps> = ({
  isActive,
  isCompleted,
  displayText,
  data,
  onPress,
  onUpdate,
  onSave,
  onClear,
}) => {
  const updateGuestCount = (type: keyof GuestsData, increment: boolean) => {
    const newData = { ...data };
    const currentValue = newData[type];
    
    if (increment) {
      newData[type] = currentValue + 1;
    } else {
      // Prevent adults from going below 1, others below 0
      const minValue = type === 'adults' ? 1 : 0;
      newData[type] = Math.max(minValue, currentValue - 1);
    }
    
    onUpdate(newData);
  };

  const CounterRow: React.FC<{
    title: string;
    subtitle: string;
    value: number;
    onIncrement: () => void;
    onDecrement: () => void;
    canDecrement: boolean;
  }> = ({ title, subtitle, value, onIncrement, onDecrement, canDecrement }) => (
    <View style={styles.counterRow}>
      <View style={styles.counterInfo}>
        <Text style={styles.counterTitle}>{title}</Text>
        <Text style={styles.counterSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.counterControls}>
        <TouchableOpacity
          style={[styles.counterButton, !canDecrement && styles.counterButtonDisabled]}
          onPress={onDecrement}
          disabled={!canDecrement}
        >
          <Text style={[styles.counterButtonText, !canDecrement && styles.counterButtonTextDisabled]}>
            −
          </Text>
        </TouchableOpacity>
        <Text style={styles.counterValue}>{value}</Text>
        <TouchableOpacity style={styles.counterButton} onPress={onIncrement}>
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!isActive && isCompleted) {
    return (
      <TouchableOpacity style={styles.completedSection} onPress={onPress}>
        <View style={styles.completedContent}>
          <Text style={styles.sectionLabel}>Guests</Text>
          <Text style={styles.sectionValue}>{displayText}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (!isActive) {
    return (
      <TouchableOpacity style={styles.section} onPress={onPress}>
        <Text style={styles.sectionTitle}>How many people?</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.activeSection}>
      <Text style={styles.sectionTitle}>How many people?</Text>
      
      <View style={styles.countersContainer}>
        <CounterRow
          title="Adults"
          subtitle="Ages 13 or above"
          value={data.adults}
          onIncrement={() => updateGuestCount('adults', true)}
          onDecrement={() => updateGuestCount('adults', false)}
          canDecrement={data.adults > 1}
        />
        
        <CounterRow
          title="Children"
          subtitle="Ages 2-12"
          value={data.children}
          onIncrement={() => updateGuestCount('children', true)}
          onDecrement={() => updateGuestCount('children', false)}
          canDecrement={data.children > 0}
        />
        
        <CounterRow
          title="Infants"
          subtitle="Under 2"
          value={data.infants}
          onIncrement={() => updateGuestCount('infants', true)}
          onDecrement={() => updateGuestCount('infants', false)}
          canDecrement={data.infants > 0}
        />
      </View>

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
    marginBottom: theme.spacing.sm,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#666',
    marginBottom: 4,
  },
  sectionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  countersContainer: {
    marginBottom: 24,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  counterInfo: {
    flex: 1,
  },
  counterTitle: {
    fontSize: 18,
    fontFamily: theme.fonts.medium,
    color: '#000',
    marginBottom: 4,
  },
  counterSubtitle: {
    fontSize: 12,
    color: '#888',
    fontFamily: theme.fonts.bold
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  counterButtonDisabled: {
    backgroundColor: '#fff',
    borderColor: '#eee',
  },
  counterButtonText: {
    fontSize: 28,
    fontFamily: theme.fonts.medium,
    color: '#000',
    lineHeight: 28
  },
  counterButtonTextDisabled: {
    color: '#ccc',
  },
  counterValue: {
    fontSize: 18,
    fontFamily: theme.fonts.medium,
    color: '#000',
    marginHorizontal: 16,
    minWidth: 20,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0,
  },
  clearButton: {
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#000',
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
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

export default GuestsSection;