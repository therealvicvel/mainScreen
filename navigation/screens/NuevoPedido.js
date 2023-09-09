import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, TextInput, Alert } from "react-native";
import CustomModal from "./ModalesNuevoPedido";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';

const NuevoPedido = () => {
  // Estados iniciales
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [resetState, setResetState] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [buttonPressed, setButtonPressed] = useState({});
  const [productoId, setProductoId] = useState('');
  const [selectedProducto, setSelectedProducto] = useState(null);

  useEffect(() => {
    // Cargar datos iniciales desde una API
    fetch("https://viramsoftapi.onrender.com/product")
      .then((response) => response.json())
      .then((data) => {
        // Inicializar datos con la información de botón presionado
        const initialData = data.productos.map((producto) => ({
          ...producto,
          buttonPressed: false,
        }));
        setData(initialData);
        setIsLoading(false);

        // Inicializar cantidades a cero
        const initialQuantities = {};
        data.productos.forEach((producto) => {
          initialQuantities[producto.idProducto] = 0;
        });
        setQuantities(initialQuantities);
      })
      .catch((error) => {
        console.error("Error al cargar datos: ", error);
        setIsLoading(false);
      });
  }, []);

  // Función para buscar un producto por ID
  const handleSearchProducto = () => {
    const productoEncontrado = data.find((producto) => producto.idProducto === parseInt(productoId));
    if (productoEncontrado) {
      setSelectedProducto(productoEncontrado);
      setIsModalVisible(true);
    } else {
      // Mostrar una alerta o mensaje indicando que el producto no fue encontrado
      alert('Producto no encontrado');
    }
  };

  // Manejar la selección de un elemento
  const handleAddToCart = (item, quantity) => {
    if (resetState) {
      // Restablecer el estado de los botones "agregar" y las cantidades
      setData((prevData) =>
        prevData.map((prevItem) => ({
          ...prevItem,
          buttonPressed: false,
        }))
      );
      setQuantities({});
      setResetState(false);
    }

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

        // Actualizar el estado del botón presionado a "false"
        setButtonPressed({ ...buttonPressed, [item.idProducto]: false });
      } else {
        // Si no está seleccionado, agregarlo a selectedItems con precio
        setSelectedItems([
          ...selectedItems,
          { ...item, quantity, precio: item.valorVenta },
        ]);

        // Actualizar el estado del botón presionado a "true"
        setButtonPressed({ ...buttonPressed, [item.idProducto]: true });
      }
    } else {
      // Mostrar una alerta si la cantidad es menor o igual a 0
      Alert.alert('Cantidad no válida', 'La cantidad debe ser mayor a 0.');
    }
  };

  // Manejar la eliminación de un elemento
  const handleRemoveFromCart = (item) => {
    setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.idProducto !== item.idProducto));
  };

  // Función para cerrar el modal y restablecer el estado
  const handleCloseModal = () => {
    setResetState(true); // Establecer resetState en true al cerrar el modal
    setIsModalVisible(false); // Cerrar el modal
  };

  return (
    <View style={{ flex: 1 }}>
      
        {/* Barra de búsqueda */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="ID del producto"
            value={productoId}
            onChangeText={setProductoId}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearchProducto}>
            <Icon name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Selector de categoría */}
        <View style={styles.categoriaSelector}>
          <Text style={styles.label}>Filtrar por categoría:</Text>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.pickerforBuscarProducto}
          >
            <Picker.Item label="Todos" value={null} />
            <Picker.Item label="Líquidos" value="Líquidos" />
            <Picker.Item label="Sólidos" value="Sólidos" />
            <Picker.Item label="Polvos" value="Polvos" />
            <Picker.Item label="Otro" value="Otro" />
          </Picker>
        </View>
      

      {/* Lista de productos */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.idProducto.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>Nombre: {item.nombre}</Text>
            <Text>Marca: {item.marca}</Text>
            <Text>Precio: {item.valorVenta}</Text>
            <Text>Stock: {item.cantidad}</Text>
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

      {/* Botón flotante para mostrar el modal */}
      <TouchableOpacity
        style={styles.fixedButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.buttonText}>Lista</Text>
      </TouchableOpacity>

      {/* Renderizar el modal */}
      <CustomModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        selectedItems={selectedItems}
        onRemoveItem={handleRemoveFromCart}
      />
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProducto && (
              <>
                <Text style={styles.clienteText}>ID: {selectedProducto.idProducto}</Text>
                <Text style={styles.clienteText}>Nombre: {selectedProducto.nombre}</Text>
                <Text style={styles.clienteText}>Marca: {selectedProducto.marca}</Text>
                <Text style={styles.clienteText}>Cantidad: {selectedProducto.cantidad}</Text>
                <Text style={styles.clienteText}>Valor compra: {selectedProducto.valorCompra}</Text>
                <Text style={styles.clienteText}>Valor venta: {selectedProducto.valorVenta}</Text>
                <Text style={styles.clienteText}>Unidad medida: {selectedProducto.unidadMedida}</Text>
                <Text style={styles.clienteText}>Categoría: {selectedProducto.categoria}</Text>
                <Text style={styles.modalSubTitle}>Agregar Cambios</Text>
              </>
            )}
            <TouchableOpacity style={styles.boton} onPress={handleCloseModal}>
              <Text style={styles.colorTextButtonCerrar}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
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
