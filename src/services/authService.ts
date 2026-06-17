import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';

import { auth, db } from '@/firebase/config';
import { User } from '@/types/user';

export const registerUser = async (
  email: string,
  password: string,
  name: string
): Promise<User> => {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const firebaseUser = credential.user;

  const newUser: User = {
    id: firebaseUser.uid,
    uid: firebaseUser.uid,
    email,
    name,
    role: 'user',
    favoriteEvents: [],
    registeredEvents: [],
  };

  await setDoc(doc(db, 'users', firebaseUser.uid), {
    ...newUser,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return newUser;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const credential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  const firebaseUser = credential.user;

  const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

  if (!userDoc.exists()) {
    throw new Error('Профиль пользователя не найден в базе');
  }

  const data = userDoc.data();

  return {
    id: data.id,
    uid: data.uid,
    email: data.email,
    name: data.name,
    phone: data.phone,
    role: data.role || 'user',
    favoriteEvents: data.favoriteEvents || [],
    registeredEvents: data.registeredEvents || [],
  };
};

export const logoutUser = async () => {
  await signOut(auth);
};