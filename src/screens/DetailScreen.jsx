// src/screens/DetailScreen.jsx
import React from "react";
import { View, Text, Image, Button, Alert, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { saveItem } from "../services/db";
import { ref, set } from "firebase/database";
import { auth, database } from "../services/firebase";
import products from "../services/products";

export default function DetailScreen({ route }) {
  const { productId } = route.params;
  const product = products.find((p) => p.id === productId);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculamos la nueva qty antes del dispatch
  const existingItem = cartItems.find((i) => i.productId === productId);
  const newQty = existingItem ? existingItem.qty + 1 : 1;

  const handleAdd = async () => {
    // 1) Redux
    dispatch(addToCart(productId));
    // 2) SQLite
    saveItem(productId);
    // 3) Firebase RTDB
    const uid = auth.currentUser?.uid;
    if (uid) {
      try {
        await set(ref(database, `carts/${uid}/${productId}`), { qty: newQty });
      } catch (err) {
        console.error("RTDB write error:", err);
      }
    }
    // 4) Feedback al usuario
    Alert.alert("¡Listo!", "Producto añadido al carrito.");
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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 8,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    color: "#666",
    marginVertical: 8,
  },
  desc: {
    fontSize: 16,
    marginBottom: 16,
  },
});
