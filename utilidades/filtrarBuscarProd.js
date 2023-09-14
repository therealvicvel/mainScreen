import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './styles';

const FiltrarBuscar = ({ Data }) => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [isListVisible, setIsListVisible] = useState(true); // Variable de estado para controlar la visibilidad de la lista

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
    onSelectClient(item); // Llama a la función desde la prop 'onSelectClient' para actualizar el estado del cliente en el componente padre (NuevoPedido)
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
    </View>
  );
};

export default FiltrarBuscar;