import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { auth } from '../services/firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) navigation.replace('Catalog');
      else setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    setLoading(true);
    signInAnonymously(auth)
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>Accede para continuar</Text>
      <Button title="Entrar Anónimo" onPress={handleLogin}/>
    </View>
  );
}
