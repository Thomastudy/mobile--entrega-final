import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDhRiKx3mxZkTLQN4JWC3yyOflyxi6hSLk",
  authDomain: "proyecto-coder-mobile.firebaseapp.com",
  projectId: "proyecto-coder-mobile",
  storageBucket: "proyecto-coder-mobile.firebasestorage.app",
  messagingSenderId: "700239160623",
  appId: "1:700239160623:web:3ec1cd86d546a838756dda",
  measurementId: "G-JFFK7N2PSF",
};

const app = initializeApp(firebaseConfig);

// Inicializa Auth con persistencia en AsyncStorage
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Base de datos en tiempo real
export const database = getDatabase(app);
