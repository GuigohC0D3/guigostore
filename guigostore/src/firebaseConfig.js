// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD4aPD1l4n9C5FACDAJlOzA6hl54s8Uq-Y",
  authDomain: "guigostore-f0774.firebaseapp.com",
  projectId: "guigostore-f0774",
  storageBucket: "guigostore-f0774.appspot.com",
  messagingSenderId: "836290165079",
  appId: "1:836290165079:web:3ec9e8e2cde75764d22612",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
