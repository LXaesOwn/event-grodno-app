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
    latitude: number;    
    longitude: number;   
  };
  price?: number;
  imageUrl: string;
  organizer: string;
  maxParticipants?: number;
  registeredCount: number;
  isFavorite: boolean;
  isRegistered: boolean;
}

export interface EventCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}