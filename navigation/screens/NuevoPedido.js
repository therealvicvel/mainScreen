import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, TextInput, Alert } from "react-native";
import ModalesNuevoPedido from "./ModalesNuevoPedido";
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from "react";
import FiltrarBuscar from "../../utilidades/filtrarBuscarProd";
import styles from "../../utilidades/styles";

const NuevoPedido = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [listaModalVisible, setListaModalVisible] = useState(false);
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/product')
      .then((response) => response.json())
      .then((data) => {
        setData(data.productos);
        setFilteredData(data.productos);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  const filterProductsByCategory = () => {
    if (!selectedCategory) {
      setFilteredData(data);
    } else {
      const filteredProducts = data.filter((item) => item.categoria === selectedCategory);
      setFilteredData(filteredProducts);
    }
  };

  useEffect(() => {
    filterProductsByCategory();
  }, [selectedCategory]);

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
  const handleAddPress = (item) => {
    setSelectedProduct(item);
    setSelectedItem(item);
    setQuantity('1');  // Por defecto, inicializar la cantidad en 1 al abrir el modal
    setModalVisible(true);
  };
  
  const handleAddProduct = () => {
    // Verificar si la cantidad es un número válido
    const parsedQuantity = parseInt(quantity, 10);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      Alert.alert("Error", "Por favor, ingrese una cantidad válida.");
      return;
    }
    if (!selectedProduct) {
      Alert.alert("Error", "Por favor, seleccione un producto.");
      return;
    }
    if (parsedQuantity > selectedProduct.cantidad) {
      Alert.alert(
        "Error",
        "La cantidad ingresada excede el stock disponible para este producto."
      );
      return;
    }

    // Verificar si el producto ya ha sido agregado
    const isProductAdded = productosAgregados.some(
      (product) => product.idProducto === selectedProduct.idProducto
    );
  
    if (isProductAdded) {
      Alert.alert("Error", "Este producto ya ha sido agregado.");
      return;
    }
  
    // Agregar el producto a la lista de productos seleccionados
    setProductosAgregados([
      ...productosAgregados,
      { ...selectedProduct, quantity: parsedQuantity }
    ]);
  
    setModalVisible(false);
    setQuantity("");  // Limpiar el input de cantidad
  };

  
  const handleModalClose = () => {
    setModalVisible(false);
    setQuantity("");  // Clear the quantity input
  };
  
  const handleListaPress = () => {
    setListaModalVisible(true);
  };
  return (
    <View style={{ flex: 1 }}>
      <FiltrarBuscar
         Data={filteredData} // Pasa los datos filtrados en lugar de toda la lista de productos
         onItemSelected={handleAddPress}// Actualiza selectedProduct cuando se selecciona un producto
        />  
      <View  style={styles.categoriaSelector} >  
         <Picker
          selectedValue={selectedCategory}
         
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.pickerforBuscarProducto}>
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
          <View style= {styles.itemContainer}>
            <Text style={styles.clienteText}>Nombre: {item.nombre}</Text>
            <Text style={styles.clienteText}>Marca: {item.marca}</Text>
            <Text style={styles.clienteText}>Marca: {item.marca}</Text>
            <Text style={styles.clienteText}>Precio: {item.valorVenta}</Text>
            <Text style={styles.clienteText}>Stock: {item.cantidad}</Text>
            <View>
              <TouchableOpacity 
              style={styles.buttonGuardar}
              onPress={() => handleAddPress(item)}>
                <Text  style={styles.colorTextButtonGuardar}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Modal
        animationType="slide"     
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer} >
          <View style={styles.modalContent}>
            {selectedItem ? (
              <>
                <Text  style={styles.clienteText}>Producto: {selectedItem?.nombre}</Text>
                <Text  style={styles.clienteText}>Marca: {selectedItem?.marca}</Text>
                <Text  style={styles.clienteText}>Precio: {selectedItem?.valorVenta}</Text>
                <Text  style={styles.clienteText}>Stock: {selectedItem?.cantidad}</Text>

              </>
                 ) : null }
                 <TextInput 
                 style={styles.inputForModal}
                   placeholder="Agregar cantidad"
                   keyboardType="numeric"
                   value={quantity.toString()}  // Asegurarse de que quantity sea una string
                   onChangeText={(text) => setQuantity(text)}
                  />
      <TouchableOpacity
       style={styles.buttonGuardar}
        onPress={handleAddProduct}
      >
        <Text style={styles.colorTextButtonGuardar}>Agregar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonCerrar}
         onPress={handleModalClose}
      >
        <Text style={styles.colorTextButtonCerrar}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
      <TouchableOpacity  
      style= {styles.fixedButton}
      onPress={handleListaPress}> 
        <Text  style={styles.colorTextButtonGuardar}>Lista</Text>
      </TouchableOpacity>

      <ModalesNuevoPedido
        modalVisible={listaModalVisible}
        setModalVisible={setListaModalVisible}
        products={productosAgregados}
        setProducts={setProductosAgregados} 
        />
    </View>
  );
};  

export default NuevoPedido;
