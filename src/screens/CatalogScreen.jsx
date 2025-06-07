// src/screens/CatalogScreen.jsx
import { View, Text, Button } from 'react-native';

export default function CatalogScreen({ navigation }) {
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center' }}>
      <Text>Catalog Screen</Text>
      <Button title="Ver Detalle" onPress={() => navigation.navigate('Detail')} />
    </View>
  );
}
