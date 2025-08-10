// src/components/SearchBar.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  showClearButton?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = "Plan your next gathering — start here!",
  onSearch,
  showClearButton = true 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch?.(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch?.('');
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={placeholder}
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.input}
        iconColor={theme.colors.onSurface}
        placeholderTextColor="#999"
        onSubmitEditing={handleSearch}
        icon={() => null}
      />
      <View style={styles.iconContainer}>
        {showClearButton && searchQuery.length > 0 && (
          <IconButton
            icon={() => <MaterialIcons name="close" size={20} color="#999" />}
            size={20}
            onPress={handleClear}
            style={styles.clearButton}
          />
        )}
        <IconButton
          icon={() => <MaterialIcons name="search" size={20} color="white" />}
          size={20}
          onPress={handleSearch}
          style={styles.searchButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginHorizontal: theme.spacing.md,
    marginVertical: theme.spacing.md,
  },
  searchbar: {
    backgroundColor: theme.colors.surfaceVariant,
    borderRadius: theme.borderRadius.md,
    elevation: 0,
    paddingRight: 60,
  },
  input: {
    fontSize: 14,
    color: theme.colors.onSurface,
  },
  iconContainer: {
    position: 'absolute',
    right: 4,
    top: 4,
    bottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    margin: 0,
    width: 32,
    height: 32,
  },
  searchButton: {
    backgroundColor: theme.colors.primary,
    margin: 0,
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.sm,
  },
});

export default SearchBar;