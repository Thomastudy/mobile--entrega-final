// src/components/ItemCard.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

function ItemCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item.id)}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(ItemCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    margin: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 2,
  },
  image: { width: 64, height: 64, borderRadius: 4 },
  info: { marginLeft: 12, justifyContent: 'center' },
  title: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#666', marginTop: 4 },
});
