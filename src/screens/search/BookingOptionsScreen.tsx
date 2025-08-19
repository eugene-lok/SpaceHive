// src/screens/booking/BookingOptionsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import {theme} from '../../theme/theme'

interface BookingOptionsScreenProps {
  onBookRightAway: () => void;
  onRequestMatch: () => void;
  onClose: () => void;
}

const BookingOptionsScreen: React.FC<BookingOptionsScreenProps> = ({
  onBookRightAway,
  onRequestMatch,
  onClose,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      {/* Header */}
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          {/* FIXED: Use icon instead of text character */}
          <MaterialIcons name="close" size={18} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Content */}
      <View style={styles.content}>
        {/* Book Right Away Option */}
        <TouchableOpacity 
          style={styles.optionCard}
          onPress={onBookRightAway}
          activeOpacity={0.7}
        >
          <Text style={styles.optionTitle}>Book right away</Text>
          <Text style={styles.optionDescription}>
            Know what you need? Reserve your space on the spot and get ready to plan.
          </Text>
        </TouchableOpacity>

        {/* Request a Match Option */}
        <TouchableOpacity 
          style={styles.optionCard}
          onPress={onRequestMatch}
          activeOpacity={0.7}
        >
          <Text style={styles.optionTitle}>Request a Match</Text>
          <Text style={styles.optionDescription}>
            Have questions or special requests? Send a request and the best match will get back to you soon.
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: theme.fonts.bold
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  optionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  optionTitle: {
    fontSize: 24,
    fontFamily: theme.fonts.semibold,
    color: '#000',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
});

export default BookingOptionsScreen;