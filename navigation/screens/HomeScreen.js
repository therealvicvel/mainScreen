import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';

const HomeScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/costumer')
      .then((response) => response.json())
      .then((data) => {
        setData(data.clientes); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const renderItem = ({ item }) => (
    <View style={{ padding: 16 }}>
      <Text>{item.nombre}</Text>
      <Text>{item.documento}</Text>
      <Text>{item.apellido}</Text>
      <Text>{item.direccion}</Text>
      <Text>{item.telefono}</Text>
      
    </View>
  );

  return (
    <View style={{ flex: 1,  }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.documento} 
      />
    </View>
  );
};

export default HomeScreen;
