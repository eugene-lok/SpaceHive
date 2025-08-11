// components/BudgetSection.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

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
  const [sliderWidth, setSliderWidth] = useState(300);

  useEffect(() => {
    setMinInput(data.min.toString());
    setMaxInput(data.max.toString());
  }, [data.min, data.max]);

  const handleMinInputChange = (text: string) => {
    setMinInput(text);
    const value = parseInt(text) || 0;
    if (value >= 0 && value <= data.max) {
      onUpdate({ ...data, min: value });
    }
  };

  const handleMaxInputChange = (text: string) => {
    setMaxInput(text);
    const value = parseInt(text) || 0;
    if (value >= data.min && value <= 200) {
      onUpdate({ ...data, max: value });
    }
  };

  const handleSliderLayout = (event: any) => {
    setSliderWidth(event.nativeEvent.layout.width);
  };

  // Simple slider implementation without external dependencies
  const SliderComponent: React.FC = () => {
    const minPosition = (data.min / 200) * sliderWidth;
    const maxPosition = (data.max / 200) * sliderWidth;

    return (
      <View style={styles.sliderContainer} onLayout={handleSliderLayout}>
        <View style={styles.sliderTrack} />
        <View 
          style={[
            styles.sliderActiveTrack, 
            { 
              left: minPosition,
              width: maxPosition - minPosition 
            }
          ]} 
        />
        <View style={[styles.sliderThumb, { left: minPosition - 10 }]} />
        <View style={[styles.sliderThumb, { left: maxPosition - 10 }]} />
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
        <Text style={styles.sectionTitle}>What is your hourly budget?</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.activeSection}>
      <Text style={styles.sectionTitle}>What is your hourly budget?</Text>
      
      <Text style={styles.subtitle}>Price range (per hour)</Text>
      
      {/* Price Range Display */}
      <View style={styles.priceRangeContainer}>
        <Text style={styles.priceLabel}>${data.min}</Text>
        <Text style={styles.priceLabel}>${data.max}</Text>
      </View>

      {/* Slider */}
      <View style={styles.sliderWrapper}>
        <SliderComponent />
      </View>

      {/* Manual Input Fields */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.priceInput}
          value={minInput}
          onChangeText={handleMinInputChange}
          keyboardType="numeric"
          placeholder="0"
        />
        <Text style={styles.inputSeparator}>~</Text>
        <TextInput
          style={styles.priceInput}
          value={maxInput}
          onChangeText={handleMaxInputChange}
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
  sliderContainer: {
    height: 20,
    justifyContent: 'center',
    position: 'relative',
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
  },
  sliderActiveTrack: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#4CAF50',
    borderRadius: 2,
  },
  sliderThumb: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    top: -8,
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