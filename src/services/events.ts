import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  increment,
  serverTimestamp,
  arrayUnion,
  getDocs,
  query,
  orderBy,
  where,
} from 'firebase/firestore';

import { db } from '@/firebase/config';

export const createEvent = async (eventData: any) => {
  const docRef = await addDoc(collection(db, 'events'), {
    ...eventData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    status: 'published',
  });

  return docRef.id;
};

export const deleteEvent = async (eventId: string) => {
  await deleteDoc(doc(db, 'events', eventId));
};

export const getEvents = async () => {
  const q = query(collection(db, 'events'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(docItem => {
    const data = docItem.data();

    return {
      id: docItem.id,
      title: data.title,
      description: data.description,
      category: data.category,
      date: data.date,
      time: data.time,
      location: data.location,
      price: data.price || 0,
      imageUrl: data.imageUrl || '',
      organizer: data.organizer || 'Event Grodno',
      maxParticipants: data.maxParticipants || 0,
      registeredCount: data.registeredCount || 0,
      isFavorite: false,
      isRegistered: false,
    };
  });
};

export const registerUserForEvent = async (userId: string, event: any) => {
  const duplicateQuery = query(
    collection(db, 'eventRegistrations'),
    where('userId', '==', userId),
    where('eventId', '==', event.id)
  );

  const duplicateSnapshot = await getDocs(duplicateQuery);

  if (!duplicateSnapshot.empty) {
    throw new Error('ALREADY_REGISTERED');
  }

  await addDoc(collection(db, 'eventRegistrations'), {
    userId,
    eventId: event.id,
    eventTitle: event.title,
    eventDescription: event.description || '',
    eventCategory: event.category,
    eventDate: event.date,
    eventTime: event.time,
    eventLocation: event.location,
    eventPrice: event.price || 0,
    eventImageUrl: event.imageUrl || '',
    eventOrganizer: event.organizer || 'Event Grodno',
    eventMaxParticipants: event.maxParticipants || 0,
    status: 'registered',
    createdAt: serverTimestamp(),
  });

  await updateDoc(doc(db, 'events', event.id), {
    registeredCount: increment(1),
    updatedAt: serverTimestamp(),
  });

  await updateDoc(doc(db, 'users', userId), {
    registeredEvents: arrayUnion(event.id),
    updatedAt: serverTimestamp(),
  });
};

export const getUserRegisteredEvents = async (userId: string) => {
  const registrationsQuery = query(
    collection(db, 'eventRegistrations'),
    where('userId', '==', userId)
  );

  const registrationsSnapshot = await getDocs(registrationsQuery);

  return registrationsSnapshot.docs.map(docItem => {
    const data = docItem.data();

    return {
      id: data.eventId,
      title: data.eventTitle,
      description: data.eventDescription || '',
      category: data.eventCategory,
      date: data.eventDate,
      time: data.eventTime,
      location: data.eventLocation,
      price: data.eventPrice || 0,
      imageUrl: data.eventImageUrl || '',
      organizer: data.eventOrganizer || 'Event Grodno',
      maxParticipants: data.eventMaxParticipants || 0,
      registeredCount: 0,
      isFavorite: false,
      isRegistered: true,
    };
  });
};