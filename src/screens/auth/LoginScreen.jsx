// src/screens/LoginScreen.jsx
import { useState } from "react";
import { View, Button, StyleSheet, Text, TextInput, Alert } from "react-native";
import { useLoginMutation } from "../../store/authApi";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/authSlice";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleLogin = async () => {
    if (email && password) {
      try {
        const { email: userEmail, localId: uid } = await login({
          email,
          password,
        }).unwrap();

        // 2) Despacha al slice de Redux
        dispatch(setUser({ email: userEmail, localId: uid }));
      } catch (err) {
        console.error("Login error:", err);
        Alert.alert("Error de login", err.message || "Revisa tus datos");
      }
    }
  };

  const NavigateSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button
        title={isLoading ? "Entrando…" : "Entrar"}
        onPress={handleLogin}
        disabled={isLoading}
      />
      <Button
        title="Registrarse"
        onPress={NavigateSignUp}
        disabled={isLoading}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  error: { color: "red", marginTop: 10 },
});
