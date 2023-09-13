import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';

const FiltrarBuscar = ({ Data }) => {
  const [searchText, setSearchText] = useState('');
  const [isListVisible, setIsListVisible] = useState(false); // Variable de estado para controlar la visibilidad de la lista
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);


  useEffect(() => {
    // Se ejecuta al montar el componente y obtiene los datos de la API
    fetch('https://viramsoftapi.onrender.com/product')
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos de la API:", data);
        Data(data.prod); // Actualiza los datos en el componente padre (NuevoPedido)
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  // Maneja el evento de búsqueda y muestra la lista
  const handleSearch = (text) => {
    setSearchText(text);
    setIsListVisible(true);
    setFilteredData(filterData(text));
  };

  // Maneja la selección de un elemento de la lista y actualiza el estado
  const handleSelectItem = (item) => {
    setSearchText(item.nombre); // Establece el texto de búsqueda como el nombre seleccionado
    setIsListVisible(false);
    onSelectClient(item); // Llama a la función desde la prop 'onSelectClient' para actualizar el estado del cliente en el componente padre (NuevoPedido)
  };

  // Filtra los datos según el texto de búsqueda
  const filterData = (text) => {
    if (text === '') {
      return [];
    }

    return Data.filter((item) =>
      item.nombre.toLowerCase().includes(text.toLowerCase()) ||
      item.documento.toLowerCase().includes(text.toLowerCase())
    );
  };

  return (
    <View>
      <TextInput
        style={styles.inputForBuscarCliente}
        placeholder="Buscar Producto..."
        value={searchText}
        onChangeText={handleSearch}
      />
      {isListVisible && (
        <FlatList
          data={filteredData}
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
