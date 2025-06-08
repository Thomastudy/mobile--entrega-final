// src/services/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
  signOut as fbSignOut,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDhRiKx3mxZkTLQN4JWC3yyOflyxi6hSLk",
  authDomain: "proyecto-coder-mobile.firebaseapp.com",
  databaseURL: "https://proyecto-coder-mobile-default-rtdb.firebaseio.com",
  projectId: "proyecto-coder-mobile",
  storageBucket: "proyecto-coder-mobile.appspot.com",
  messagingSenderId: "700239160623",
  appId: "1:700239160623:web:3ec1cd86d546a838756dda",
  measurementId: "G-JFFK7N2PSF",
};

// 1) Sólo inicializamos la app si no existe
const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

// 2) auth: si ya existe un Auth, lo recuperamos; si no, lo inicializamos con persistencia
let auth;
if (!getApps().length) {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  // en React Native usar getAuth() para recuperar la instancia existente
  auth = getAuth(app);
}

// 3) exportamos database y signOut
export const database = getDatabase(app);
export const signOut = () => fbSignOut(auth);

export { auth };
