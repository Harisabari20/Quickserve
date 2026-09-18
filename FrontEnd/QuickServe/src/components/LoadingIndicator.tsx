import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { AppTheme } from '../types';

interface LoadingIndicatorProps {
  label?: string;
  theme?: AppTheme;
}

export const LoadingIndicator = ({
  label = 'Loading...',
  theme,
}: LoadingIndicatorProps) => {
  const currentTheme = theme ?? {
    colors: {
      primary: '#2563EB',
      text: '#111827',
    },
  } as AppTheme;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color={currentTheme.colors.primary} />
      <Text style={[styles.text, { color: currentTheme.colors.text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  text: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '600',
  },
});
