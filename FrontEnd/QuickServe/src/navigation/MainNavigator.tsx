import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import BookingsScreen from '../screens/BookingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ServiceDetailsScreen from '../screens/ServiceDetailsScreen';
import BookingFormScreen from '../screens/BookingFormScreen';
import BookingSuccessScreen from '../screens/BookingSuccessScreen';

export type MainTabParamList = {
  Home: undefined;
  Bookings: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type BookingStackParamList = {
  HomeTab: undefined;
  ServiceDetails: { serviceId: string };
  BookingForm: { serviceId: string };
  BookingSuccess: { bookingId: string; serviceName: string };
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const BookingStack = createNativeStackNavigator<BookingStackParamList>();

const BookingFlowNavigator = () => (
  <BookingStack.Navigator screenOptions={{ headerShown: false }}>
    <BookingStack.Screen name="HomeTab" component={HomeScreen} />
    <BookingStack.Screen name="ServiceDetails" component={ServiceDetailsScreen} />
    <BookingStack.Screen name="BookingForm" component={BookingFormScreen} />
    <BookingStack.Screen name="BookingSuccess" component={BookingSuccessScreen} />
  </BookingStack.Navigator>
);

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'home-outline';

          if (route.name === 'Home') iconName = 'home-outline';
          if (route.name === 'Bookings') iconName = 'calendar-outline';
          if (route.name === 'Notifications') iconName = 'notifications-outline';
          if (route.name === 'Profile') iconName = 'person-outline';

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#6B7280',
      })}
    >
      <Tab.Screen name="Home" component={BookingFlowNavigator} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
