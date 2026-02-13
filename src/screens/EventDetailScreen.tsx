import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const EventDetailScreen = ({ navigation, route }: any) => {
  const { eventId } = route.params || {};
  
  const event = useSelector((state: RootState) => 
    state.events.events.find(e => e.id === eventId)
  );

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
        <TouchableOpacity>
          <MaterialIcons 
            name={event.isFavorite ? 'favorite' : 'favorite-border'} 
            size={24} 
            color={event.isFavorite ? '#C44536' : '#666'} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Image source={{ uri: event.imageUrl }} style={styles.image} />
        
        <View style={styles.content}>
          <View style={styles.categoryContainer}>
            <Text style={styles.category}>{event.category}</Text>
            {event.isRegistered && (
              <View style={styles.registeredBadge}>
                <MaterialIcons name="check-circle" size={16} color="#fff" />
                <Text style={styles.registeredText}>Вы зарегистрированы</Text>
              </View>
            )}
          </View>

          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.description}>{event.description}</Text>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <MaterialIcons name="access-time" size={20} color="#4A6FA5" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Дата и время</Text>
                <Text style={styles.infoValue}>{event.date} в {event.time}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="location-on" size={20} color="#4A6FA5" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Место проведения</Text>
                <Text style={styles.infoValue}>{event.location.name}</Text>
                <Text style={styles.infoSubvalue}>{event.location.address}</Text>
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
                  {event.registeredCount} {event.maxParticipants ? `из ${event.maxParticipants}` : ''}
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
              event.isRegistered && styles.registeredButton
            ]}
            disabled={event.isRegistered}
          >
            <Text style={styles.registerButtonText}>
              {event.isRegistered ? 'Вы зарегистрированы' : 'Зарегистрироваться'}
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
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  category: {
    color: '#4A6FA5',
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2E8B57',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  registeredText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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
    marginBottom: 24,
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