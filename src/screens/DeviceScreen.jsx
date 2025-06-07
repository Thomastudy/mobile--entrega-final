// src/screens/DeviceScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function DeviceScreen() {
  const [hasPerm, setHasPerm] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);
  const camRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPerm(status === 'granted');
    })();
  }, []);

  if (hasPerm === false) return <Text>Permiso denegado</Text>;
  if (photoUri) return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Image source={{ uri: photoUri }} style={{ width:300, height:400 }} />
      <Button title="Tomar otra" onPress={() => setPhotoUri(null)} />
    </View>
  );

  return (
    <View style={{ flex:1 }}>
      <Camera style={{ flex:1 }} ref={camRef} />
      <Button title="Capturar" onPress={async () => {
        if (camRef.current) {
          const foto = await camRef.current.takePictureAsync();
          setPhotoUri(foto.uri);
        }
      }} />
    </View>
  );
}
