// src/components/booking/BudgetSection.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { theme } from '../../theme/theme';
import Slider from '@react-native-community/slider';

interface BudgetData {
  min: number;
  max: number;
}

interface BudgetSectionProps {
  isActive: boolean;
  isCompleted: boolean;
  data: BudgetData;
  onPress: () => void;
  onUpdate: (data: BudgetData) => void;
  onSave: () => void;
  onClear: () => void;
}

const BudgetSection: React.FC<BudgetSectionProps> = ({
  isActive,
  isCompleted,
  data,
  onPress,
  onUpdate,
  onSave,
  onClear,
}) => {
  const [minInput, setMinInput] = useState(data.min.toString());
  const [maxInput, setMaxInput] = useState(data.max.toString());
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!isDragging) {
      setMinInput(data.min.toString());
      setMaxInput(data.max.toString());
    }
  }, [data.min, data.max, isDragging]);

  const handleMinInputChange = useCallback((text: string) => {
    setMinInput(text);
    const value = parseInt(text) || 0;
    if (value >= 0 && value <= data.max && text !== '') {
      onUpdate({ ...data, min: value });
    }
  }, [data, onUpdate]);

  const handleMaxInputChange = useCallback((text: string) => {
    setMaxInput(text);
    const value = parseInt(text) || 0;
    if (value >= data.min && value <= 200 && text !== '') {
      onUpdate({ ...data, max: value });
    }
  }, [data, onUpdate]);

  const handleMinInputBlur = useCallback(() => {
    const value = parseInt(minInput) || 0;
    const clampedValue = Math.max(0, Math.min(value, data.max));
    setMinInput(clampedValue.toString());
    onUpdate({ ...data, min: clampedValue });
    setIsDragging(false);
  }, [minInput, data, onUpdate]);

  const handleMaxInputBlur = useCallback(() => {
    const value = parseInt(maxInput) || 200;
    const clampedValue = Math.max(data.min, Math.min(value, 200));
    setMaxInput(clampedValue.toString());
    onUpdate({ ...data, max: clampedValue });
    setIsDragging(false);
  }, [maxInput, data, onUpdate]);

  // Slider handlers
  const handleMinSliderChange = useCallback((value: number) => {
    const roundedValue = Math.round(value);
    const clampedValue = Math.min(roundedValue, data.max);
    onUpdate({ ...data, min: clampedValue });
  }, [data, onUpdate]);

  const handleMaxSliderChange = useCallback((value: number) => {
    const roundedValue = Math.round(value);
    const clampedValue = Math.max(roundedValue, data.min);
    onUpdate({ ...data, max: clampedValue });
  }, [data, onUpdate]);

  const handleSliderStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleSliderComplete = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Range Slider Component using two overlaid sliders
  const RangeSliderComponent: React.FC = () => {
    return (
      <View style={styles.rangeSliderContainer}>
        {/* Background track */}
        <View style={styles.sliderTrack} />
        
        {/* Active range indicator */}
        <View 
          style={[
            styles.activeRange,
            {
              left: `${(data.min / 200) * 100}%`,
              width: `${((data.max - data.min) / 200) * 100}%`,
            }
          ]}
        />

        {/* Min value slider */}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={200}
          value={data.min}
          onValueChange={handleMinSliderChange}
          onSlidingStart={handleSliderStart}
          onSlidingComplete={handleSliderComplete}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
        />

        {/* Max value slider */}
        <Slider
          style={[styles.slider, styles.overlaySlider]}
          minimumValue={0}
          maximumValue={200}
          value={data.max}
          onValueChange={handleMaxSliderChange}
          onSlidingStart={handleSliderStart}
          onSlidingComplete={handleSliderComplete}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
        />
      </View>
    );
  };

  if (!isActive && isCompleted) {
    return (
      <TouchableOpacity style={styles.completedSection} onPress={onPress}>
        <View style={styles.completedContent}>
          <Text style={styles.sectionLabel}>Budget</Text>
          <Text style={styles.sectionValue}>
            {data.min === 0 && data.max === 0 
              ? 'No budget set' 
              : `$${data.min} - ${data.max} per hour`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (!isActive && !isCompleted) {
    return (
      <TouchableOpacity style={styles.completedSection} onPress={onPress}>
        <View style={styles.completedContent}>
          <Text style={styles.sectionLabel}>Budget</Text>
          <Text style={styles.sectionValue}>
            {data.min === 0 && data.max === 0 
              ? 'No budget set' 
              : `$${data.min} - ${data.max} per hour`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.activeSection}>
          <Text style={styles.sectionTitle}>What is your hourly budget?</Text>
          
          <Text style={styles.subtitle}>Price range (per hour)</Text>
          
          {/* Price Range Display */}
          <View style={styles.priceRangeContainer}>
            <Text style={styles.priceLabel}>Min: ${data.min}</Text>
            <Text style={styles.priceLabel}>Max: ${data.max}</Text>
          </View>

          {/* Draggable Range Slider */}
          {/* Uncomment if you want to enable the slider
          <View style={styles.sliderWrapper}>
            <RangeSliderComponent />
          </View>
          */}

          {/* Manual Input Fields */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.priceInput}
              value={minInput}
              onChangeText={handleMinInputChange}
              onBlur={handleMinInputBlur}
              onFocus={() => setIsDragging(true)}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#999"
              returnKeyType="next"
              blurOnSubmit={false}
            />
            <Text style={styles.inputSeparator}>~</Text>
            <TextInput
              style={styles.priceInput}
              value={maxInput}
              onChangeText={handleMaxInputChange}
              onBlur={handleMaxInputBlur}
              onFocus={() => setIsDragging(true)}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor="#999"
              returnKeyType="done"
            />
          </View>

          {/* Action Buttons - Will always stay visible above keyboard */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.clearButton} onPress={onClear}>
              <Text style={styles.clearButtonText}>Clear All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={onSave}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    marginHorizontal: 8, 
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
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.onSurface,
    marginBottom: 20,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: '#000',
  },
  sliderWrapper: {
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  // Range slider styles
  rangeSliderContainer: {
    height: 40,
    justifyContent: 'center',
    position: 'relative',
  },
  slider: {
    position: 'absolute',
    width: '100%',
    height: 40,
  },
  overlaySlider: {
    // Second slider overlays the first
  },
  sliderTrack: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    width: '100%',
    top: '50%',
    marginTop: -2,
  },
  activeRange: {
    position: 'absolute',
    height: 4,
    backgroundColor: theme.colors.buttonPrimary,
    borderRadius: 2,
    top: '50%',
    marginTop: -2,
    zIndex: 1,
  },
  trackStyle: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  thumbStyle: {
    width: 20,
    height: 20,
    backgroundColor: theme.colors.buttonPrimary,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32, // Increased spacing before buttons
    paddingHorizontal: 20, // Add horizontal padding for better mobile layout
  },
  priceInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: theme.spacing.sm,
    fontSize: 16,
    textAlign: 'center', // Center text for better mobile UX
    minWidth: 100, // Increased min width for easier tapping
    minHeight: 44, // Minimum touch target size for mobile
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: theme.colors.buttonDisabled,
    // Add focus styles
    ...(Platform.OS === 'ios' && {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    }),
    ...(Platform.OS === 'android' && {
      elevation: 2,
    }),
  },
  inputSeparator: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginHorizontal: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 16, // Add padding to ensure it's not too close to inputs
    // Ensure buttons stay visible above keyboard
    minHeight: 60,
  },
  clearButton: {
    flex: 1,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 44, // Minimum touch target
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
    minHeight: 44, // Minimum touch target
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

export default BudgetSection;