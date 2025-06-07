// src/screens/LoginScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
      <Text>Login Screen</Text>
      <Button title="Ir a Catálogo" onPress={() => navigation.replace('Catalog')} />
    </View>
  );
}
