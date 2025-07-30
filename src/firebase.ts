import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCONA6AL9bNKf44qmwqVe_gNXPuS3OKNRE',
  authDomain: 'hookah-bissnes.firebaseapp.com',
  projectId: 'hookah-bissnes',
  storageBucket: 'hookah-bissnes.firebasestorage.app',
  messagingSenderId: '55675650372',
  appId: '1:55675650372:web:57d6adfd4f3fe884a3d711',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
