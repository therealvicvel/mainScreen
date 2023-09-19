import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import styles from './styles';

const FiltrarBuscar = ({ Data, onItemSelected }) => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/product_available')
      .then((response) => response.json())
      .then((data) => {
        setData(data.productos);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filterData = (text) => {
    if (text === '') {
      return [];
    }

    const filteredData = data.filter((item) =>
      item.nombre.toLowerCase().includes(text.toLowerCase()) ||
      item.idProducto.toString().includes(text)
    );
    return filteredData;
  };

  const handleSelectItem = (item) => {
    onItemSelected(item);
  };

  return (
    <View>
      <TextInput
        style={styles.inputForBuscarCliente}
        placeholder="Buscar producto..."
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filterData(searchText)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectItem(item)}>
            <Text style={styles.itemForBuscarCliente}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.idProducto.toString()}
      />
    </View>
  );
};

export default FiltrarBuscar;
