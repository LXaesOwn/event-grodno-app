import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

import { RootState, AppDispatch } from '@/store/store';
import { setEvents, setCategory } from '@/store/eventsSlice';
import EventCard from '@/components/EventCard';
import CategoryFilter from '@/components/CategoryFilter';
import { categories } from '@/utils/constants';
import { getEvents } from '@/services/events';
import { Event } from '@/types/event';

const HomeScreen: React.FC = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();

  const { filteredEvents } = useSelector((state: RootState) => state.events);
  const { user } = useSelector((state: RootState) => state.auth);

  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isAdmin = user?.role === 'admin';
  const isEditor = user?.role === 'editor';

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const eventsFromFirebase = await getEvents();
      dispatch(setEvents(eventsFromFirebase as Event[]));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadEvents();
    }, [])
  );

  const handleCategorySelect = (categoryId: string | null) => {
    dispatch(setCategory(categoryId));
  };

  const handleCreateEvent = () => {
    navigation.navigate('CreateEvent');
  };

  const searchedEvents = filteredEvents.filter(event => {
    const title = event.title?.toLowerCase() || '';
    const description = event.description?.toLowerCase() || '';
    const query = searchText.toLowerCase();

    return title.includes(query) || description.includes(query);
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Добро пожаловать в Гродно!</Text>
          <Text style={styles.subtitle}>
            {user ? `Привет, ${user.name}` : 'Найдите интересные события'}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.profileButton}
        >
          <MaterialIcons name="account-circle" size={40} color="#4A6FA5" />
        </TouchableOpacity>
      </View>

      {(isAdmin || isEditor) && (
        <TouchableOpacity style={styles.createButton} onPress={handleCreateEvent}>
          <MaterialIcons name="add-circle" size={22} color="#fff" />
          <Text style={styles.createButtonText}>Добавить мероприятие</Text>
        </TouchableOpacity>
      )}

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={22} color="#777" />
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск мероприятий"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <CategoryFilter
        categories={categories}
        onSelectCategory={handleCategorySelect}
      />

      <ScrollView style={styles.eventsList}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ближайшие события</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Events')}>
            <Text style={styles.seeAll}>Все</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#4A6FA5" />
        ) : searchedEvents.length > 0 ? (
          searchedEvents.map(event => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() =>
                navigation.navigate('EventDetail', { eventId: event.id })
              }
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialIcons name="event-busy" size={60} color="#ccc" />
            <Text style={styles.emptyText}>Мероприятия не найдены</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  profileButton: { padding: 5 },

  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A6FA5',
    marginHorizontal: 20,
    marginTop: 12,
    paddingVertical: 12,
    borderRadius: 10,
  },

  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },

  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 8,
    fontSize: 16,
  },

  eventsList: {
    flex: 1,
    paddingHorizontal: 20,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },

  seeAll: {
    fontSize: 14,
    color: '#4A6FA5',
    fontWeight: '600',
  },

  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },

  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 10,
  },
});

export default HomeScreen;