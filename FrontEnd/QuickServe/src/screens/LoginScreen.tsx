import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { RootStackParamList } from '../navigation/RootNavigator';
import { CustomInput, CustomButton } from '../components';
import { loginSuccess, setLoading } from '../redux/slices/authSlice';
import { setProfile } from '../redux/slices/profileSlice';
import { loginUserApi } from '../services/api';
import { setItem } from '../services/storage';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoadingState] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};

    if (!email.trim()) nextErrors.email = 'Email is required';
    else if (!email.includes('@')) nextErrors.email = 'Enter a valid email';

    if (!password.trim()) nextErrors.password = 'Password is required';
    else if (password.length < 6) nextErrors.password = 'Password must be at least 6 characters';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoadingState(true);
      dispatch(setLoading(true));

      const response = await loginUserApi({ email, password });
      const payload = response?.user ?? response?.data?.user ?? response;

      if (!payload) {
        throw new Error('No user returned from backend');
      }

      const user = {
        id: String(payload.id ?? payload.userId ?? 'user-1'),
        name: payload.fullName ?? payload.name ?? 'User',
        email: payload.email ?? email,
        phone: payload.phone ?? '+1 000 000 0000',
      };

      dispatch(loginSuccess(user));
      dispatch(
        setProfile({
          name: user.name,
          email: user.email,
          phone: user.phone,
        }),
      );
      if (rememberMe) {
        await setItem('authUser', user);
      }
      navigation.replace('Main');
    } catch (error: any) {
      Alert.alert(
        'Login failed',
        error?.response?.data?.message || error?.message || 'Unable to login. Please try again.',
      );
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
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

        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <CustomInput
          label="Email / Phone Number"
          placeholder="Enter email or phone"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          error={errors.email}
        />

        <CustomInput
          label="Password"
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />

        <View style={styles.row}>
          <Pressable
            style={styles.rememberWrap}
            onPress={() => setRememberMe((value) => !value)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe ? <Icon name="checkmark" size={14} color="#fff" /> : null}
            </View>
            <Text style={styles.rememberText}>Remember Me</Text>
          </Pressable>

          <Text style={styles.linkText}>Forgot Password?</Text>
        </View>

        <CustomButton
          title={loading ? 'Logging in...' : 'Login'}
          onPress={handleLogin}
          disabled={loading}
        />

        <View style={styles.dividerWrap}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <CustomButton title="Continue with Google" variant="secondary" />
        <View style={styles.buttonSpacer} />
        <CustomButton title="Continue with Apple" variant="outline" />

        <Text style={styles.registerText}>
          Don’t have an account?{' '}
          <Text style={styles.linkTextStrong} onPress={() => navigation.navigate('Register')}>
            Register
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
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  rememberWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  rememberText: {
    fontSize: 14,
    color: '#111827',
  },
  linkText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },
  linkTextStrong: {
    color: '#2563EB',
    fontWeight: '700',
  },
  dividerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#6B7280',
    fontWeight: '700',
    fontSize: 12,
  },
  buttonSpacer: {
    height: 12,
  },
  registerText: {
    marginTop: 24,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default LoginScreen;
