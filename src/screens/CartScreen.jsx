// src/screens/CartScreen.jsx
import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import products from '../services/products';
import { clearCart, removeFromCart } from '../store/cartSlice';
import { clearCartDB, deleteItem } from '../services/db';
import { auth, database } from '../services/firebase';
import { ref, remove } from 'firebase/database';

export default function CartScreen() {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleClear = () => {
    Alert.alert(
      'Vaciar carrito',
      '¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, vaciar',
          onPress: () => {
            // Redux + SQLite
            dispatch(clearCart());
            clearCartDB();
            // Firebase
            const uid = auth.currentUser?.uid;
            if (uid) remove(ref(database, `carts/${uid}`)).catch(console.error);
          }
        }
      ]
    );
  };

  const handleRemove = id => {
    // Redux + SQLite
    dispatch(removeFromCart(id));
    deleteItem(id);
    // Firebase
    const uid = auth.currentUser?.uid;
    if (uid) remove(ref(database, `carts/${uid}/${id}`)).catch(console.error);
  };

  const renderItem = ({ item }) => {
    const prod = products.find(p => p.id === item.productId) || {};
    return (
      <View style={styles.item}>
        <Text style={styles.name}>{prod.name}</Text>
        <Text style={styles.qty}>Cantidad: {item.qty}</Text>
        <Button title="Quitar" onPress={() => handleRemove(item.productId)} />
      </View>
    );
  };

  if (items.length === 0) {
    return <View style={styles.center}><Text>Tu carrito está vacío.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={i => i.productId}
        renderItem={renderItem}
      />
      <Button title="Vaciar carrito" onPress={handleClear} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, backgroundColor:'#fff' },
  center:    { flex:1, justifyContent:'center', alignItems:'center' },
  item:      { padding:12, borderBottomWidth:1, borderColor:'#ddd' },
  name:      { fontSize:18, fontWeight:'bold' },
  qty:       { marginVertical:4 }
});
