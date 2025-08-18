// src/screens/BookingsScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { UserBooking, MOCK_USER_BOOKINGS } from '../types/userBooking';
import BookingCard from '../components/BookingCard';
import BottomNavigation from '../components/BottomNavigation';
import { theme } from '../theme/theme';

type BookingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Bookings'>;

interface BookingsScreenProps {
  navigation: BookingsScreenNavigationProp;
}

type FilterType = 'all' | 'upcoming' | 'pending' | 'past';

const BookingsScreen: React.FC<BookingsScreenProps> = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [activeTab, setActiveTab] = useState('bookings');

  useFocusEffect(
    React.useCallback(() => {
      setActiveTab('bookings');
    }, [])
  );

  const filterOptions: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'pending', label: 'Pending' },
    { key: 'past', label: 'Past' },
  ];

  const getFilteredBookings = (): UserBooking[] => {
    if (activeFilter === 'all') {
      return MOCK_USER_BOOKINGS;
    }
    return MOCK_USER_BOOKINGS.filter(booking => booking.status === activeFilter);
  };

  const handleFilterPress = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  const handleTabPress = (tabId: string) => {
  setActiveTab(tabId);
    console.log('Tab pressed:', tabId);
    
    switch (tabId) {
      case 'search':
        navigation.navigate('Home');
        break;
      case 'bookings':
        navigation.navigate('Bookings');
        break;
      case 'saved':
        navigation.navigate('Placeholder', { activeTab: 'saved' });
        break;
      case 'messages':
        navigation.navigate('Placeholder', { activeTab: 'messages' });
        break;
      case 'profile':
        navigation.navigate('Placeholder', { activeTab: 'profile' });
        break;
      default:
        break;
    }
  };

  const filteredBookings = getFilteredBookings();
  const isAllView = activeFilter === 'all';

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <SafeAreaView edges={['top']} style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Bookings</Text>
      </SafeAreaView>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.filterButton,
                activeFilter === option.key && styles.activeFilterButton
              ]}
              onPress={() => handleFilterPress(option.key)}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.filterButtonText,
                activeFilter === option.key && styles.activeFilterButtonText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bookings List */}
      <ScrollView 
        style={styles.bookingsContainer}
        contentContainerStyle={styles.bookingsContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredBookings.map((booking) => (
          <BookingCard 
            key={booking.id} 
            booking={booking} 
            isInAllView={isAllView}
          />
        ))}
        
        {/* Add bottom spacing for navigation */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Bottom Navigation */}
      <SafeAreaView edges={['bottom']} style={styles.navigationContainer}>
        <BottomNavigation
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  headerContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingBottom: theme.spacing.sm,
  },
  headerTitle: {
    marginTop: 20,
    fontSize: 32,
    fontFamily: theme.fonts.bold,
    color: theme.colors.onSurface,
    textAlign: 'center',
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  filterScrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeFilterButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  filterButtonText: {
    fontSize: 14,
    fontFamily: theme.fonts.medium,
    color: '#666',
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  bookingsContainer: {
    flex: 1,
  },
  bookingsContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  bottomSpacing: {
    height: 100, // Account for bottom navigation
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 1001,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});

export default BookingsScreen;