export type ThemeMode = 'light' | 'dark' | 'system';

export interface AppTheme {
  mode: ThemeMode;
  colors: {
    primary: string;
    primarySoft: string;
    primaryDark: string;
    secondary: string;
    accent: string;
    success: string;
    error: string;
    warning: string;
    background: string;
    card: string;
    text: string;
    secondaryText: string;
    border: string;
    muted: string;
    overlay: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  radii: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  };
  shadows: {
    card: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    };
  };
}
