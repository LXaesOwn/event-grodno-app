export type UserRole = 'user' | 'editor' | 'admin';

export interface User {
  id: string;
  uid?: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  favoriteEvents: string[];
  registeredEvents: string[];
}