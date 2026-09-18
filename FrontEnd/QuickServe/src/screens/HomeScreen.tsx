import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SearchBar, ProfileAvatar } from '../components';
import { RootState } from '../redux/store';
import { serviceCatalog } from '../data/services';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('');
  const profile = useSelector((state: RootState) => state.profile);
  const currentBooking = useSelector((state: RootState) => state.booking.currentBooking);
  const notificationCount = useSelector((state: RootState) => state.notification.unreadCount);

  const filteredServices = serviceCatalog.filter((item) =>
    item.name.toLowerCase().includes(search.trim().toLowerCase()),
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greeting}>Hello, {profile.name.split(' ')[0]} 👋</Text>
          <Text style={styles.subGreeting}>Good to see you again!</Text>
        </View>

        <View style={styles.topActions}>
          <View style={styles.iconWrap}>
            <Icon name="notifications-outline" size={22} color="#111827" />
            {notificationCount > 0 && <View style={styles.badge} />}
          </View>
          <ProfileAvatar name={profile.name} size={40} />
        </View>
      </View>

      <SearchBar value={search} onChangeText={setSearch} placeholder="Search services..." />

      <View style={styles.banner}>
        <View style={styles.bannerTextWrap}>
          <Text style={styles.bannerTitle}>Reliable Services Right at Your Doorstep</Text>
          <Text style={styles.bannerSubtitle}>Book. Track. Relax.</Text>
        </View>
        <View style={styles.bannerIconWrap}>
          <Icon name="home-outline" size={38} color="#2563EB" />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Popular Services</Text>
      <View style={styles.categoryRow}>
        {filteredServices.map((item) => (
          <Pressable key={item.id} style={styles.categoryCard} onPress={() => navigation.navigate('ServiceDetails', { serviceId: item.id })}>
            <View style={styles.categoryIconWrap}>
              <Icon name={item.icon} size={22} color="#2563EB" />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
          </Pressable>
        ))}
      </View>

      {currentBooking && (
        <View style={styles.bookingCard}>
          <View style={styles.bookingHeader}>
            <Text style={styles.sectionTitle}>Upcoming Booking</Text>
            <Text style={styles.statusBadge}>{currentBooking.status}</Text>
          </View>

          <Text style={styles.bookingService}>{currentBooking.serviceName}</Text>
          <Text style={styles.bookingMeta}>{currentBooking.date} • {currentBooking.time}</Text>
          <Text style={styles.bookingMeta}>{currentBooking.address}</Text>
          <View style={styles.bookingFooter}>
            <Text style={styles.trackText}>Track</Text>
            <Icon name="arrow-forward" size={18} color="#2563EB" />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 30,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  subGreeting: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#EF4444',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#DBEAFE',
    borderRadius: 22,
    padding: 18,
    marginTop: 18,
    marginBottom: 22,
  },
  bannerTextWrap: {
    flex: 1,
  },
  bannerTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  bannerSubtitle: {
    color: '#2563EB',
    fontWeight: '700',
    marginTop: 8,
  },
  bannerIconWrap: {
    marginLeft: 12,
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  categoryCard: {
    width: '30%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
  },
  priceText: {
    marginTop: 6,
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '700',
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    color: '#22C55E',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
  },
  bookingService: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  bookingMeta: {
    marginTop: 6,
    fontSize: 14,
    color: '#6B7280',
  },
  bookingFooter: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  trackText: {
    marginRight: 6,
    color: '#2563EB',
    fontWeight: '700',
  },
});

export default HomeScreen;
