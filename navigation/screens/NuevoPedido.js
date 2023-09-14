import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, TextInput, Alert } from "react-native";
import CustomModal from "./ModalesNuevoPedido";
import { Picker } from '@react-native-picker/picker';
import FiltrarBuscar from "../../utilidades/filtrarBuscarProd";

const NuevoPedido = () => {
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/product')
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos de la API:", data);
        setData(data.productos);
        setFilteredData(data.productos); // Inicialmente, muestra todos los productos
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const handleRemoveFromCart = (item) => {
    setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.idProducto !== item.idProducto));
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const filterProductsByCategory = () => {
    if (!selectedCategory) {
      setFilteredData(data);
    } else {
      const filteredProducts = data.filter((item) => item.categoria === selectedCategory);
      setFilteredData(filteredProducts);
    }
  };
  const handleAddToCart = (item, quantity) => {

    if (quantity > 0) {
      // Verificar si el elemento ya está en selectedItems
      const isSelected = selectedItems.some(
        (selectedItem) => selectedItem.idProducto === item.idProducto
      );

      if (isSelected) {
        // Si está seleccionado, eliminarlo de selectedItems
        setSelectedItems(
          selectedItems.filter(
            (selectedItem) => selectedItem.idProducto !== item.idProducto
          )
        );

      } else {
        // Si no está seleccionado, agregarlo a selectedItems con precio
        setSelectedItems([
          ...selectedItems,
          { ...item, quantity, precio: item.valorVenta },
        ]);


      }
    } else {
      // Mostrar una alerta si la cantidad es menor o igual a 0
      Alert.alert('Cantidad no válida', 'La cantidad debe ser mayor a 0.');
    }
  };
  useEffect(() => {
    filterProductsByCategory();
  }, [selectedCategory]);

  return (
    <View style={{ flex: 1 }}>
      <FiltrarBuscar />
      <View style={styles.categoriaSelector}>
        <Text style={styles.label}>Filtrar por categoría:</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.pickerforBuscarProducto}
        >
          <Picker.Item label="Todos" value={""} />
          <Picker.Item label="Líquidos" value="Líquidos" />
          <Picker.Item label="Sólidos" value="Sólidos" />
          <Picker.Item label="Polvos" value="Polvos" />
          <Picker.Item label="Otro" value="Otro" />
        </Picker>
      </View>
      <FlatList
        data={filteredData} 
        keyExtractor={(item) => item.idProducto.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Marca: {item.marca}</Text>
            <Text>Precio: {item.valorVenta}</Text>
            <Text>Stock: {item.cantidad}</Text>
            <View style={{    flexDirection: 'row'}}>
            <TextInput
              style={styles.quantityInput}
              placeholder="Cantidad"
              keyboardType="numeric"
              onChangeText={(text) => {
                const quantity = parseInt(text) || 0;
                setQuantities({ ...quantities, [item.idProducto]: quantity });
              }}
            />
              <TouchableOpacity
              style={styles.fixedButton}
              onPress={() => handleAddToCart(item, quantities[item.idProducto])}
            >
              <Text style={{ color: "#FDFDFD" }}>add</Text>
            </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.fixedButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.buttonText}>Lista</Text>
      </TouchableOpacity>
      <CustomModal
       isVisible={isModalVisible}
       onClose={handleCloseModal}
       selectedItems={selectedItems}
       onRemoveItem={handleRemoveFromCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoriaSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  label: {
    alignContent: 'center',
    padding: 10,
  },
  pickerforBuscarProducto: {
    color: "#004187",
    borderRadius: 20,
    padding: 8,
    borderColor: '#004187',
    width: 150,
  },
  searchInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    height: 40,
  },
  searchButton: {
    backgroundColor: "#6CAEF6",
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
  },
  categoriaSelector: {
    marginTop: 10,
  },
  label: {
    fontWeight: "bold",
  },
  pickerforBuscarProducto: {
    width: "100%",
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
  quantityInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 5,
    height: 30,
  },
  boton: {
    backgroundColor: "#6CAEF6",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  fixedButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NuevoPedido;