// src/components/match-request/FlexibilityStep.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { MatchRequestData } from '../../screens/search/MatchRequestScreen';
import { theme } from '../../theme/theme';

interface FlexibilityStepProps {
  data: MatchRequestData;
  onUpdate: (updates: Partial<MatchRequestData>) => void;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
  buttonText: string;
}

const FLEXIBILITY_OPTIONS = [
  {
    id: 'open-to-suggestions',
    title: 'Open to suggestions',
  },
  {
    id: 'slightly-flexible',
    title: 'Slightly flexible',
  },
  {
    id: 'not-flexible',
    title: 'Not flexible at all',
  },
];

const FlexibilityStep: React.FC<FlexibilityStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
  canProceed,
  buttonText,
}) => {
  const handleFlexibilitySelect = (flexibility: string) => {
    onUpdate({ flexibility });
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          How flexible are you with date, location, or budget?
        </Text>
        
        <View style={styles.optionsContainer}>
          {FLEXIBILITY_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionItem,
                data.flexibility === option.id && styles.optionItemSelected
              ]}
              onPress={() => handleFlexibilitySelect(option.id)}
            >
              <View style={[
                styles.radioButton,
                data.flexibility === option.id && styles.radioButtonSelected
              ]}>
                {data.flexibility === option.id && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text style={[
                styles.optionText,
                data.flexibility === option.id && styles.optionTextSelected
              ]}>
                {option.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity 
          style={[
            styles.nextButton,
            !canProceed && styles.nextButtonDisabled
          ]}
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
  optionsContainer: {
    gap: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionItemSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: '#F0F8F8',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  radioButtonSelected: {
    borderColor: theme.colors.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  optionText: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#000',
    flex: 1,
  },
  optionTextSelected: {
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
  nextButtonDisabled: {
    backgroundColor: '#B2B2B2',
  },
  nextButtonText: {
    fontSize: 22,
    fontFamily: theme.fonts.bold,
    color: '#fff',
    textAlign: 'center',
  },
  nextButtonTextDisabled: {
    opacity: 0.7,
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

export default FlexibilityStep;