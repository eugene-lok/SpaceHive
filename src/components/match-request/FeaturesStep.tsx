// src/components/match-request/FeaturesStep.tsx
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

interface FeaturesStepProps {
  data: MatchRequestData;
  onUpdate: (updates: Partial<MatchRequestData>) => void;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
  buttonText: string;
}

const FEATURES = [
  'Soundproof',
  'Pet-friendly',
  'Kitchen Access',
  'Outdoor Space',
  'AV Equipment',
  'Parking',
];

const FeaturesStep: React.FC<FeaturesStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
  canProceed,
  buttonText,
}) => {
  const handleFeatureToggle = (feature: string) => {
    const currentFeatures = data.features || [];
    const updatedFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter(f => f !== feature)
      : [...currentFeatures, feature];
    
    onUpdate({ features: updatedFeatures });
  };

  const isFeatureSelected = (feature: string) => {
    return data.features?.includes(feature) || false;
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Any must-have features for your space?</Text>
        
        <View style={styles.featuresContainer}>
          {FEATURES.map((feature) => (
            <TouchableOpacity
              key={feature}
              style={[
                styles.featureItem,
                isFeatureSelected(feature) && styles.featureItemSelected
              ]}
              onPress={() => handleFeatureToggle(feature)}
            >
              <View style={[
                styles.checkbox,
                isFeatureSelected(feature) && styles.checkboxSelected
              ]}>
                {isFeatureSelected(feature) && (
                  <CheckIcon size={16} color="#fff" weight="bold" />
                )}
              </View>
              <Text style={[
                styles.featureText,
                isFeatureSelected(feature) && styles.featureTextSelected
              ]}>
                {feature}
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
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 140,
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: '#000',
    marginBottom: 24,
    lineHeight: 34,
  },
  featuresContainer: {
    gap: 16,
  },
  featureItem: {
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
  featureItemSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: '#F0F8F8',
    borderRadius: 8 
  },
  checkbox: {
    width: 24,
    height: 24,
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
  featureText: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: theme.colors.onSurface,
    flex: 1,
  },
  featureTextSelected: {
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

export default FeaturesStep;