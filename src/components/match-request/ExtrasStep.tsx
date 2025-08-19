// src/components/match-request/ExtrasStep.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { CheckIcon } from 'phosphor-react-native';
import { MatchRequestData } from '../../screens/search/MatchRequestScreen';
import { theme } from '../../theme/theme';

interface ExtrasStepProps {
  data: MatchRequestData;
  onUpdate: (updates: Partial<MatchRequestData>) => void;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
  buttonText: string;
}

const EXTRAS = [
  'Photographer',
  'String Lights Setup',
  'Decor Packages',
  'Catering',
];

const ExtrasStep: React.FC<ExtrasStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
  canProceed,
  buttonText,
}) => {
  const handleExtraToggle = (extra: string) => {
    const currentExtras = data.extras || [];
    const updatedExtras = currentExtras.includes(extra)
      ? currentExtras.filter(e => e !== extra)
      : [...currentExtras, extra];
    
    onUpdate({ extras: updatedExtras });
  };

  const isExtraSelected = (extra: string) => {
    return data.extras?.includes(extra) || false;
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>
          Want to include any of these extras? (Optional)
        </Text>
        
        <View style={styles.extrasContainer}>
          {EXTRAS.map((extra) => (
            <TouchableOpacity
              key={extra}
              style={[
                styles.extraItem,
                isExtraSelected(extra) && styles.extraItemSelected
              ]}
              onPress={() => handleExtraToggle(extra)}
            >
              <View style={[
                styles.checkbox,
                isExtraSelected(extra) && styles.checkboxSelected
              ]}>
                {isExtraSelected(extra) && (
                  <CheckIcon size={16} color="#fff" weight="bold" />
                )}
              </View>
              <Text style={[
                styles.extraText,
                isExtraSelected(extra) && styles.extraTextSelected
              ]}>
                {extra}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={onNext}
        >
          <Text style={styles.nextButtonText}>
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
  extrasContainer: {
    gap: 16,
  },
  extraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 18,
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
  extraItemSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: '#F0F8F8',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  checkboxSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  extraText: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#000',
    flex: 1,
  },
  extraTextSelected: {
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

export default ExtrasStep;