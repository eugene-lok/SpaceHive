// src/components/match-request/NotesStep.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MatchRequestData } from '../../screens/search/MatchRequestScreen';
import { theme } from '../../theme/theme';

interface NotesStepProps {
  data: MatchRequestData;
  onUpdate: (updates: Partial<MatchRequestData>) => void;
  onNext: () => void;
  onBack: () => void;
  canProceed: boolean;
  buttonText: string;
}

const NotesStep: React.FC<NotesStepProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
  canProceed,
  buttonText,
}) => {
  const handleNotesChange = (notes: string) => {
    onUpdate({ notes });
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          Any additional notes or special requests?
        </Text>
        
        <View style={styles.textFieldContainer}>
          <TextInput
            style={styles.textField}
            multiline
            placeholder="Type Here"
            placeholderTextColor="#999"
            value={data.notes}
            onChangeText={handleNotesChange}
            textAlignVertical="top"
            maxLength={500}
          />
          <Text style={styles.characterCount}>
            {data.notes.length}/500
          </Text>
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
    </KeyboardAvoidingView>
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
  textFieldContainer: {
    position: 'relative',
  },
  textField: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 40, // Extra space for character count
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#000',
    minHeight: 120,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  characterCount: {
    position: 'absolute',
    bottom: 12,
    right: 16,
    fontSize: 12,
    fontFamily: theme.fonts.medium,
    color: '#999',
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
    fontSize: 18,
    fontFamily: theme.fonts.semibold,
    color: '#fff',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#000',
    paddingVertical: 18,
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.semibold,
    color: '#fff',
    textAlign: 'center',
  },
});

export default NotesStep;