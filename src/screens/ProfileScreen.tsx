import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import { RootState } from '@/store/store';
import { logout } from '@/store/authSlice';
import { logoutUser } from '@/services/authService';
import { getUserRegisteredEvents } from '@/services/events';
import EventCard from '@/components/EventCard';
import { Event } from '@/types/event';

const ProfileScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadUserEvents = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const registrations = await getUserRegisteredEvents(user.id);
      setRegisteredEvents(registrations as Event[]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user) {
        loadUserEvents();
      }
    }, [user])
  );

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    navigation.replace('Auth');
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContent}>
          <MaterialIcons name="account-circle" size={80} color="#4A6FA5" />
          <Text style={styles.title}>Войдите в аккаунт</Text>
          <Text style={styles.subtitle}>Чтобы увидеть свои регистрации</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Auth')}
          >
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <MaterialIcons name="account-circle" size={90} color="#4A6FA5" />

        <Text style={styles.title}>{user.name}</Text>
        <Text style={styles.subtitle}>{user.email}</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Роль</Text>
          <Text style={styles.value}>{user.role}</Text>

          <Text style={styles.label}>Регистраций</Text>
          <Text style={styles.value}>{registeredEvents.length}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>История регистраций</Text>

          {isLoading ? (
            <ActivityIndicator size="large" color="#4A6FA5" />
          ) : registeredEvents.length > 0 ? (
            registeredEvents.map((event, index) => (
              <EventCard
                key={`${event.id}-${index}`}
                event={event}
                onPress={() =>
                  navigation.navigate('EventDetail', { eventId: event.id })
                }
              />
            ))
          ) : (
            <View style={styles.emptyRegistrations}>
              <MaterialIcons name="event-busy" size={50} color="#ccc" />
              <Text style={styles.emptyText}>
                Вы пока не зарегистрированы ни на одно мероприятие
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Выйти из аккаунта</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  content: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },

  emptyContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6,
    color: '#333',
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },

  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 30,
  },

  label: {
    fontSize: 14,
    color: '#999',
    marginTop: 12,
  },

  value: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    marginTop: 4,
  },

  section: {
    width: '100%',
    marginTop: 30,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },

  emptyRegistrations: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 25,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 15,
    color: '#777',
    textAlign: 'center',
    marginTop: 12,
  },

  button: {
    backgroundColor: '#4A6FA5',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 24,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  logoutButton: {
    backgroundColor: '#C44536',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 30,
  },

  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;