// src/components/CustomTextInput.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, HelperText, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface CustomTextInputProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  helperText?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  multiline?: boolean;
  numberOfLines?: number;
  showPasswordToggle?: boolean;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  helperText,
  secureTextEntry = false,
  autoCapitalize = 'sentences',
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  showPasswordToggle = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const hasError = Boolean(error);
  const showPassword = secureTextEntry && !isPasswordVisible;

  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        error={hasError}
        secureTextEntry={showPassword}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.input,
          hasError && styles.inputError,
          isFocused && styles.inputFocused,
        ]}
        contentStyle={styles.inputContent}
        theme={{
          colors: {
            primary: hasError ? theme.colors.error : theme.colors.primary,
            error: theme.colors.error,
          },
        }}
        right={
          showPasswordToggle ? (
            <TextInput.Icon
              icon={() => (
                <MaterialIcons
                  name={isPasswordVisible ? 'visibility-off' : 'visibility'}
                  size={24}
                  color="#666"
                />
              )}
              onPress={togglePasswordVisibility}
            />
          ) : undefined
        }
      />
      
      {(error || helperText) && (
        <HelperText type={hasError ? 'error' : 'info'} visible={true}>
          {error || helperText}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  inputFocused: {
    borderColor: theme.colors.primary,
  },
  inputContent: {
    fontSize: 16,
    color: theme.colors.onSurface,
  },
});

export default CustomTextInput;