// src/screens/profile/ProfileScreen.jsx

import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CameraIcon from "../components/CameraIcon";
import * as ImagePicker from "expo-image-picker";
import { setProfilePicture } from "../features/userSlice";


export default function ProfileScreen() {
  const email = useSelector((state) => state.auth.email);
  // console.log(email);

  const profilePicture = useSelector(
    (state) => state.auth.profilePicture
  );

  const dispatch = useDispatch();

  const initial = email ? email.charAt(0).toUpperCase() : "?";

  const verifyCameraPermissions = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    console.log("permision granted? ", granted);

    if (!granted) return false;
    return true;
  };

  const pickImage = async () => {
    console.log("permision? ", verifyCameraPermissions);
    
    const isPermissionOk = await verifyCameraPermissions();
    if (isPermissionOk) {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.6,
      });
      if (!result.canceled) {
        dispatch(
          setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`)
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarFallback}>
            <Text style={styles.avatarFallbackText}>{initial}</Text>
          </View>
        )}
        <Pressable
          onPress={pickImage}
          style={({ pressed }) => [
            styles.cameraButton,
            pressed && { opacity: 0.7 },
          ]}
          
        >
          <CameraIcon width={20} height={20} color="#fff" />
        </Pressable>
      </View>
      <Text style={styles.emailText}>{email}</Text>
    </View>
  );
}

const SIZE = 120;
const BUTTON_SIZE = 36;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  avatarWrapper: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    overflow: "hidden",
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
  },
  avatarFallback: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
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
    right: -BUTTON_SIZE / 4,
    bottom: -BUTTON_SIZE / 4,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: "#6a4fb9",
    justifyContent: "center",
    alignItems: "center",
    // sombra Android/iOS
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  emailText: {
    marginTop: 24,
    fontSize: 16,
    color: "#333",
  },
});
