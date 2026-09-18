import { colors } from './colors';
import { AppTheme } from '../types';

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: {
    primary: colors.primary,
    primarySoft: colors.primarySoft,
    primaryDark: colors.primaryDark,
    secondary: colors.secondary,
    accent: colors.accent,
    success: colors.success,
    error: colors.error,
    warning: colors.warning,
    background: colors.background,
    card: colors.card,
    text: colors.text,
    secondaryText: colors.secondaryText,
    border: colors.border,
    muted: colors.muted,
    overlay: colors.overlay,
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  radii: {
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
    full: 999,
  },
  shadows: {
    card: {
      shadowColor: '#0F172A',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.08,
      shadowRadius: 12,
      elevation: 4,
    },
  },
};
