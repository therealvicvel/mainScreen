import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const BuscarCliente = ({ Data , onSelectClient}) => {
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [isListVisible, setIsListVisible] = useState(true); // Nueva variable de estado para controlar la visibilidad de la lista

 

  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/costumer')
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos de la API:", data);
        setData(data.clientes);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    setIsListVisible(true); // Mostrar la lista cuando se escriba en el TextInput
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    setIsListVisible(false);
    onSelectClient(item); // Llama a la función desde la prop 'onSelectClient' para actualizar el estado del cliente en el componente padre (NuevoPedido)
  };

  const filterData = (text) => {
    if (text === '') {
      return [];
    }

    const filteredData = data.filter((item) =>
      item.nombre.toLowerCase().includes(text.toLowerCase()) ||
      item.documento.toLowerCase().includes(text.toLowerCase())
    );
    return filteredData;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        value={searchText}
        onChangeText={handleSearch}
      />
      {isListVisible && ( // Mostrar la FlatList solo si isListVisible es verdadero
        <FlatList
          data={filterData(searchText)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectItem(item)}>
              <Text style={styles.item}>{item.nombre}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.documento.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 16,
  },
  item: {
    padding: 10,
    fontSize: 16,
    color: '#FFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedText: {
    color: '#FFFF',
    marginTop: 20,

  },
});

export default BuscarCliente;
