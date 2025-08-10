// src/components/SearchBar.tsx
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Pressable } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface SearchBarProps {
  placeholder?: string;
  onPress?: () => void;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Plan your next gathering — start here!",
  onPress,
  disabled = false
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const handlePress = () => {
    if (!disabled && onPress) {
      onPress();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.searchButton,
          isPressed && styles.searchButtonPressed,
          disabled && styles.searchButtonDisabled
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={placeholder}
        accessibilityHint="Tap to start planning your gathering"
      >
        <View style={styles.content}>
          <Text 
            style={[
              styles.placeholderText,
              disabled && styles.placeholderTextDisabled
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {placeholder}
          </Text>
          <View style={styles.actionIcon}>
            <MaterialIcons
              name="search"
              size={20}
              color={theme.colors.surface}
            />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.md,
  },
  searchButton: {
    backgroundColor: theme.colors.surface,
    borderRadius: 28, // Pill shape (height/2)
    height: 56,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    // Normal elevation/shadow
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowColor: theme.colors.shadowDark,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  searchButtonPressed: {
    // Stronger elevation/shadow when pressed
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowColor: theme.colors.shadowDark,
      },
      android: {
        elevation: 6,
      },
    }),
    // Slight scale effect for better feedback
    transform: [{ scale: 0.98 }],
  },
  searchButtonDisabled: {
    backgroundColor: theme.colors.surfaceVariant,
    opacity: 0.6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    height: '100%',
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  placeholderText: {
    flex: 1,
    fontSize: 14,
    fontFamily: theme.fonts.semibold,
    color: theme.colors.onSurface,
  },
  placeholderTextDisabled: {
    color: theme.colors.onSurfaceDisabled,
  },
  actionIcon: {
    backgroundColor: theme.colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing.sm,
  },
});

export default SearchBar;