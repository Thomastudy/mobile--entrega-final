import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useSignupMutation } from "../../store/authApi";
import { useEffect } from "react";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [SignUp, { isLoading, error }] = useSignupMutation();

  const handleSignUp = async () => {
    if (email && password) {
      await SignUp({ email, password });
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
      <Button title="Ingresar" onPress={handleSignUp} />
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
