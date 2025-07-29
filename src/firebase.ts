// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Импортируйте Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCONA6AL9bNKf44qmwqVe_gNXPuS3OKNRE',
  authDomain: 'hookah-bissnes.firebaseapp.com',
  projectId: 'hookah-bissnes',
  storageBucket: 'hookah-bissnes.firebasestorage.app',
  messagingSenderId: '55675650372',
  appId: '1:55675650372:web:57d6adfd4f3fe884a3d711',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
