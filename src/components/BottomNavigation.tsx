// src/components/BottomNavigation.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { theme } from '../theme/theme';

const { width: screenWidth } = Dimensions.get('window');

interface NavItem {
  id: string;
  title: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

interface BottomNavigationProps {
  activeTab?: string;
  onTabPress?: (tabId: string) => void;
}

const navItems: NavItem[] = [
  { id: 'search', title: 'Search', icon: 'search' },
  { id: 'bookings', title: 'Bookings', icon: 'calendar-today' },
  { id: 'saved', title: 'Saved', icon: 'favorite' },
  { id: 'messages', title: 'Messages', icon: 'chat-bubble-outline' },
  { id: 'profile', title: 'Profile', icon: 'person' },
];

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab = 'search',
  onTabPress,
}) => {
  const handleTabPress = (tabId: string) => {
    onTabPress?.(tabId);
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = activeTab === item.id;
    
    if (isActive) {
      // Active state: Pill-shaped background with icon and text
      return (
        <TouchableOpacity
          key={item.id}
          style={styles.activeNavItem}
          onPress={() => handleTabPress(item.id)}
          accessibilityRole="tab"
          accessibilityLabel={`${item.title} tab`}
          accessibilityState={{ selected: true }}
        >
          <MaterialIcons
            name={item.icon}
            size={20}
            color={theme.colors.surface}
            style={styles.activeIcon}
          />
          
          <Text style={styles.activeNavText}>
            {item.title}
          </Text>
        </TouchableOpacity>
      );
    }

    // Inactive state: Just icon
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.inactiveNavItem}
        onPress={() => handleTabPress(item.id)}
        accessibilityRole="tab"
        accessibilityLabel={`${item.title} tab`}
        accessibilityState={{ selected: false }}
      >
        <MaterialIcons
          name={item.icon}
          size={24}
          color={theme.colors.onSurfaceVariant}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navWrapper}>
        {navItems.map(renderNavItem)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    paddingTop: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outline,
    // Safe area handling for devices with home indicator
    paddingBottom: theme.spacing.lg,
  },
  navWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 48,
  },
  activeNavItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 2, // Slightly more padding for better touch target
    borderRadius: 24, // Pill shape
    minHeight: 40,
    // Shadow for better depth
    ...theme.elevation.small,
  },
  inactiveNavItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xs,
    minHeight: 40,
    minWidth: 40,
  },
  activeIcon: {
    marginRight: theme.spacing.xs,
  },
  activeNavText: {
    color: theme.colors.surface,
    fontSize: 14,
    fontFamily: theme.fonts.semibold,
    lineHeight: 16,
  },
});

export default BottomNavigation;