import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Event } from '@/types/event';

interface Props {
  event: Event;
  onPress: () => void;
}

const EventCard: React.FC<Props> = ({ event, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: event.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{event.category}</Text>
          {event.isFavorite && (
            <MaterialIcons name="favorite" size={20} color="#C44536" />
          )}
        </View>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.infoRow}>
          <MaterialIcons name="access-time" size={16} color="#666" />
          <Text style={styles.infoText}>{event.date} {event.time}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={16} color="#666" />
          <Text style={styles.infoText}>{event.location.name}</Text>
        </View>
        <View style={styles.footer}>
          {event.price ? (
            <Text style={styles.price}>от {event.price} руб.</Text>
          ) : (
            <Text style={styles.free}>Бесплатно</Text>
          )}
          <View style={styles.registeredContainer}>
            <MaterialIcons name="people" size={16} color="#4A6FA5" />
            <Text style={styles.registeredText}>{event.registeredCount}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  content: {
    padding: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    color: '#4A6FA5',
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E8B57',
  },
  free: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A6FA5',
  },
  registeredContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registeredText: {
    marginLeft: 4,
    color: '#4A6FA5',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default EventCard;