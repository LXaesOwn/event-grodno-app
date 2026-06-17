import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { RootState, AppDispatch } from '@/store/store';
import { setEvents } from '@/store/eventsSlice';
import EventCard from '@/components/EventCard';
import { Event } from '@/types/event';
import { getEvents } from '@/services/events';

const EventListScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { events } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
  try {
    const eventsFromFirebase = await getEvents();
    dispatch(setEvents(eventsFromFirebase));
  } catch (error) {
    console.log(error);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Все события</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => navigation.navigate('EventDetail', { eventId: event.id })}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="event-busy" size={60} color="#ccc" />
            <Text style={styles.emptyTitle}>Событий пока нет</Text>
            <Text style={styles.emptySubtitle}>
              Скоро здесь появятся интересные мероприятия
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default EventListScreen;