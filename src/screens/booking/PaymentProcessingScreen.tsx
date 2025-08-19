// src/screens/booking/PaymentProcessingScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { XIcon, ArrowLeftIcon } from 'phosphor-react-native';
import { RootStackParamList } from '../../../App';
import { theme } from '../../theme/theme';

type PaymentProcessingNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentProcessing'>;
type PaymentProcessingRouteProp = RouteProp<RootStackParamList, 'PaymentProcessing'>;

interface PaymentProcessingScreenProps {
  navigation: PaymentProcessingNavigationProp;
  route: PaymentProcessingRouteProp;
}

interface PaymentMethod {
  id: string;
  name: string;
  displayName: string;
  icon: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'visa',
    name: 'Visa',
    displayName: '•••• •••• •••• 1234',
    icon: 'VISA',
  },
  {
    id: 'apple_pay',
    name: 'Apple Pay',
    displayName: 'Apple Pay',
    icon: '🍎',
  },
  {
    id: 'google_pay',
    name: 'Google Pay', 
    displayName: 'Google Pay', 
    icon: 'G',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    displayName: 'PayPal',
    icon: 'PP',
  },
];

const PaymentProcessingScreen: React.FC<PaymentProcessingScreenProps> = ({
  navigation,
  route,
}) => {
  const { location, formData, customDetails } = route.params;
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showPinInput, setShowPinInput] = useState(false);
  const [pin, setPin] = useState(['', '', '', '']);
  const pinRefs = useRef<(TextInput | null)[]>([]);

  const handleClose = () => {
    navigation.navigate('Home');
  };

  const handleMatchRequest = () => {
    const deserializedFormData = {
      ...formData,
      dateTime: {
        ...formData.dateTime,
        date: formData.dateTime.date ? new Date(formData.dateTime.date) : null,
      },
    };
    
    navigation.navigate('MatchRequest', {
      formData: deserializedFormData,
    });
  };

  const handleGoBack = () => {
    if (showPinInput) {
      setShowPinInput(false);
      setPin(['', '', '', '']);
    } else {
      navigation.goBack();
    }
  };

  const handlePaymentSelect = (paymentId: string) => {
    setSelectedPayment(paymentId);
  };

  const handlePayNow = () => {
    setShowPinInput(true);
  };

  const handlePinChange = (value: string, index: number) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto-advance to next input
    if (value && index < 3) {
      pinRefs.current[index + 1]?.focus();
    }

    // Check if PIN is complete
    if (newPin.every(digit => digit !== '') && index === 3) {
      // PIN complete, proceed to confirmation
      handlePinComplete();
    }
  };

  const handlePinKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !pin[index] && index > 0) {
      // Move to previous input if current is empty
      pinRefs.current[index - 1]?.focus();
    }
  };

  const handlePinComplete = () => {
    const selectedPaymentMethod = PAYMENT_METHODS.find(p => p.id === selectedPayment)?.name || 'Apple Pay';
    
    navigation.navigate('InstantBookingConfirmation', {
      location,
      formData,
      customDetails,
      paymentMethod: selectedPaymentMethod,
    });
  };

  const renderPaymentMethods = () => (
    <>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.subtitle}>How would you like to pay?</Text>
      
      <View style={styles.paymentMethodsContainer}>
        {PAYMENT_METHODS.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentMethod,
              selectedPayment === method.id && styles.paymentMethodSelected,
            ]}
            onPress={() => handlePaymentSelect(method.id)}
          >
            <View style={styles.paymentIcon}>
              <Text style={styles.paymentIconText}>{method.icon}</Text>
            </View>
            <Text style={styles.paymentMethodText}>{method.displayName}</Text>
            <View style={[
              styles.radioButton,
              selectedPayment === method.id && styles.radioButtonSelected,
            ]}>
              {selectedPayment === method.id && <View style={styles.radioButtonInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  const renderPinInput = () => (
    <>
      <Text style={styles.title}>Payment</Text>
      <Text style={styles.subtitle}>Enter your PIN to confirm payment.</Text>
      
      <View style={styles.pinContainer}>
        {pin.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (pinRefs.current[index] = ref)}
            style={[
              styles.pinInput,
              digit ? styles.pinInputFilled : undefined,
            ]}
            value={digit}
            onChangeText={(value) => handlePinChange(value, index)}
            onKeyPress={({ nativeEvent }) => handlePinKeyPress(nativeEvent.key, index)}
            keyboardType="number-pad"
            maxLength={1}
            textAlign="center"
            secureTextEntry
            autoFocus={index === 0}
          />
        ))}
      </View>
    </>
  );

  const getButtonText = () => {
    if (showPinInput) return 'Processing...';
    return selectedPayment ? 'Pay Now' : 'Next';
  };

  const getButtonHandler = () => {
    if (showPinInput) return () => {}; // PIN auto-completes
    return selectedPayment ? handlePayNow : () => {};
  };

  const isButtonDisabled = () => {
    if (showPinInput) return true; // PIN input handles completion
    return !selectedPayment;
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* Header */}
      <SafeAreaView style={styles.header}>
        <View style={styles.headerTabs}>
          <TouchableOpacity>
            <Text style={styles.activeTab}>Instant Book</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleMatchRequest}>
            <Text style={styles.inactiveTab}>Match Request</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <XIcon size={18} color="#fff" weight="bold" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Content */}
      <ScrollView 
        style={styles.content} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {showPinInput ? renderPinInput() : renderPaymentMethods()}
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity 
          style={[
            styles.nextButton,
            isButtonDisabled() && styles.nextButtonDisabled,
          ]}
          onPress={getButtonHandler()}
          disabled={isButtonDisabled()}
        >
          <Text style={[
            styles.nextButtonText,
            isButtonDisabled() && styles.nextButtonTextDisabled,
          ]}>
            {getButtonText()}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleGoBack}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f5f5f5',
    position: 'relative'
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
    top: 40,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120, // Space for floating buttons
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.bold,
    color: '#000',
    marginBottom: 16,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#000',
    marginBottom: 32,
  },
  paymentMethodsContainer: {
    gap: 16,
  },
  paymentMethod: {
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
  paymentMethodSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: '#F0F8F8',
  },
  paymentIcon: {
    width: 48,
    height: 32,
    backgroundColor: '#1976D2', // Visa blue
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  paymentIconText: {
    fontSize: 12,
    fontFamily: theme.fonts.bold,
    color: '#fff',
  },
  paymentMethodText: {
    flex: 1,
    fontSize: 16,
    fontFamily: theme.fonts.medium,
    color: '#000',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: theme.colors.primary,
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.primary,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 40,
    marginBottom: 40,
  },
  pinInput: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    fontSize: 24,
    fontFamily: theme.fonts.bold,
    color: '#000',
  },
  pinInputFilled: {
    borderColor: theme.colors.primary,
    backgroundColor: '#F0F8F8',
  },
  bottomButtons: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
    backgroundColor: '#B0B0B0',
  },
  nextButtonText: {
    fontSize: 18,
    fontFamily: theme.fonts.semibold,
    color: '#fff',
    textAlign: 'center',
  },
  nextButtonTextDisabled: {
    opacity: 0.7,
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

export default PaymentProcessingScreen;