import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC-TIou3j9WWk8hP_mOcfEkBz5crQ4cNcM',
  authDomain: 'event-grodno.firebaseapp.com',
  projectId: 'event-grodno',
  storageBucket: 'event-grodno.firebasestorage.app',
  messagingSenderId: '163258700886',
  appId: '1:163258700886:web:fdca4db7d1054348af97f7',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;