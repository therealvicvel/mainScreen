import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';  // Cambia a la biblioteca de iconos que estés utilizando

const App = () => {
  const data = [
    { id: 1, name: 'Producto A', price: 20 },
    { id: 2, name: 'Producto B', price: 30 },
    // ... más filas
  ];
  
  const handleEditProduct = (productId) => {
    // Lógica para editar el producto con el ID productId
    console.log('Edit product with ID:', productId);
  };

  const handleDeleteProduct = (productId) => {
    // Lógica para eliminar el producto con el ID productId
    console.log('Delete product with ID:', productId);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.price}</Text>

      {/* Icono para editar */}
      <TouchableOpacity onPress={() => handleEditProduct(item.id)}>
        <Icon name="pencil" size={20} color="blue" />
      </TouchableOpacity>

      {/* Icono para eliminar */}
      <TouchableOpacity onPress={() => handleDeleteProduct(item.id)}>
        <Icon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>ID</Text>
        <Text style={styles.headerText}>Nombre</Text>
        <Text style={styles.headerText}>Precio</Text>
        <Text style={styles.headerText}>Editar</Text>
        <Text style={styles.headerText}>Eliminar</Text>
      </View>
      {/* Table rows */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',  // Alinea los iconos verticalmente
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default App;
