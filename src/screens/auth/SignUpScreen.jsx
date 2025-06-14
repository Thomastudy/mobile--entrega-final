import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useSignupMutation } from "../../store/authApi";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [SignUp, { isLoading, isSuccess, isError, error }] =
    useSignupMutation();

  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (email && password) {
      console.log(SignUp({ email, password }).unwrap());

      console.log({ isLoading, isSuccess, isError, error });

      const result = await SignUp({ email, password }).unwrap();
      console.log("✅ Usuario registrado:", result);
      // por ejemplo, navegar después de registro:
      navigation.replace("LogIn");
      console.log(result);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
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
      <Button title="Ingresar" onPress={handleSignUp} disabled={isLoading} />
      {/* <Button
        title="Iniciar sesion"
        onPress={NavigateLogIn}
        disabled={isLoading}
      /> */}
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
