// src/screens/DeviceScreen.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Camera } from "expo-camera";

export default function DeviceScreen() {
  const [perm, setPerm] = useState(null); // null = pidiendo, false = denegado, true = ok
  const [uri, setUri] = useState(null);
  const camRef = useRef(null);

  useEffect(() => {
    (async () => {
      // En web expo-camera no funciona, avisamos y salimos
      if (Platform.OS === "web") {
        setPerm(false);
        return;
      }
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPerm(status === "granted");
    })();
  }, []);

  // 1) Mientras esperamos el permiso…
  if (perm === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.text}>Solicitando acceso a la cámara…</Text>
      </View>
    );
  }

  // 2) Permiso denegado o web
  if (perm === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          No se puede usar la cámara en este dispositivo o permiso denegado.
        </Text>
      </View>
    );
  }

  // 3) Si ya hay foto tomada, mostramos preview
  if (uri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri }} style={styles.preview} />
        <Button title="Tomar otra foto" onPress={() => setUri(null)} />
      </View>
    );
  }

  // 4) Con permiso y sin foto, renderizamos la cámara
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} ref={camRef} />
      </View>
      <Button
        title="Capturar foto"
        onPress={async () => {
          if (camRef.current) {
            try {
              const foto = await camRef.current.takePictureAsync({
                quality: 0.7,
              });
              setUri(foto.uri);
            } catch (e) {
              console.error("Error capturando foto:", e);
            }
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  cameraContainer: {
    flex: 1,
    width: "100%",
    marginBottom: 16,
  },
  camera: {
    flex: 1,
  },
  preview: {
    width: "90%",
    height: 400,
    borderRadius: 8,
    marginBottom: 16,
  },
  text: {
    color: "#fff",
    textAlign: "center",
    marginTop: 12,
  },
});
