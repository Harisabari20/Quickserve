import { colors } from './colors';
import { AppTheme } from '../types';

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: {
    primary: colors.primary,
    primarySoft: '#1E3A8A',
    primaryDark: '#93C5FD',
    secondary: '#38BDF8',
    accent: '#FBBF24',
    success: '#4ADE80',
    error: '#F87171',
    warning: '#FBBF24',
    background: colors.darkBackground,
    card: colors.darkCard,
    text: colors.darkText,
    secondaryText: colors.darkSecondaryText,
    border: '#1F2937',
    muted: '#111827',
    overlay: 'rgba(15, 23, 42, 0.72)',
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
      shadowColor: '#020617',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 18,
      elevation: 6,
    },
  },
};
