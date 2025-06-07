// src/screens/DeviceScreen.jsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function DeviceScreen() {
  const [perm, setPerm]   = useState(null);
  const [uri, setUri]     = useState(null);
  const camRef            = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPerm(status === 'granted');
    })();
  }, []);

  if (perm === false) return <Text style={styles.center}>Permiso denegado</Text>;
  if (uri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri }} style={styles.preview} />
        <Button title="Tomar otra" onPress={() => setUri(null)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={camRef} />
      <Button
        title="Capturar foto"
        onPress={async () => {
          if (camRef.current) {
            const foto = await camRef.current.takePictureAsync();
            setUri(foto.uri);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#000' },
  camera:    { flex:1, width:'100%' },
  preview:   { width:300, height:400, borderRadius:8 },
  center:    { flex:1, textAlign:'center', textAlignVertical:'center' }
});
