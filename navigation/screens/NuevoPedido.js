
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const data = [
  { id: '1', title: 'Escoba', marca: 'marco', checked: false, quantity: 0 },
  { id: '2', title: 'Trapero', marca: 'Doña Martha', checked: false, quantity: 0 },
  { id: '3', title: 'Jabon Liquido', marca: 'Bimbo', checked: false, quantity: 0 },
];

const NuevoPedido = () => {
  const [listData, setListData] = useState(data);
  const [result, setResult] = useState(0); // Nuevo estado para almacenar el resultado

  useEffect(() => {
    // Función para calcular el resultado de la multiplicación
    const calculateResult = () => {
      let total = 0;
      listData.forEach((item) => {
        if (item.checked) {
          total += item.quantity * Number(item.id);
        }
      });
      setResult(total);
    };
    calculateResult();
  }, [listData]);

  const toggleCheckbox = (itemId) => {
    setListData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleQuantityChange = (itemId, quantity) => {
    setListData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  const handleIncrement = (itemId) => {
    setListData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (itemId) => {
    setListData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      )
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        <View style={styles.listItem}>
          <TouchableOpacity onPress={() => toggleCheckbox(item.id)}>
            <Checkbox.Android status={item.checked ? 'checked' : 'unchecked'} />
          </TouchableOpacity>
          <Text>{item.title}</Text>
          <Text> {item.marca}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleDecrement(item.id)}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <TextInput
              value={item.quantity.toString()}
              onChangeText={(text) => handleQuantityChange(item.id, text)}
              keyboardType="numeric"
              style={styles.quantityInput}
            />
            <TouchableOpacity onPress={() => handleIncrement(item.id)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.containerTotal}>
        <Text style={{padding: 10}}>Resultado: {result}</Text>
        <TouchableOpacity>
         <Text style= { styles.bottom}>Siguiente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 80,
    padding: 10,
  },
  containerTotal: {
    backgroundColor: '#E397C9',
     flex: 20, 
     padding: 10,
     alignItems: 'center',
     justifyContent: 'space-around',
     flexDirection: 'row',

  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#A3C669',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },bottom: {
    backgroundColor: '#A3C669',
    color: '#FFF',
    fontSize: 'auto',
    padding: 10,
    borderRadius: 10,

},
  quantityInput: {
    width: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  quantityButton: {
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NuevoPedido;
    