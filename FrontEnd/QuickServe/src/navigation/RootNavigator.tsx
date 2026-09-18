import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainNavigator from './MainNavigator';
import { AppDispatch, RootState } from '../redux/store';
import { getItem } from '../services/storage';
import { loginSuccess, setLoading } from '../redux/slices/authSlice';
import { setProfile } from '../redux/slices/profileSlice';
import { User } from '../redux/slices/authSlice';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const authLoading = useSelector((state: RootState) => state.auth.loading);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    const hydrateSession = async () => {
      try {
        dispatch(setLoading(true));
        const savedUser = await getItem<User>('authUser');
        if (savedUser) {
          dispatch(loginSuccess(savedUser));
          dispatch(
            setProfile({
              name: savedUser.name,
              email: savedUser.email,
              phone: savedUser.phone,
            }),
          );
        }
      } finally {
        setSessionReady(true);
        dispatch(setLoading(false));
      }
    };

    hydrateSession();
  }, [dispatch]);

  const initialRoute: keyof RootStackParamList = !sessionReady || authLoading ? 'Splash' : isAuthenticated ? 'Main' : 'Login';

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="Main" component={MainNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
