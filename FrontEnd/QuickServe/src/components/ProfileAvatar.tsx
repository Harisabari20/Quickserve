import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { AppTheme } from '../types';

interface ProfileAvatarProps {
  uri?: string;
  name?: string;
  size?: number;
  theme?: AppTheme;
}

export const ProfileAvatar = ({
  uri,
  name = 'User',
  size = 52,
  theme,
}: ProfileAvatarProps) => {
  const currentTheme = theme ?? {
    colors: {
      primary: '#2563EB',
      background: '#F8FAFC',
      text: '#111827',
      card: '#FFFFFF',
    },
  } as AppTheme;

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: currentTheme.colors.primarySoft ?? currentTheme.colors.background,
          borderColor: currentTheme.colors.card,
        },
      ]}
    >
      {uri ? (
        <Image source={{ uri }} style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]} />
      ) : (
        <Text style={[styles.text, { fontSize: size * 0.28, color: currentTheme.colors.text }]}>{initials}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  text: {
    fontWeight: '700',
  },
});
