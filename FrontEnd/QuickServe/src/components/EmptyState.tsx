import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppTheme } from '../types';

interface EmptyStateProps {
  title: string;
  subtitle: string;
  icon?: string;
  theme?: AppTheme;
}

export const EmptyState = ({
  title,
  subtitle,
  icon = 'clipboard-outline',
  theme,
}: EmptyStateProps) => {
  const currentTheme = theme ?? {
    colors: {
      secondaryText: '#6B7280',
      text: '#111827',
      border: '#E5E7EB',
    },
  } as AppTheme;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconWrapper,
          {
            backgroundColor: currentTheme.colors.card,
            borderColor: currentTheme.colors.border,
          },
        ]}
      >
        <Icon name={icon} size={28} color={currentTheme.colors.primary} />
      </View>
      <Text style={[styles.title, { color: currentTheme.colors.text }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: currentTheme.colors.secondaryText }]}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  iconWrapper: {
    width: 74,
    height: 74,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 260,
    lineHeight: 20,
  },
});
