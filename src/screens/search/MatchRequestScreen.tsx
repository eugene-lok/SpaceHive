// src/screens/search/MatchRequestScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { XIcon, CheckIcon } from 'phosphor-react-native';
import { RootStackParamList, SerializableBookingFormData } from '../../../App';
import { BookingFormData } from '../../types/booking';
import { theme } from '../../theme/theme';

// Import child components
import EventTypeStep from '../../components/match-request/EventTypeStep';
import FeaturesStep from '../../components/match-request/FeaturesStep';
import VibeStep from '../../components/match-request/VibeStep';
import FlexibilityStep from '../../components/match-request/FlexibilityStep';
import ExtrasStep from '../../components/match-request/ExtrasStep';
import TimelineStep from '../../components/match-request/TimelineStep';
import NotesStep from '../../components/match-request/NotesStep';
import ReviewStep from '../../components/match-request/ReviewStep';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type MatchRequestNavigationProp = StackNavigationProp<RootStackParamList, 'MatchRequest'>;
type MatchRequestRouteProp = RouteProp<RootStackParamList, 'MatchRequest'>;

interface MatchRequestScreenProps {
  navigation: MatchRequestNavigationProp;
  route: MatchRequestRouteProp;
}

export interface MatchRequestData {
  eventType: string | null;
  features: string[];
  vibe: string | null;
  flexibility: string | null;
  extras: string[];
  timeline: string | null;
  notes: string;
}

const INITIAL_MATCH_REQUEST_DATA: MatchRequestData = {
  eventType: null,
  features: [],
  vibe: null,
  flexibility: null,
  extras: [],
  timeline: null,
  notes: '',
};

const MatchRequestScreen: React.FC<MatchRequestScreenProps> = ({
  navigation,
  route,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [matchRequestData, setMatchRequestData] = useState<MatchRequestData>(INITIAL_MATCH_REQUEST_DATA);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const formData = route.params.formData;

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      // Go back to BookingFormScreen
      navigation.goBack();
    }
  };

  const handleClose = () => {
    navigation.navigate('Home');
  };

  const handleInstantBook = () => {
    // Navigate to InstantBookingScreen with the form data
    const serializableFormData: SerializableBookingFormData = {
      ...formData,
      dateTime: {
        ...formData.dateTime,
        date: formData.dateTime.date?.toISOString() || null,
      },
    };
    
    navigation.navigate('InstantBooking', {
      formData: serializableFormData,
    });
  };

  const handleSendRequest = () => {
    console.log('Sending match request:', { formData, matchRequestData });
    setShowSuccessModal(true);
  };

  const handleBackToSearch = () => {
    setShowSuccessModal(false);
    navigation.navigate('Home');
  };

  const updateMatchRequestData = (updates: Partial<MatchRequestData>) => {
    setMatchRequestData(prev => ({ ...prev, ...updates }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0: // Event Type
        return matchRequestData.eventType !== null;
      case 1: // Features
        return true; // Optional
      case 2: // Vibe
        return matchRequestData.vibe !== null;
      case 3: // Flexibility
        return matchRequestData.flexibility !== null;
      case 4: // Extras
        return true; // Optional
      case 5: // Timeline
        return true; // Optional
      case 6: // Notes
        return true; // Optional
      case 7: // Review
        return true;
      default:
        return false;
    }
  };

  const getButtonText = () => {
    if (currentStep === 6) return 'Review';
    if (currentStep === 7) return 'Send Request';
    return 'Next';
  };

  const canProceed = () => {
    if (currentStep === 3) {
      // Flexibility step - must choose one option
      return matchRequestData.flexibility !== null;
    }
    return isStepValid();
  };

  const renderCurrentStep = () => {
    const stepProps = {
      data: matchRequestData,
      onUpdate: updateMatchRequestData,
      onNext: handleNext,
      onBack: handleBack,
      canProceed: canProceed(),
      buttonText: getButtonText(),
    };

    switch (currentStep) {
      case 0:
        return <EventTypeStep {...stepProps} />;
      case 1:
        return <FeaturesStep {...stepProps} />;
      case 2:
        return <VibeStep {...stepProps} />;
      case 3:
        return <FlexibilityStep {...stepProps} />;
      case 4:
        return <ExtrasStep {...stepProps} />;
      case 5:
        return <TimelineStep {...stepProps} />;
      case 6:
        return <NotesStep {...stepProps} />;
      case 7:
        return (
          <ReviewStep 
            {...stepProps}
            formData={formData}
            onSendRequest={handleSendRequest}
          />
        );
      default:
        return <EventTypeStep {...stepProps} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* Header */}
      <SafeAreaView style={styles.header}>
        <View style={styles.headerTabs}>
          <TouchableOpacity onPress={handleInstantBook}>
            <Text style={styles.inactiveTab}>Instant Book</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.activeTab}>Match Request</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <XIcon size={18} color="#fff" weight="bold" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Content */}
      <View style={styles.content}>
        {renderCurrentStep()}
      </View>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.blurView} />
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.modalCloseButton}
              onPress={() => setShowSuccessModal(false)}
            >
              <XIcon size={20} color="#000" weight="bold" />
            </TouchableOpacity>
            
            <View style={styles.successIcon}>
              <CheckIcon size={32} color="#fff" weight="bold" />
            </View>
            
            <Text style={styles.modalTitle}>Request Sent!</Text>
            <Text style={styles.modalSubtitle}>
              We've notified the venue owners.{'\n'}You'll hear back soon!
            </Text>
            
            <TouchableOpacity 
              style={styles.backToSearchButton}
              onPress={handleBackToSearch}
            >
              <Text style={styles.backToSearchText}>Back to Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
  },
  headerTabs: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTab: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    textDecorationLine: 'underline',
    marginRight: 20,
  },
  inactiveTab: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#999',
    marginRight: 20,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#27B837',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: '#000',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  backToSearchButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    minWidth: 200,
  },
  backToSearchText: {
    fontSize: 16,
    fontFamily: theme.fonts.semibold,
    color: '#fff',
    textAlign: 'center',
  },
});

export default MatchRequestScreen;