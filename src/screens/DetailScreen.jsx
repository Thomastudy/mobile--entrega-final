// src/screens/DetailScreen.jsx
import { View, Text, Button } from "react-native";

export default function DetailScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Detail Screen</Text>
      <Button
        title="Ir a Cámara/Ubicación"
        onPress={() => navigation.navigate("Device")}
      />
    </View>
  );
}
