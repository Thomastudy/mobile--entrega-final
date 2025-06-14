// src/screens/LoginScreen.jsx
import { useState, useEffect } from "react";
import { View, Button, StyleSheet, TextInput } from "react-native";
import { useLoginMutation } from "../../store/authApi";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();

  const handleLogin = async () => {
    if (email && password) {
      await login({ email, password });
    }
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
      <Button title="Ingresar" onPress={handleLogin} />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
