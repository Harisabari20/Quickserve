import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { serviceCatalog } from '../data/services';

const providersByService = {
  plumber: [
    { id: 'p1', name: 'Ravi Kumar', rating: 4.9, experience: '6 years', availability: 'Available today' },
    { id: 'p2', name: 'Arun Sharma', rating: 4.8, experience: '4 years', availability: 'Available in 30 mins' },
    { id: 'p3', name: 'Nikhil Verma', rating: 4.7, experience: '5 years', availability: 'Available now' },
  ],
  electrician: [
    { id: 'e1', name: 'Karan Singh', rating: 5.0, experience: '8 years', availability: 'Available today' },
    { id: 'e2', name: 'Sameer Ali', rating: 4.8, experience: '6 years', availability: 'Available in 45 mins' },
  ],
  cleaning: [
    { id: 'c1', name: 'Neha Patel', rating: 4.9, experience: '5 years', availability: 'Available now' },
    { id: 'c2', name: 'Tina Joseph', rating: 4.8, experience: '4 years', availability: 'Available today' },
  ],
  carwash: [
    { id: 'cw1', name: 'John Bosco', rating: 4.7, experience: '3 years', availability: 'Available now' },
    { id: 'cw2', name: 'Harsh Reddy', rating: 4.8, experience: '5 years', availability: 'Available in 20 mins' },
  ],
  ac: [
    { id: 'ac1', name: 'Amit Nair', rating: 5.0, experience: '7 years', availability: 'Available today' },
    { id: 'ac2', name: 'Vikas Menon', rating: 4.9, experience: '6 years', availability: 'Available now' },
  ],
  pest: [
    { id: 'ps1', name: 'Rohit Das', rating: 4.8, experience: '4 years', availability: 'Available in 30 mins' },
    { id: 'ps2', name: 'Sanjay Bose', rating: 4.9, experience: '6 years', availability: 'Available today' },
  ],
};

const ServiceDetailsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const service = serviceCatalog.find((item) => item.id === route.params?.serviceId) ?? serviceCatalog[0];
  const providers = providersByService[service.id as keyof typeof providersByService] ?? providersByService.plumber;

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate('HomeTab');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.headerRow}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={18} color="#111827" />
          <Text style={styles.backText}>Previous</Text>
        </Pressable>
        <Text style={styles.header}>Service Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <Icon name={service.icon} size={30} color="#2563EB" />
        </View>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.category}>{service.category}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Duration</Text>
            <Text style={styles.metaValue}>{service.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Rating</Text>
            <Text style={styles.metaValue}>{service.rating}★</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>ETA</Text>
            <Text style={styles.metaValue}>{service.eta}</Text>
          </View>
        </View>

        <Text style={styles.description}>{service.description}</Text>

        <Text style={styles.sectionTitle}>Includes</Text>
        {service.features.map((feature) => (
          <View key={feature} style={styles.featureRow}>
            <Icon name="checkmark-circle" size={18} color="#16A34A" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      <View style={styles.providersWrap}>
        <Text style={styles.sectionTitle}>Available Service Professionals</Text>
        {providers.map((provider) => (
          <Pressable
            key={provider.id}
            style={styles.providerCard}
            onPress={() => navigation.navigate('BookingForm', { serviceId: service.id, providerName: provider.name })}
          >
            <View style={styles.providerTopRow}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{provider.name.split(' ').map((word) => word[0]).slice(0, 2).join('')}</Text>
              </View>
              <View style={styles.providerInfo}>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerMeta}>{provider.experience} experience</Text>
              </View>
              <Text style={styles.ratingText}>{provider.rating}★</Text>
            </View>
            <Text style={styles.availability}>{provider.availability}</Text>
          </Pressable>
        ))}
      </View>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  serviceName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  category: {
    color: '#2563EB',
    fontWeight: '700',
    marginTop: 6,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  metaItem: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    marginRight: 8,
  },
  metaLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  metaValue: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  description: {
    marginTop: 18,
    color: '#4B5563',
    lineHeight: 22,
    fontSize: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginTop: 20,
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 8,
    color: '#1F2937',
    fontSize: 15,
  },
  providersWrap: {
    marginTop: 24,
  },
  providerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  providerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#1D4ED8',
    fontWeight: '800',
    fontSize: 14,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
  },
  providerMeta: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },
  ratingText: {
    color: '#F59E0B',
    fontWeight: '700',
    fontSize: 14,
  },
  availability: {
    marginTop: 10,
    color: '#16A34A',
    fontWeight: '700',
    fontSize: 13,
  },
  footer: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  footerLabel: {
    color: '#6B7280',
    fontSize: 12,
  },
  footerPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: '#111827',
    marginTop: 4,
  },
  bookButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  bookText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default ServiceDetailsScreen;
