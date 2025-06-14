// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth,signOut as fbSignOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDhRiKx3mxZkTLQN4JWC3yyOflyxi6hSLk",
  authDomain: "proyecto-coder-mobile.firebaseapp.com",
  databaseURL: "https://proyecto-coder-mobile-default-rtdb.firebaseio.com",
  projectId: "proyecto-coder-mobile",
  storageBucket: "proyecto-coder-mobile.firebasestorage.app",
  messagingSenderId: "700239160623",
  appId: "1:700239160623:web:3ec1cd86d546a838756dda",
  measurementId: "G-JFFK7N2PSF"
};

// Inicializa la app
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const signOut = () => fbSignOut(auth);
// export const database = getDatabase(app);

