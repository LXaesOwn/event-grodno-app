export interface Event {
  id: string;
  title: string;
  description: string;
  category: 'film' | 'concert' | 'theater' | 'exhibition' | 'sport' | 'other';
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
  };
  price?: number;
  imageUrl: string;
  registeredCount: number;
  isFavorite: boolean;
  isRegistered: boolean;
}