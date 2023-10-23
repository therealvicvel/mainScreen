import { View, Text, FlatList, Image, Button, Modal, TextInput, ImageBackground,TouchableOpacity,Alert} from "react-native"
import ModalesNuevoPedido from "./ModalesNuevoPedido";
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from "react";
import FiltrarBuscar from "../../utilidades/filtrarBuscarProd";
import styles from "../../utilidades/styles";
import * as ImagePicker from 'expo-image-picker';


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
    <View style={{ flex: 1, backgroundColor: "#FFFFFF", padding: 10,}}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, }}>
      <FiltrarBuscar
         Data={filteredData} // Pasa los datos filtrados en lugar de toda la lista de productos
         onItemSelected={handleAddPress}// Actualiza selectedProduct cuando se selecciona un producto
        />  
       
      <View style={{ position: 'absolute', top: 0, right: 0 }}>
         <Picker
          selectedValue={selectedCategory}
         
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.pickerforBuscarProducto}>
          <Picker.Item label="Categoría" value={""} />
          <Picker.Item label="Líquidos" value="Líquidos" />
          <Picker.Item label="Sólidos" value="Sólidos" />
          <Picker.Item label="Polvos" value="Polvos" />
          <Picker.Item label="Otro" value="Otro" />
        </Picker>
        </View>
        
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.idProducto.toString()}
        renderItem={({ item }) => (
          <View style={styles.fondoListas}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.clienteText}>{item.nombre}</Text>
              <Text style={styles.clienteText}>Cantidad: {item.cantidad}</Text>
              <Text style={styles.clienteText}>{item.marca}</Text>
              <Text style={styles.clienteText}>Valor venta: {item.valorVenta}</Text>
              <Text style={styles.clienteText}>Valor compra: {item.valorCompra}</Text>
              <Text style={styles.clienteText}>{item.categoria}</Text>
              <TouchableOpacity 
              style={styles.buttonNewProd}
              onPress={() => handleAddPress(item)}>
                <Text  style={styles.colorTextButtonCerrar}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: 100, height: 100 }}>
              {/* Muestra las imágenes si están disponibles */}
              {item.imagenes &&
                item.imagenes.map((imagen, index) => {
                  // Decodifica los datos base64 a URL de imagen
                  const imageUrl = `data:image/png;base64,${imagen}`;
                  return (
                    <Image
                      key={index}
                      source={{ uri: imageUrl }}
                      style={{ width: 100, height: 100, borderRadius: 20 }}
                    />
                  );
                })}
            </View>
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
                 style={{borderRadius: 20,
                  height: 40,
                  borderColor: '#FFFFFF',
                  borderWidth: 1,
                  paddingHorizontal: 10,
                  marginTop: 20,
                  marginBottom: 20,
                  color: "#FFFFFF",}}
                   placeholder="Agregar cantidad"
                   keyboardType="numeric"
                   value={quantity.toString()}
                   cursorColor={"#FFFFFF"}
                   placeholderTextColor={"#FFFFFF"}  
                   onChangeText={(text) => setQuantity(text)} // Asegurarse de que quantity sea una string
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
        <Text  style={{color: "#004187"}}>Siguiente</Text>
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
