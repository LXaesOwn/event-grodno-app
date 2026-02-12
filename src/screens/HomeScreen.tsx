import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Мероприятия в Гродно</Text>
        <Text style={styles.subtitle}>Найдите интересные события</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <TouchableOpacity style={styles.eventCard}>
          <Text style={styles.eventTitle}>Кино: Премиальная неделя</Text>
          <Text style={styles.eventDate}>15 февраля, 19:00</Text>
          <Text style={styles.eventLocation}>Кинотеатр "Гродно"</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.eventCard}>
          <Text style={styles.eventTitle}>Концерт: Гродненская филармония</Text>
          <Text style={styles.eventDate}>16 февраля, 18:30</Text>
          <Text style={styles.eventLocation}>Гродненская филармония</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4A6FA5',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  eventLocation: {
    fontSize: 14,
    color: '#4A6FA5',
  },
});