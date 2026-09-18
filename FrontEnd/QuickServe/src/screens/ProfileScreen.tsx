import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileAvatar } from '../components';
import { logout } from '../redux/slices/authSlice';
import { RootState } from '../redux/store';
import { removeItem } from '../services/storage';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate('Home');
  };

  const options = [
    'Edit Profile',
    'Change Password',
    'Saved Addresses',
    'My Bookings',
    'Help & Support',
    'Settings',
  ];

  const handleOptionPress = (option: string) => {
    if (option === 'My Bookings') {
      navigation.navigate('Bookings');
      return;
    }

    Alert.alert(option, 'This feature is ready for backend integration.');
  };

  const handleLogout = async () => {
    await removeItem('authUser');
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={18} color="#111827" />
          <Text style={styles.backText}>Previous</Text>
        </Pressable>
        <Text style={styles.header}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.profileHeader}>
        <ProfileAvatar name={profile.name} size={90} />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.email}>{profile.email}</Text>
        <Text style={styles.phone}>{profile.phone}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <Pressable key={option} style={styles.optionRow} onPress={() => handleOptionPress(option)}>
            <Text style={styles.optionText}>{option}</Text>
            <Icon name="chevron-forward" size={18} color="#6B7280" />
          </Pressable>
        ))}

        <Pressable style={styles.logoutRow} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
          <Icon name="log-out-outline" size={18} color="#DC2626" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  backText: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  header: {
    flex: 1,
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 94,
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 18,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginTop: 14,
  },
  email: {
    color: '#6B7280',
    marginTop: 6,
  },
  phone: {
    color: '#6B7280',
    marginTop: 4,
  },
  optionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionText: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '600',
  },
  logoutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  logoutText: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default ProfileScreen;
