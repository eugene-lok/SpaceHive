import { theme } from '../theme/theme';

export const useTheme = () => {
  return {
    // Direct access to theme
    theme,
    
    // Helper functions for common use cases
    color: (colorKey: keyof typeof theme.colors) => theme.colors[colorKey],
    spacing: (spacingKey: keyof typeof theme.spacing) => theme.spacing[spacingKey],
    borderRadius: (radiusKey: keyof typeof theme.borderRadius) => theme.borderRadius[radiusKey],
    
    // Common combinations
    button: {
      primary: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.md,
        height: theme.components.button.height.large,
        paddingHorizontal: theme.components.button.padding.large,
      },
      secondary: {
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.outline,
        borderWidth: 1,
        borderRadius: theme.borderRadius.md,
        height: theme.components.button.height.large,
        paddingHorizontal: theme.components.button.padding.large,
      },
    },
    
    // Layout helpers
    layout: {
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing.md,
      },
      centerContent: {
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
      },
    },
  };
};