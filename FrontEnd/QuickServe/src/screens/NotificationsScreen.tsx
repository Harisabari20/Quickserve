import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { markAllNotificationsRead } from '../redux/slices/notificationSlice';
import { RootState } from '../redux/store';

const NotificationsScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state.notification.notifications);

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
        <Text style={styles.header}>Notifications</Text>
        <Pressable onPress={() => dispatch(markAllNotificationsRead())}>
          <Text style={styles.clearText}>Mark all read</Text>
        </Pressable>
      </View>

      {notifications.map((item) => (
        <View key={item.id} style={[styles.card, !item.read && styles.unreadCard]}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      ))}
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
    justifyContent: 'space-between',
    alignItems: 'center',
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
  clearText: {
    color: '#2563EB',
    fontWeight: '700',
    fontSize: 13,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 12,
  },
  unreadCard: {
    borderColor: '#BFDBFE',
    backgroundColor: '#F8FBFF',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  message: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  time: {
    marginTop: 8,
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default NotificationsScreen;
