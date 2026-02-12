import api from './api';
import { Event } from '../types/event';

export const eventsService = {
  // Получение всех событий
  async getEvents(): Promise<Event[]> {
    const response = await api.get('/events');
    return response.data;
  },

  // Получение событий по категории
  async getEventsByCategory(category: string): Promise<Event[]> {
    const response = await api.get(`/events/category/${category}`);
    return response.data;
  },

  // Получение события по ID
  async getEventById(id: string): Promise<Event> {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  // Регистрация на событие
  async registerForEvent(eventId: string, userId: string): Promise<void> {
    await api.post(`/events/${eventId}/register`, { userId });
  },

  // Отмена регистрации
  async unregisterFromEvent(eventId: string, userId: string): Promise<void> {
    await api.delete(`/events/${eventId}/register/${userId}`);
  },

  // Добавление в избранное
  async addToFavorites(eventId: string, userId: string): Promise<void> {
    await api.post(`/events/${eventId}/favorite`, { userId });
  },

  // Удаление из избранного
  async removeFromFavorites(eventId: string, userId: string): Promise<void> {
    await api.delete(`/events/${eventId}/favorite/${userId}`);
  },
};