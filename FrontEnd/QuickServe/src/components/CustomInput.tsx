import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { AppTheme } from '../types';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  theme?: AppTheme;
}

export const CustomInput = ({
  label,
  error,
  theme,
  style,
  placeholderTextColor,
  ...props
}: CustomInputProps) => {
  const currentTheme = theme ?? {
    colors: {
      text: '#111827',
      secondaryText: '#6B7280',
      border: '#E5E7EB',
      background: '#F8FAFC',
      card: '#FFFFFF',
      error: '#EF4444',
    },
  } as AppTheme;

  return (
    <View style={styles.wrapper}>
      {label ? <Text style={[styles.label, { color: currentTheme.colors.text }]}>{label}</Text> : null}
      <TextInput
        {...props}
        placeholderTextColor={placeholderTextColor ?? currentTheme.colors.secondaryText}
        style={[
          styles.input,
          {
            backgroundColor: currentTheme.colors.card,
            borderColor: error ? currentTheme.colors.error : currentTheme.colors.border,
            color: currentTheme.colors.text,
          },
          style,
        ]}
      />
      {error ? <Text style={[styles.error, { color: currentTheme.colors.error }]}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 15,
  },
  error: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '500',
  },
});
