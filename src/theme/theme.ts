// src/theme/theme.ts
import { Platform } from 'react-native';

export const theme = {
  // Typography System - SF Pro
  fonts: {
    // iOS uses SF Pro by default, Android needs explicit loading
    regular: Platform.select({
      ios: 'SF Pro Display',
      android: 'SFProDisplay-Regular',
      default: 'System',
    }),
    medium: Platform.select({
      ios: 'SF Pro Display',
      android: 'SFProDisplay-Medium', 
      default: 'System',
    }),
    semibold: Platform.select({
      ios: 'SF Pro Display',
      android: 'SFProDisplay-Semibold',
      default: 'System',
    }),
    bold: Platform.select({
      ios: 'SF Pro Display',
      android: 'SFProDisplay-Bold',
      default: 'System',
    }),
  },

  // Typography Scale (from your design system)
  typography: {
    // Headers
    h1: {
      fontSize: 67,
      fontWeight: '600' as const,
      lineHeight: 72,
    },
    h2: {
      fontSize: 50,
      fontWeight: '600' as const,
      lineHeight: 56,
    },
    h3: {
      fontSize: 38,
      fontWeight: '600' as const,
      lineHeight: 44,
    },
    h4: {
      fontSize: 28,
      fontWeight: '600' as const,
      lineHeight: 34,
    },
    h5: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 30,
    },
    h6: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 24,
    },
    
    // Body Text
    bodyLarge: {
      fontSize: 18,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 22,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 16,
    },
    
    // Interactive Elements
    buttonLarge: {
      fontSize: 16,
      fontWeight: '600' as const,
      lineHeight: 22,
    },
    button: {
      fontSize: 14,
      fontWeight: '600' as const,
      lineHeight: 20,
    },
    label: {
      fontSize: 12,
      fontWeight: '500' as const,
      lineHeight: 16,
      textTransform: 'uppercase' as const,
      letterSpacing: 0.5,
    },
  },

  // Color System (from your design system)
  colors: {
    // Brand Primary (Teal variations)
    primary: '#419A90',      // Primary 01
    primaryHover: '#357A71',
    primaryPressed: '#2B6159',
    primaryContainer: '#E0F2F1',
    
    // Brand Secondary (Navy)
    secondary: '#485072',     // Primary 02
    secondaryContainer: '#E8EAF0',
    
    // Brand Accent (Gold)
    accent: '#EEDC1B',       // Primary 02 (Gold)
    accentContainer: '#FDF6B8',
    
    // Neutrals (from design system)
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F5',
    background: '#FAFAFA',
    backgroundSecondary: '#F7F7F7',
    
    // Text Colors
    onSurface: '#1A1A1A',           // Primary Text
    onSurfaceVariant: '#444444',    // Secondary Text  
    onSurfaceDisabled: '#777777',   // Tertiary Text
    onBackground: '#1A1A1A',
    
    // Interactive States
    outline: '#E0E0E0',      // Default Border
    outlineFocus: '#419A90', // Focused Border
    outlineError: '#CC362C', // Error Border
    outlineDisabled: '#EEEEEE', // Disabled Border
    
    // Feedback Colors
    success: '#27B837',      // Success Text
    successBackground: '#E6F5EA',
    warning: '#FF9800',
    warningBackground: '#FFF3E0',
    error: '#CC362C',        // Error Text  
    errorBackground: '#FFEBEE',
    info: '#2196F3',
    infoBackground: '#E3F2FD',
    
    // Component Specific
    buttonPrimary: '#419A90',
    buttonSecondary: '#FFFFFF',
    buttonDisabled: '#B2B2B2',
    
    // Overlays
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(0, 0, 0, 0.2)',
    
    // Shadows
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowDark: 'rgba(0, 0, 0, 0.25)',
  },

  // Spacing System
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },

  // Border Radius
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },

  // Component Sizes
  components: {
    button: {
      height: {
        small: 32,
        medium: 44,
        large: 56,
      },
      padding: {
        small: 12,
        medium: 16,
        large: 20,
      },
    },
    input: {
      height: 48,
      padding: 16,
    },
    icon: {
      small: 16,
      medium: 24,
      large: 32,
    },
  },

  // Elevation/Shadow
  elevation: {
    none: {
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    small: {
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};