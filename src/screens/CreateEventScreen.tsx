import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { createEvent } from '@/services/events';

const CreateEventScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('concert');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [maxParticipants, setMaxParticipants] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Информация',
        'В web-версии используйте ссылку на изображение'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.3,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      setImageUrl(`data:image/jpeg;base64,${result.assets[0].base64}`);
    }
  };

  const handleCreate = async () => {
    if (!title || !description || !category || !date || !time || !locationName) {
      Alert.alert('Ошибка', 'Заполните основные поля');
      return;
    }

    try {
      setIsLoading(true);

      await createEvent({
        title,
        description,
        category,
        date,
        time,
        location: {
          name: locationName,
          address,
          latitude: 53.6778,
          longitude: 23.8298,
        },
        price: Number(price) || 0,
        imageUrl:
          imageUrl ||
          'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&auto=format&fit=crop',
        organizer: 'Event Grodno',
        maxParticipants: Number(maxParticipants) || 0,
        registeredCount: 0,
        isFavorite: false,
        isRegistered: false,
      });

      navigation.navigate('Main');
    } catch (error: any) {
      console.log(error);
      Alert.alert(
        'Ошибка',
        error?.message || 'Не удалось создать мероприятие'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Создание мероприятия</Text>

      <TextInput
        style={styles.input}
        placeholder="Название"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Описание"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Категория: concert, film, theater, exhibition, sport"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={styles.input}
        placeholder="Дата: 2026-08-29"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Время: 19:00"
        value={time}
        onChangeText={setTime}
      />

      <TextInput
        style={styles.input}
        placeholder="Название места"
        value={locationName}
        onChangeText={setLocationName}
      />

      <TextInput
        style={styles.input}
        placeholder="Адрес"
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Стоимость"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Максимум участников"
        value={maxParticipants}
        onChangeText={setMaxParticipants}
        keyboardType="numeric"
      />

      {Platform.OS === 'web' ? (
        <TextInput
          style={styles.input}
          placeholder="Ссылка на изображение https://..."
          value={imageUrl}
          onChangeText={setImageUrl}
        />
      ) : (
        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
          <Text style={styles.imageButtonText}>
            Выбрать картинку из галереи
          </Text>
        </TouchableOpacity>
      )}

      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.preview} />
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleCreate}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Создать мероприятие</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  imageButton: {
    backgroundColor: '#eee',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },

  imageButtonText: {
    color: '#333',
    fontWeight: '600',
  },

  preview: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },

  button: {
    backgroundColor: '#4A6FA5',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CreateEventScreen;