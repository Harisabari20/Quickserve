import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { AppTheme } from '../types';

interface CustomButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  textStyle?: object;
  style?: ViewStyle;
  theme?: AppTheme;
}

export const CustomButton = ({
  title,
  variant = 'primary',
  fullWidth = true,
  textStyle,
  style,
  theme,
  disabled,
  ...props
}: CustomButtonProps) => {
  const currentTheme = theme ?? {
    colors: {
      primary: '#2563EB',
      text: '#111827',
      secondaryText: '#6B7280',
      border: '#E5E7EB',
      card: '#FFFFFF',
      background: '#F8FAFC',
    },
  } as AppTheme;

  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: currentTheme.colors.primarySoft,
          borderColor: currentTheme.colors.primary,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: currentTheme.colors.border,
        };
      default:
        return {
          backgroundColor: currentTheme.colors.primary,
          borderColor: currentTheme.colors.primary,
        };
    }
  };

  const textColor = variant === 'outline' ? currentTheme.colors.text : '#FFFFFF';

  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        getButtonStyle(),
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    paddingHorizontal: 18,
  },
  fullWidth: {
    width: '100%',
  },
  pressed: {
    opacity: 0.9,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});
