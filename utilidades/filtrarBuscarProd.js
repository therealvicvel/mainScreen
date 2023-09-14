import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './styles';

const FiltrarBuscar = ({ Data, onSelectProd, onAddToCart }) => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [isListVisible, setIsListVisible] = useState(true); // Variable de estado para controlar la visibilidad de la lista
  const [selectedQuantity, setSelectedQuantity] = useState(''); // Estado para la cantidad seleccionada

  // Se ejecuta al montar el componente y obtiene los datos de la API
  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/product')
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos de la API:", data);
        setData(data.productos);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  // Maneja el evento de búsqueda y muestra la lista
  const handleSearch = (text) => {
    setSearchText(text);
    setIsListVisible(true);
  };

  // Maneja la selección de un elemento de la lista y actualiza el estado
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setIsListVisible(false);
    setSelectedQuantity(''); // Restablece la cantidad cuando se selecciona un nuevo producto
    onSelectProd(item);
  };

  // Filtra los datos según el texto de búsqueda
  const filterData = (text) => {
    if (text === '') {
      return [];
    }

    const filteredData = data.filter((item) =>
      item.nombre.toLowerCase().includes(text.toLowerCase()) ||
      item.idProducto.toString().includes(text) // Convierte idProducto a cadena y realiza la búsqueda
    );
    return filteredData;
  };

  // Maneja el evento de agregar el producto al carrito
  const handleAddProductToCart = () => {
    if (selectedItem && selectedQuantity) {
      // Validar que la cantidad no sea mayor al stock
      if (parseInt(selectedQuantity) <= selectedItem.cantidad) {
        // Agregar el producto con la cantidad al CustomModal
        onAddToCart(selectedItem, parseInt(selectedQuantity));
        // Restablecer el estado
        setSelectedItem('');
        setSelectedQuantity('');
        setIsListVisible(true);
      } else {
        // Mostrar una alerta si la cantidad es mayor al stock
        alert('La cantidad no puede ser mayor al stock disponible.');
      }
    } else {
      // Mostrar una alerta si no se ha seleccionado un producto o no se ha ingresado una cantidad
      alert('Selecciona un producto y especifica una cantidad válida.');
    }
  };

  return (
    <View>
      <TextInput
        style={styles.inputForBuscarCliente}
        placeholder="Buscar producto..."
        value={searchText}
        onChangeText={handleSearch}
      />
      {isListVisible && (
        <FlatList
          data={filterData(searchText)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectItem(item)}>
              <Text style={styles.itemForBuscarCliente}>{item.nombre}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.idProducto.toString()}
        />
      )}

      {/* Agregar TextInput y TouchableOpacity en el modal */}
      {selectedItem && (
        <View style={styles.modalContent}>
          <Text>Detalles del producto:</Text>
          <Text>Nombre: {selectedItem.nombre}</Text>
          <Text>Marca: {selectedItem.marca}</Text>
          <Text>Precio: {selectedItem.valorVenta}</Text>
          <Text>Stock disponible: {selectedItem.cantidad}</Text>
          <TextInput
            style={styles.quantityInput}
            placeholder="Cantidad"
            keyboardType="numeric"
            value={selectedQuantity}
            onChangeText={(text) => setSelectedQuantity(text)}
          />
          <TouchableOpacity onPress={handleAddProductToCart} style={styles.addButton}>
            <Text>Agregar al carrito</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FiltrarBuscar;
