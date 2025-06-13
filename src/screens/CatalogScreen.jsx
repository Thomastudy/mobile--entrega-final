// src/screens/CatalogScreen.jsx
import React, { useLayoutEffect } from "react";
import { View, FlatList, StyleSheet, Button } from "react-native";
import ItemCard from "../components/ItemCard";
import products from "../services/products";

export default function CatalogScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <ItemCard
      item={item}
      onPress={(id) => navigation.navigate("Detail", { productId: id })}
    />
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Cerrar sesión"
          onPress={async () => {
            try {
              await signOut();
              navigation.navigate("Login");
            } catch (err) {
              Alert.alert("Error", "No se pudo cerrar sesión");
            }
          }}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Button
        title="Ver carrito"
        onPress={() => navigation.navigate("Carrito")}
      />
      <Button title="Device" onPress={() => navigation.navigate("Device")} />

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
