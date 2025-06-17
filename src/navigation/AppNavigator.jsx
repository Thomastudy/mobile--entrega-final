// src/navigation/AppNavigator.jsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";

import CatalogScreen from "../screens/CatalogScreen";
import DetailScreen from "../screens/DetailScreen";
import CartScreen from "../screens/CartScreen";
import { auth } from "../services/firebase";
import ProfileScreen from "../screens/ProfileScreen";
import { useDispatch } from "react-redux";
import { setUser as setAuthUser } from "../slices/authSlice";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Nos suscribimos al estado de Firebase Auth
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // 1) Actualizo local state para renderizar el stack privado
        setUser(firebaseUser);
        // 2) Despacho al slice de Redux

        dispatch(
          setAuthUser({
            email: firebaseUser.email,
            localId: firebaseUser.uid,
          })
        );
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // Usuario está logueado → pantallas privadas
          <>
            <Stack.Screen
              name="Catalog"
              component={CatalogScreen}
              options={{ title: "Catálogo" }}
            />
            <Stack.Screen name="Detail" component={DetailScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Carrito" component={CartScreen} />
          </>
        ) : (
          // Usuario NO logueado → pantallas de auth
          <>
            <Stack.Screen
              name="LogIn"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
