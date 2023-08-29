
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, TextInput, Alert } from "react-native";
import CustomModal from "./ModalesNuevoPedido";

const NuevoPedido = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  // Nuevo estado para rastrear si el botón se ha presionado
  const [buttonPressed, setButtonPressed] = useState({});

  useEffect(() => {
    fetch("https://viramsoftapi.onrender.com/product")
      .then((response) => response.json())
      .then((data) => {
        // Agrega la información de botón presionado al estado de datos
        const initialData = data.productos.map((producto) => ({
          ...producto,
          buttonPressed: false,
        }));
        setData(initialData);
        setIsLoading(false);
        const initialQuantities = {};
        data.productos.forEach((producto) => {
          initialQuantities[producto.idProducto] = 0;
        });
        setQuantities(initialQuantities);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  // Manejar la selección de un elemento
  const handleAddToCart = (item, quantity) => {
    // Verifica si el elemento ya está en selectedItems
    const isSelected = selectedItems.some(
      (selectedItem) => selectedItem.idProducto === item.idProducto
    );
  
    if (isSelected) {
      // Si está seleccionado, elimínalo de selectedItems
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.idProducto !== item.idProducto));
  
      // Actualiza el estado del botón presionado a "false"
      setButtonPressed({ ...buttonPressed, [item.idProducto]: false });
    } else {
      // Si no está seleccionado, agrégalo a selectedItems con precio
      setSelectedItems([...selectedItems, { ...item, quantity, precio: item.valorVenta }]);
  
      // Actualiza el estado del botón presionado a "true"
      setButtonPressed({ ...buttonPressed, [item.idProducto]: true });
    }
  };
  // Manejar la eliminación de un elemento
  const handleRemoveFromCart = (item) => {
    setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.idProducto !== item.idProducto));
  };

  return (
    <View style={{ flex: 1 }}>
    <FlatList
      data={data}
      keyExtractor={(item) => item.idProducto.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text> Nombre: {item.nombre}</Text>
          <Text> Marca: {item.marca}</Text>
          <Text> Precio: {item.valorVenta}</Text>
          <Text> Stock: {item.cantidad}</Text>
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
            style={styles.boton}
            onPress={() => handleAddToCart(item, quantities[item.idProducto])}
          >
            <Text style={{ color: "#FDFDFD" }}>
              {buttonPressed[item.idProducto] ? "Agregado" : "Agregar"}
            </Text>
          </TouchableOpacity>
          </View>
        )}
      />
      {/* Botón flotante */}
      <TouchableOpacity
        style={styles.fixedButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.buttonText}>Lista</Text>
      </TouchableOpacity>

      {/* Renderiza el modal */}
      <CustomModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        selectedItems={selectedItems}
        onRemoveItem={handleRemoveFromCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({

  boton: {
    backgroundColor: "#6CAEF6",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addRemoveButton: {
    backgroundColor: '#6CAEF6',
    padding: 5, // Cambia el padding para hacer el botón más pequeño
    borderRadius: 5, // Cambia el borderRadius para hacer el botón más pequeño
    marginLeft: 5,
  },
  quantityInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 5,
    height: 30, // Ajusta la altura del TextInput
  },
  fixedButton: {
    position: 'absolute',
    bottom: 20,  // Ajusta esta propiedad para cambiar la posición vertical
    right: 20,  // Ajusta esta propiedad para cambiar la posición horizontal
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    zIndex: 1, // Asegura que el botón esté por encima de otros elementos
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
  boton: {
    backgroundColor: '#6CAEF6',
    padding: 5, // Cambia el padding para hacer el botón más pequeño
    borderRadius: 5, // Cambia el borderRadius para hacer el botón más pequeño
    marginTop: 10,
  },
});

export default NuevoPedido;