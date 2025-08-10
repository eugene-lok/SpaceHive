// src/components/BottomNavigation.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface NavItem {
  id: string;
  title: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: 'explore', title: 'Explore', icon: 'search' },
  { id: 'wishlists', title: 'Wishlists', icon: 'favorite-border' },
  { id: 'trips', title: 'Trips', icon: 'luggage' },
  { id: 'inbox', title: 'Inbox', icon: 'message' },
  { id: 'profile', title: 'Profile', icon: 'person' },
];

const BottomNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('explore');

  const handleTabPress = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <View style={styles.container}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[
            styles.navItem,
            activeTab === item.id && styles.navItemActive
          ]}
          onPress={() => handleTabPress(item.id)}
        >
          <MaterialIcons
            name={item.icon as any}
            size={24}
            color={activeTab === item.id ? theme.colors.primary : '#666'}
          />
          <Text
            variant="bodySmall"
            style={[
              styles.navText,
              activeTab === item.id && styles.navTextActive
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surface,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.outline,
    paddingBottom: theme.spacing.md,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  navItemActive: {
    backgroundColor: 'rgba(74, 144, 164, 0.1)',
  },
  navText: {
    fontSize: 10,
    marginTop: theme.spacing.xs,
    color: '#666',
  },
  navTextActive: {
    color: theme.colors.primary,
    fontWeight: '600',
  },
});

export default BottomNavigation;
