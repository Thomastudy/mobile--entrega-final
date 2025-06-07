// src/screens/DetailScreen.jsx
import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { saveItem } from "../services/db";
import products from "../services/products";
import { ref, set } from "firebase/database";
import { auth, database } from "../services/firebase";

export default function DetailScreen({ route }) {
  const { productId } = route.params;
  const product = products.find((p) => p.id === productId);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addToCart(productId));
    saveItem(productId);
    alert("Añadido al carrito");
    const uid = auth.currentUser.uid;
    set(ref(database, `carts/${uid}/${productId}`), { qty: 3 }).catch(
      console.error
    );
  };

  if (!product) return null;
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.desc}>Descripción breve del producto aquí.</Text>
      <Button title="Añadir al carrito" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  image: { width: "100%", height: 200, borderRadius: 8, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: "bold" },
  price: { fontSize: 20, color: "#666", marginVertical: 8 },
  desc: { fontSize: 16, marginBottom: 16 },
});
