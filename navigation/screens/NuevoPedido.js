import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, TextInput, Alert } from "react-native";
import ModalesNuevoPedido from "./ModalesNuevoPedido";
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from "react";
import FiltrarBuscar from "../../utilidades/filtrarBuscarProd";

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

  const handleItemSelected = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };
 

  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/product')
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos de la API:", data);
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
    setSelectedItem(item);
    setSelectedProduct(item);
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
      <View style={styles.categoriaSelector}>
        <FiltrarBuscar onItemSelected={handleItemSelected} />
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
          <View style={styles.itemContainer}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Marca: {item.marca}</Text>
            <Text>Precio: {item.valorVenta}</Text>
            <Text>Stock: {item.cantidad}</Text>
            <View>
              <TouchableOpacity onPress={() => handleAddPress(item)}>
                <Text>Add</Text>
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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedItem ? (
              <>
                <Text>Producto: {selectedItem?.nombre}</Text>
                <Text>Marca: {selectedItem?.marca}</Text>
                <Text>Precio: {selectedItem?.valorVenta}</Text>
                <Text>Stock: {selectedItem?.cantidad}</Text>
              </>
                 ) : null }
                 <TextInput
                  style={styles.quantityInput}
                  placeholder="Agregar cantidad"
                  keyboardType="numeric"
                  value={quantity}
                  onChangeText={(text) => setQuantity(text)}
                />
      <TouchableOpacity
        style={styles.boton}
        onPress={handleAddProduct}
      >
        <Text>Agregar</Text>
      </TouchableOpacity>
      <TouchableOpacity
         style={styles.boton}
         onPress={handleModalClose}
      >
        <Text>Cerrar</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
      <TouchableOpacity style={styles.fixedButton} onPress={handleListaPress}>
        <Text style={styles.buttonText}>Lista</Text>
      </TouchableOpacity>

      <ModalesNuevoPedido
        modalVisible={listaModalVisible}
        setModalVisible={setListaModalVisible}
        products={productosAgregados}
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default NuevoPedido;
