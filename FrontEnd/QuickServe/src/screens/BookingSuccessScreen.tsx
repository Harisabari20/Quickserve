import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const BookingSuccessScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { serviceName = 'Service', bookingId = 'N/A' } = route.params || {};

  const goToBookings = () => {
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate('Bookings');
      return;
    }
    navigation.navigate('Bookings');
  };

  const goToHome = () => {
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate('Home');
      return;
    }
    navigation.navigate('HomeTab');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <Icon name="checkmark-circle" size={52} color="#16A34A" />
        </View>
        <Text style={styles.title}>Booking Confirmed</Text>
        <Text style={styles.message}>Your {serviceName} service has been successfully booked.</Text>
        <Text style={styles.bookingId}>Booking ID: {bookingId}</Text>

        <Pressable style={styles.primaryButton} onPress={goToBookings}>
          <Text style={styles.primaryText}>Track Booking</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={goToHome}>
          <Text style={styles.secondaryText}>Back to Home</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 28,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconWrap: {
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  message: {
    marginTop: 10,
    textAlign: 'center',
    color: '#4B5563',
    fontSize: 15,
    lineHeight: 22,
  },
  bookingId: {
    marginTop: 16,
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '700',
  },
  primaryButton: {
    marginTop: 24,
    width: '100%',
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryText: {
    color: '#111827',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default BookingSuccessScreen;
