import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { serviceCatalog } from '../data/services';
import { addBooking } from '../redux/slices/bookingSlice';

const BookingFormScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const dispatch = useDispatch();
  const service = serviceCatalog.find((item) => item.id === route.params?.serviceId) ?? serviceCatalog[0];
  const selectedProvider = route.params?.providerName ?? 'Service Professional';

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate('HomeTab');
  };

  const [address, setAddress] = useState('123 Main Street, New York');
  const [date, setDate] = useState('2026-09-20');
  const [time, setTime] = useState('10:00 AM');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!address.trim() || !date || !time) {
      Alert.alert('Missing details', 'Please fill in the booking address, date, and time.');
      return;
    }

    const booking = {
      id: `b-${Date.now()}`,
      serviceName: `${service.name} • ${selectedProvider}`,
      servicePrice: service.price,
      date,
      time,
      address,
      notes,
      status: 'Confirmed' as const,
    };

    dispatch(addBooking(booking));
    navigation.navigate('BookingSuccess', {
      bookingId: booking.id,
      serviceName: `${service.name} with ${selectedProvider}`,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={18} color="#111827" />
          <Text style={styles.backText}>Previous</Text>
        </Pressable>
        <Text style={styles.header}>Book Service</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.serviceCard}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.serviceMeta}>Selected professional: {selectedProvider}</Text>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.label}>Service Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address"
        />

        <Text style={styles.label}>Preferred Date</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
        />

        <Text style={styles.label}>Preferred Time</Text>
        <TextInput
          style={styles.input}
          value={time}
          onChangeText={setTime}
          placeholder="10:00 AM"
        />

        <Text style={styles.label}>Notes (optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add any special instructions"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Confirm Booking</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    paddingBottom: 32,
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
    borderRadius: 12,
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
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 18,
  },
  serviceName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
  },
  serviceMeta: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 15,
    color: '#111827',
  },
  textArea: {
    minHeight: 100,
  },
  submitButton: {
    marginTop: 22,
    backgroundColor: '#2563EB',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
});

export default BookingFormScreen;
