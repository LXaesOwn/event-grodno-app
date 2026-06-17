import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';

import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

import { RootState } from '@/store/store';
import { registerUserForEvent, deleteEvent } from '@/services/events';

const EventDetailScreen = ({ navigation, route }: any) => {
  const { eventId } = route.params || {};

  const user = useSelector((state: RootState) => state.auth.user);

  const event = useSelector((state: RootState) =>
    state.events.events.find(e => e.id === eventId)
  );

  const isAdmin = user?.role === 'admin';

  const alreadyRegisteredFromUser =
    user?.registeredEvents?.includes(eventId) || false;

  const [isRegistered, setIsRegistered] = useState(
    event?.isRegistered || alreadyRegisteredFromUser
  );

  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!event) return;

    if (!user) {
      Alert.alert('Ошибка', 'Сначала войдите в аккаунт');
      navigation.navigate('Auth');
      return;
    }

    if (isRegistered) {
      Alert.alert('Информация', 'Вы уже зарегистрированы на это мероприятие');
      return;
    }

    try {
      setIsLoading(true);

      await registerUserForEvent(user.id, event);

      setIsRegistered(true);

      Alert.alert('Успешно', 'Вы зарегистрировались на мероприятие');
    } catch (error: any) {
      console.log(error);

      if (error.message === 'ALREADY_REGISTERED') {
        setIsRegistered(true);
        Alert.alert('Информация', 'Вы уже зарегистрированы на это мероприятие');
        return;
      }

      Alert.alert('Ошибка', 'Не удалось зарегистрироваться на мероприятие');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    if (!event) return;

    Alert.alert('Удаление', 'Вы точно хотите удалить мероприятие?', [
      {
        text: 'Отмена',
        style: 'cancel',
      },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteEvent(event.id);

            Alert.alert('Готово', 'Мероприятие удалено');

            navigation.navigate('Main');
          } catch (error) {
            console.log(error);
            Alert.alert('Ошибка', 'Не удалось удалить мероприятие');
          }
        },
      },
    ]);
  };

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Событие не найдено</Text>

          <View style={{ width: 24 }} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Детали события</Text>

        <View style={{ width: 24 }} />
      </View>

      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                event.imageUrl ||
                'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop',
            }}
            style={styles.image}
            resizeMode="cover"
          />

          {isAdmin && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <MaterialIcons name="delete" size={24} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.content}>
          <Text style={styles.category}>{event.category}</Text>

          <Text style={styles.title}>{event.title}</Text>

          <Text style={styles.description}>{event.description}</Text>

          {isRegistered && (
            <View style={styles.registeredBadge}>
              <MaterialIcons name="check-circle" size={18} color="#fff" />

              <Text style={styles.registeredBadgeText}>
                Вы зарегистрированы
              </Text>
            </View>
          )}

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <MaterialIcons name="access-time" size={20} color="#4A6FA5" />

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Дата и время</Text>

                <Text style={styles.infoValue}>
                  {event.date} в {event.time}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="location-on" size={20} color="#4A6FA5" />

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Место проведения</Text>

                <Text style={styles.infoValue}>{event.location.name}</Text>

                <Text style={styles.infoSubvalue}>
                  {event.location.address}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="person" size={20} color="#4A6FA5" />

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Организатор</Text>

                <Text style={styles.infoValue}>{event.organizer}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="people" size={20} color="#4A6FA5" />

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Участники</Text>

                <Text style={styles.infoValue}>
                  {event.registeredCount}{' '}
                  {event.maxParticipants ? `из ${event.maxParticipants}` : ''}
                </Text>
              </View>
            </View>
          </View>

          {event.price ? (
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Стоимость</Text>

              <Text style={styles.price}>{event.price} руб.</Text>
            </View>
          ) : (
            <View style={styles.priceContainer}>
              <Text style={styles.freeLabel}>Бесплатно</Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.registerButton,
              isRegistered && styles.registeredButton,
            ]}
            onPress={handleRegister}
            disabled={isRegistered || isLoading}
          >
            <Text style={styles.registerButtonText}>
              {isRegistered
                ? 'Вы зарегистрированы'
                : isLoading
                ? 'Регистрация...'
                : 'Зарегистрироваться'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

  imageContainer: {
    position: 'relative',
  },

  image: {
    width: '100%',
    height: 250,
    backgroundColor: '#eee',
  },

  deleteButton: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#C44536',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  content: {
    padding: 20,
  },

  category: {
    color: '#4A6FA5',
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 12,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },

  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },

  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E8B57',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 16,
  },

  registeredBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },

  infoSection: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },

  infoRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  infoContent: {
    marginLeft: 12,
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },

  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },

  infoSubvalue: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },

  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginBottom: 24,
  },

  priceLabel: {
    fontSize: 18,
    color: '#333',
  },

  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E8B57',
  },

  freeLabel: {
    fontSize: 18,
    color: '#4A6FA5',
    fontWeight: '600',
  },

  registerButton: {
    backgroundColor: '#4A6FA5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  registeredButton: {
    backgroundColor: '#2E8B57',
  },

  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default EventDetailScreen;