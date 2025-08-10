import { MD3LightTheme } from 'react-native-paper';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#4A90A4',
    primaryContainer: '#E3F2FD',
    secondary: '#5BA4B0',
    accent: '#F4D03F',
    surface: '#FFFFFF',
    background: '#FAFAFA',
    error: '#D32F2F',
    success: '#4CAF50',
    warning: '#FF9800',
    onSurface: '#000000',
    outline: '#E5E5E5',
    surfaceVariant: '#F5F5F5',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
  },
};