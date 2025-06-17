// src/screens/ProfileScreen.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Alert,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { EvilIcons as Icon } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { auth, signOut } from "../services/firebase";
import { setUser as setAuthUser } from "../slices/authSlice";
import { setProfilePicture } from "../slices/userSlice";
import { usePutProfilePictureMutation } from "../store/userApi";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { email, localId, photoURL } = useSelector((state) => state.auth);
  const profilePicture = useSelector((state) => state.user.profilePicture);
  const [uploading, setUploading] = useState(false);

  const [putProfilePicture] = usePutProfilePictureMutation();

  // Sincroniza photoURL de Firebase Auth al Redux
  useEffect(() => {
    const user = auth.currentUser;
    if (user?.photoURL) {
      dispatch(
        setAuthUser({
          email: user.email,
          localId: user.uid,
          photoURL: user.photoURL,
        })
      );
    }
  }, [dispatch]);

  const selectImageSource = () => {
    Alert.alert(
      "Actualizar foto de perfil",
      "¿De dónde quieres obtener la imagen?",
      [
        { text: "Tomar foto", onPress: takePhoto },
        { text: "Elegir de galería", onPress: pickImage },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      return Alert.alert("Permiso denegado", "Necesitamos acceso a la galería");
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 0.6,
    });
    if (!result.canceled) {
      await uploadAndSave(result.assets[0].base64);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      return Alert.alert("Permiso denegado", "Necesitamos acceso a la cámara");
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 0.6,
    });
    if (!result.canceled) {
      await uploadAndSave(result.assets[0].base64);
    }
  };

  const uploadAndSave = async (base64) => {
    const imageDataURL = `data:image/jpeg;base64,${base64}`;
    setUploading(true);

    try {
      // 1) Guardar en Firebase RTDB
      await putProfilePicture({ image: imageDataURL, localId }).unwrap();

      // 2) Actualizar Redux para mostrar inmediatamente
      dispatch(setProfilePicture(imageDataURL));
    } catch (error) {
      console.error("Error actualizando foto:", error);
      Alert.alert("Error", "No se pudo actualizar la foto");
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigation.replace("LogIn");
  };

  const initial = email?.charAt(0).toUpperCase() || "?";

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        {uploading ? (
          <ActivityIndicator size="large" color="#6a4fb9" />
        ) : photoURL || profilePicture ? (
          <Image
            source={{ uri: profilePicture || photoURL }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarFallbackText}>{initial}</Text>
          </View>
        )}
        <Pressable
          style={styles.cameraButton}
          onPress={selectImageSource}
          disabled={uploading}
        >
          <Icon name="pencil" size={20} color="#fff" />
        </Pressable>
      </View>

      <Text style={styles.emailText}>{email}</Text>
      <Pressable style={styles.signOutBtn} onPress={handleSignOut}>
        <Text style={styles.signOutTxt}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}

const AVATAR_SIZE = 120;
const BTN_SIZE = 36;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  avatarWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  avatarFallback: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: "#6a4fb9",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarFallbackText: {
    fontSize: 48,
    color: "#fff",
  },
  cameraButton: {
    position: "absolute",
    bottom: -BTN_SIZE / 3,
    right: -BTN_SIZE / 3,
    width: BTN_SIZE,
    height: BTN_SIZE,
    borderRadius: BTN_SIZE / 2,
    backgroundColor: "#6a4fb9",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 3 },
      android: { elevation: 5 },
    }),
  },
  emailText: {
    marginTop: 16,
    fontSize: 16,
    color: "#333",
  },
  signOutBtn: {
    marginTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: "#f55",
    borderRadius: 6,
  },
  signOutTxt: {
    color: "#fff",
    fontWeight: "bold",
  },
});
