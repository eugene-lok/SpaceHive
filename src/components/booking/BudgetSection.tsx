// src/components/booking/BudgetSection.tsx
import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
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
  allSectionsComplete: boolean;
}

const BudgetSection: React.FC<BudgetSectionProps> = ({
  isActive,
  isCompleted,
  data,
  onPress,
  onUpdate,
  onSave,
  onClear,
  allSectionsComplete,
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
          //thumbStyle={styles.thumbStyle}
          //trackStyle={styles.trackStyle}
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
          //thumbStyle={styles.thumbStyle}
          //trackStyle={styles.trackStyle}
        />
      </View>
    );
  };

  if (!isActive && isCompleted) {
    return (
      <TouchableOpacity style={styles.completedSection} onPress={onPress}>
        <View style={styles.completedContent}>
          <Text style={styles.sectionLabel}>Budget</Text>
          <Text style={styles.sectionValue}>${data.min} - ${data.max} per hour</Text>
        </View>
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (!isActive) {
    return (
      <TouchableOpacity style={styles.section} onPress={onPress}>
        <Text style={styles.sectionTitle}>Budget</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.activeSection}>
      <Text style={styles.sectionTitle}>What is your hourly budget?</Text>
      
      <Text style={styles.subtitle}>Price range (per hour)</Text>
      
      {/* Price Range Display */}
      <View style={styles.priceRangeContainer}>
        <Text style={styles.priceLabel}>Min: ${data.min}</Text>
        <Text style={styles.priceLabel}>Max: ${data.max}</Text>
      </View>

      {/* Draggable Range Slider */}
      {/* <View style={styles.sliderWrapper}>
        <RangeSliderComponent />
      </View> */}

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
        />
        <Text style={styles.inputSeparator}>~</Text>
        <TextInput
          style={styles.priceInput}
          value={maxInput}
          onChangeText={handleMaxInputChange}
          onBlur={handleMaxInputBlur}
          onFocus={() => setIsDragging(true)}
          keyboardType="numeric"
          placeholder="200"
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.clearButton} onPress={onClear}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.saveButton, 
            allSectionsComplete && styles.searchButton
          ]} 
          onPress={onSave}
        >
          <Text style={styles.saveButtonText}>
            {allSectionsComplete ? 'Search' : 'Save'}
          </Text>
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
  marginHorizontal: 4, 
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
  marginHorizontal: 4, 
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
  marginHorizontal: 4, 
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
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 4,
  },
  sectionValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 20,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: '600',
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
    backgroundColor: '#4CAF50',
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
    backgroundColor: '#4CAF50',
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
    marginBottom: 24,
  },
  priceInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    textAlign: 'center',
    minWidth: 80,
    marginHorizontal: 8,
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
    marginTop: 20,
  },
  clearButton: {
    flex: 1,
    marginRight: 8,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    marginLeft: 8,
  },
  searchButton: {
    backgroundColor: '#2196F3',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

export default BudgetSection;