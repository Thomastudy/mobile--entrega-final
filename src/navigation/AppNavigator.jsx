// src/navigation/AppNavigator.jsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";

import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";

import CatalogScreen from "../screens/CatalogScreen";
import DetailScreen from "../screens/DetailScreen";
import DeviceScreen from "../screens/DeviceScreen";
import CartScreen from "../screens/CartScreen";
import { auth } from "../services/firebase";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

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
            <Stack.Screen name="Device" component={DeviceScreen} />
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
