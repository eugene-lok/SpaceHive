// src/components/match-request/VibeStep.tsx - Updated with fallback images
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { MatchRequestData } from '../../screens/search/MatchRequestScreen';
import { theme } from '../../theme/theme';

interface VibeStepProps {
  data: MatchRequestData;
  onUpdate: (updates: Partial<MatchRequestData>) => void;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
  buttonText: string;
}

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = (screenWidth - 60) / 2; // Account for padding and gap

// Image placeholder component
const ImagePlaceholder: React.FC<{ title: string; color: string }> = ({ title, color }) => (
  <View style={[styles.imagePlaceholder, { backgroundColor: color }]}>
    <Text style={styles.placeholderText}>{title}</Text>
  </View>
);

const VIBES = [
  {
    id: 'modern-minimal',
    title: 'Modern &\nMinimal',
    color: '#E8F1F5', // Light blue-gray
  },
  {
    id: 'cozy-warm',
    title: 'Cozy &\nWarm',
    color: '#F5E6D3', // Warm beige
  },
  {
    id: 'bold-colorful',
    title: 'Bold &\nColorful',
    color: '#F0E6F7', // Light purple
  },
  {
    id: 'outdoorsy-natural',
    title: 'Outdoorsy &\nNatural',
    color: '#E6F4EA', // Light green
  },
];

const VibeStep: React.FC<VibeStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
  canProceed,
  buttonText,
}) => {
  const handleVibeSelect = (vibeId: string) => {
    onUpdate({ vibe: vibeId });
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>What vibe are you looking for?</Text>
        
        <View style={styles.vibesGrid}>
          {VIBES.map((vibe) => (
            <TouchableOpacity
              key={vibe.id}
              style={[
                styles.vibeCard,
                data.vibe === vibe.id && styles.vibeCardSelected
              ]}
              onPress={() => handleVibeSelect(vibe.id)}
            >
              <ImagePlaceholder title={vibe.title} color={vibe.color} />
              <View style={styles.vibeOverlay}>
                <Text style={styles.vibeTitle}>{vibe.title}</Text>
              </View>
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
  vibesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  vibeCard: {
    width: cardWidth,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  vibeCardSelected: {
    borderColor: theme.colors.primary,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#666',
    textAlign: 'center',
    opacity: 0.5,
  },
  vibeOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  vibeTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.bold,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 20,
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

export default VibeStep;