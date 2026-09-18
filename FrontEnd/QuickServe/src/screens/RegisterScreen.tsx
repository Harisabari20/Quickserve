import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../navigation/RootNavigator';
import { CustomInput, CustomButton } from '../components';
import { registerUserApi } from '../services/api';
import { setItem } from '../services/storage';

const RegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const nextErrors: {
      fullName?: string;
      email?: string;
      phone?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!fullName.trim()) nextErrors.fullName = 'Full name is required';
    if (!email.trim()) nextErrors.email = 'Email is required';
    else if (!email.includes('@')) nextErrors.email = 'Enter a valid email';
    if (!phone.trim()) nextErrors.phone = 'Phone number is required';
    if (!password.trim()) nextErrors.password = 'Password is required';
    else if (password.length < 6) nextErrors.password = 'Password must be at least 6 characters';
    if (!confirmPassword.trim()) nextErrors.confirmPassword = 'Confirm password is required';
    else if (confirmPassword !== password) nextErrors.confirmPassword = 'Passwords do not match';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      const payload = {
        fullName,
        email,
        phone,
        password,
      };

      const response = await registerUserApi(payload);

      if (response?.user) {
        await setItem('authUser', response.user);
      }

      Alert.alert('Success', 'Registration successful. Please login.');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert(
        'Registration failed',
        error?.response?.data?.message || 'Unable to register user right now.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.logoWrap}>
          <View style={styles.logoCircle}>
            <Icon name="construct-outline" size={38} color="#2563EB" />
          </View>
        </View>

        <Text style={styles.title}>Create your account</Text>

        <CustomInput
          label="Full Name"
          placeholder="Enter full name"
          value={fullName}
          onChangeText={setFullName}
          error={errors.fullName}
        />

        <CustomInput
          label="Email"
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <CustomInput
          label="Phone Number"
          placeholder="Enter phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          error={errors.phone}
        />

        <CustomInput
          label="Password"
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />

        <CustomInput
          label="Confirm Password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={errors.confirmPassword}
        />

        <CustomButton
          title={loading ? 'Registering...' : 'Register'}
          onPress={handleRegister}
          disabled={loading}
        />

        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.linkText} onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    backgroundColor: '#F8FAFC',
    paddingVertical: 40,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 18,
  },
  logoCircle: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 24,
    textAlign: 'center',
  },
  loginText: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 14,
    color: '#6B7280',
  },
  linkText: {
    color: '#2563EB',
    fontWeight: '700',
  },
});

export default RegisterScreen;
