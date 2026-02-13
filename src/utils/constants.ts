import { EventCategory } from '@/types/event';

export const categories: EventCategory[] = [
  {
    id: 'film',
    name: 'Кино',
    icon: 'movie',
    color: '#4A6FA5'
  },
  {
    id: 'concert',
    name: 'Концерты',
    icon: 'music-note',
    color: '#6A4C9C'
  },
  {
    id: 'theater',
    name: 'Театр',
    icon: 'theater',
    color: '#C44536'
  },
  {
    id: 'exhibition',
    name: 'Выставки',
    icon: 'palette',
    color: '#2E8B57'
  },
  {
    id: 'sport',
    name: 'Спорт',
    icon: 'sports-soccer',
    color: '#E67E22'
  }
];

export const API_URL = 'https://api.example.com';