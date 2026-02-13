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

const EventListScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { events } = useSelector((state: RootState) => state.events);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Концерт "Рок-хиты"',
        description: 'Лучшие рок-хиты в исполнении симфонического оркестра',
        category: 'concert',
        date: '2024-12-25',
        time: '19:00',
        location: {
          name: 'Дворец культуры',
          address: 'ул. Советская, 1',
          latitude: 53.6778,
          longitude: 23.8298,
        },
        price: 25,
        imageUrl: 'https://via.placeholder.com/400x200/4A6FA5/ffffff?text=Концерт',
        organizer: 'Гродно Концерт',
        maxParticipants: 500,
        registeredCount: 120,
        isFavorite: false,
        isRegistered: false,
      },
      {
        id: '2',
        title: 'Премьера фильма "Дюна 2"',
        description: 'Долгожданная премьера в кинотеатрах города',
        category: 'film',
        date: '2024-12-26',
        time: '20:00',
        location: {
          name: 'Кинотеатр "Космос"',
          address: 'ул. Ожешко, 12',
          latitude: 53.6785,
          longitude: 23.8285,
        },
        price: 12,
        imageUrl: 'https://via.placeholder.com/400x200/C44536/ffffff?text=Кино',
        organizer: 'Кинотеатр Космос',
        maxParticipants: 200,
        registeredCount: 89,
        isFavorite: true,
        isRegistered: false,
      },
      {
        id: '3',
        title: 'Выставка современного искусства',
        description: 'Работы молодых художников Гродно',
        category: 'exhibition',
        date: '2024-12-27',
        time: '11:00',
        location: {
          name: 'Выставочный зал',
          address: 'ул. Советская, 25',
          latitude: 53.6770,
          longitude: 23.8300,
        },
        price: 8,
        imageUrl: 'https://via.placeholder.com/400x200/2E8B57/ffffff?text=Выставка',
        organizer: 'Галерея "Тизенгауз"',
        maxParticipants: 100,
        registeredCount: 34,
        isFavorite: false,
        isRegistered: true,
      },
      {
        id: '4',
        title: 'Спортивный турнир',
        description: 'Городские соревнования по баскетболу',
        category: 'sport',
        date: '2024-12-28',
        time: '15:00',
        location: {
          name: 'Спорткомплекс',
          address: 'пр. Космонавтов, 50',
          latitude: 53.6900,
          longitude: 23.8400,
        },
        price: 5,
        imageUrl: 'https://via.placeholder.com/400x200/E67E22/ffffff?text=Спорт',
        organizer: 'Спорткомитет',
        maxParticipants: 300,
        registeredCount: 156,
        isFavorite: false,
        isRegistered: false,
      },
    ];

    dispatch(setEvents(mockEvents));
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