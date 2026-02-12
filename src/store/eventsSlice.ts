import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../types/event'; 

interface EventsState {
  events: Event[];
  filteredEvents: Event[];
  selectedCategory: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: EventsState = {
  events: [],
  filteredEvents: [],
  selectedCategory: null,
  isLoading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
      state.filteredEvents = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      if (action.payload) {
        state.filteredEvents = state.events.filter(
          event => event.category === action.payload
        );
      } else {
        state.filteredEvents = state.events;
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const event = state.events.find(e => e.id === action.payload);
      if (event) {
        event.isFavorite = !event.isFavorite;
      }
    },
    registerForEvent: (state, action: PayloadAction<string>) => {
      const event = state.events.find(e => e.id === action.payload);
      if (event) {
        event.isRegistered = true;
        event.registeredCount++;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setEvents,
  setCategory,
  toggleFavorite,
  registerForEvent,
  setLoading,
  setError,
} = eventsSlice.actions;
export default eventsSlice.reducer;