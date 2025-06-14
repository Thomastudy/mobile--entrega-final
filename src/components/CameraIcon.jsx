// src/components/CameraIcon.jsx
import { StyleSheet, View } from "react-native";
import { MaterialIcons as Icon } from "@expo/vector-icons";
// import { colors } from "../theme/colors";

const CameraIcon = () => (
  <View style={styles.iconContainer}>
    <Icon name="photo-camera" size={24} color="#fff" />
  </View>
);

export default CameraIcon;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(73, 73, 73)",
    width: 48,
    height: 48,
    borderRadius: 32,
  },
});
