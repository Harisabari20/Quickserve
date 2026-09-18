import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AppTheme } from '../types';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  theme?: AppTheme;
}

export const SearchBar = ({
  value,
  onChangeText,
  placeholder = 'Search services...',
  theme,
}: SearchBarProps) => {
  const currentTheme = theme ?? {
    colors: {
      card: '#FFFFFF',
      border: '#E5E7EB',
      secondaryText: '#6B7280',
      text: '#111827',
    },
  } as AppTheme;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentTheme.colors.card,
          borderColor: currentTheme.colors.border,
        },
      ]}
    >
      <Icon
        name="search-outline"
        size={18}
        color={currentTheme.colors.secondaryText}
        style={styles.icon}
      />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={currentTheme.colors.secondaryText}
        style={[styles.input, { color: currentTheme.colors.text }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    minHeight: 48,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 12,
  },
});
