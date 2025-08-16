// src/components/BottomNavigation.tsx
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { 
  MagnifyingGlassIcon,
  CalendarCheckIcon,
  HeartIcon,
  ChatCircleDotsIcon,
  UserCircleIcon,
  Icon
} from 'phosphor-react-native';
import { theme } from '../theme/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

interface NavItem {
  id: string;
  title: string;
  icon: Icon;
}

interface BottomNavigationProps {
  activeTab?: string;
  onTabPress?: (tabId: string) => void;
}

const navItems: NavItem[] = [
  { id: 'search', title: 'Search', icon: MagnifyingGlassIcon },
  { id: 'bookings', title: 'Bookings', icon: CalendarCheckIcon },
  { id: 'saved', title: 'Saved', icon: HeartIcon },
  { id: 'messages', title: 'Messages', icon: ChatCircleDotsIcon },
  { id: 'profile', title: 'Profile', icon: UserCircleIcon },
];

const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab = 'search',
  onTabPress,
}) => {
  const insets = useSafeAreaInsets();
  
  const handleTabPress = (tabId: string) => {
    onTabPress?.(tabId);
  };
  
  const renderNavItem = (item: NavItem) => {
    const isActive = activeTab === item.id;
    const IconComponent = item.icon;
   
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
          <IconComponent
            size={20}
            color={theme.colors.surface}
            weight="bold"
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
        <IconComponent
          size={24}
          color={theme.colors.onSurfaceVariant}
          weight="regular"
        />
      </TouchableOpacity>
    );
  };
  
  return (
    <View style={[styles.container, {paddingBottom: Math.max(insets.bottom, theme.spacing.lg)}]}>
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
    borderTopColor: theme.colors.outline
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
    paddingVertical: theme.spacing.sm + 2,
    borderRadius: 24,
    minHeight: 40,
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