import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const BookingsScreen = () => {
  const navigation = useNavigation<any>();
  const bookings = useSelector((state: RootState) => state.booking.bookings);

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={18} color="#111827" />
          <Text style={styles.backText}>Previous</Text>
        </Pressable>
        <Text style={styles.header}>Bookings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {bookings.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No bookings yet</Text>
            <Text style={styles.emptyText}>Book a service and it will appear here.</Text>
          </View>
        ) : (
          bookings.map((booking) => (
            <View key={booking.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.serviceName}>{booking.serviceName}</Text>
                <Text style={styles.status}>{booking.status}</Text>
              </View>
              <Text style={styles.detail}>{booking.date} • {booking.time}</Text>
              <Text style={styles.detail}>{booking.address}</Text>
              <Text style={styles.price}>₹{booking.servicePrice}</Text>
            </View>
          ))
        )}
      </ScrollView>
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
  list: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  status: {
    fontSize: 12,
    fontWeight: '700',
    color: '#16A34A',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 999,
  },
  detail: {
    marginTop: 8,
    color: '#6B7280',
    fontSize: 14,
  },
  price: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '800',
    color: '#2563EB',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default BookingsScreen;
