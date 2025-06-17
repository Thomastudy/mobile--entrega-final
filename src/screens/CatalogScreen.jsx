// src/screens/CatalogScreen.jsx
import { useLayoutEffect } from "react";
import { View, FlatList, StyleSheet, Button, Text } from "react-native";
import ItemCard from "../components/ItemCard";
import products from "../services/products";
import { useDispatch } from "react-redux";
import { authApi } from "../store/authApi";
import { signOut } from "../services/firebase";

export default function CatalogScreen({ navigation }) {
  const dispatch = useDispatch();

  // Ponemos el botón en el header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Cerrar sesión"
          onPress={async () => {
            try {
              await signOut();

              dispatch(authApi.util.resetApiState());
            } catch (err) {
              Alert.alert("Error", "No se pudo cerrar sesión");
            }
          }}
        />
      ),
    });
  }, [navigation, dispatch]);

  const renderItem = ({ item }) => (
    <ItemCard
      item={item}
      onPress={(id) => navigation.navigate("Detail", { productId: id })}
    />
  );

  return (
    <View style={styles.container}>
      <Button
        title="Ver carrito"
        onPress={() => navigation.navigate("Carrito")}
      />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      {/* <Text>Hola, {user.email} </Text> */}

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        initialNumToRender={5}
        getItemLayout={(_, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
});
