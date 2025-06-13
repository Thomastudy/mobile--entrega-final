// src/navigation/AppNavigator.jsx
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/auth/LoginScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";

import CatalogScreen from "../screens/CatalogScreen";
import DetailScreen from "../screens/DetailScreen";
import DeviceScreen from "../screens/DeviceScreen";
import CartScreen from "../screens/CartScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Catalog" component={CatalogScreen} />
        <Stack.Screen name="Carrito" component={CartScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} /> 
        <Stack.Screen name="Device" component={DeviceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
