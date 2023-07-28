//Importaciones necesarias
import React from "react";
import { View, Text, FlatList, Image, Button, Modal, TextInput } from "react-native";
import styles from "../../utilidades/styles";
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

//Creación de lista visual de inventario (declaración de variables y sus datos)
const ListInventario = () => {

  //Funcion que llama los datos de la base de datos

  const [data, setData] = useState([]);
   // Variable para almacenar el ID del producto ingresado
   const [productoId, setProductoId] = useState('');

   // Función para buscar el producto por ID
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
   //fin prueba
  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/product')
      .then((response) => response.json())
      .then((data) => {
        setData(data.productos);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
      });
  }, []);


  //Variables para el manejo del Modal
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Función para abrir el modal y establecer el producto seleccionado
  const handleOpenModal = (producto) => {
    setSelectedProducto(producto);
    setIsModalVisible(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  //Creación de campos para mostrar en ellos los datos anteriormente creados
  const renderProductoItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOpenModal(item)}>
      <View style={styles.fondoListas}>
        <Text style={styles.clienteText}>Nombre: {item.nombre}</Text>
        <Text style={styles.clienteText}>Cantidad: {item.cantidad}</Text>
        <Text style={styles.clienteText}>ID Producto: {item.idProducto}</Text>
        <Text style={styles.clienteText}>Marca: {item.marca}</Text>
        <Text style={styles.clienteText}>Valor venta: {item.valorVenta}</Text>
        <Text style={styles.clienteText}>Fecha de vencimiento: {item.fechaVencimiento}</Text>
        <Text style={styles.clienteText}>Valor compra: {item.valorCompra}</Text>
        <Text style={styles.clienteText}>Unidad de medida: {item.unidadMedida}</Text>
        <Text style={styles.clienteText}>Categoría: {item.categoria}</Text>
      </View>
    </TouchableOpacity>
  );

  //Separador visual para cada elemento de la lista
  const separador = () => {
    return <View style={styles.itemSeparador} />
  }

  return (
    //Utilización del FlatList para mostrar los datos, decoración y diseño de la lista y pantalla
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <View style={{flex: '2%', backgroundColor: '#badde8', flexDirection: 'row', justifyContent: 'center'}}>
          {/* TextInput para ingresar el ID del producto */}
          <TextInput
            style={{
              borderRadius: 20,
              borderColor: '#004187',
              width: '50%',
              borderWidth: 1,
              padding: 10,
              marginVertical: 10,
              color: "#004187"}}
            placeholder="ID del producto"
            value={productoId}
            onChangeText={setProductoId}
            keyboardType="numeric"
          />
          {/* TouchableOpacity para buscar producto por ID */}
          <TouchableOpacity style={styles.buttonAddCliente} onPress={handleSearchProducto}>
            <Text style={styles.clienteText}>Buscar</Text>
          </TouchableOpacity>
          {/* fin prueba */}
        </View>
        
        <FlatList
          data={data}
          SeparadorDeLineas={separador}
          renderItem={renderProductoItem}
          keyExtractor={(item) => item.idProducto.toString()}
        />
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProducto && (
              <>
                <Text style={styles.modalTitle}>Actualizar campos de un producto</Text>
                <Text style={styles.clienteText}>ID: {selectedProducto.idProducto}</Text>
                <Text style={styles.clienteText}>Nombre: {selectedProducto.nombre}</Text>
                <Text style={styles.clienteText}>Marca: {selectedProducto.marca}</Text>
                <Text style={styles.clienteText}>Cantidad: {selectedProducto.cantidad}</Text>
                <Text style={styles.clienteText}>Valor compra: {selectedProducto.valorCompra}</Text>
                <Text style={styles.clienteText}>Valor venta: {selectedProducto.valorVenta}</Text>
                <Text style={styles.clienteText}>Unidad medida: {selectedProducto.unidadMedida}</Text>
                <Text style={styles.clienteText}>Fecha vencimiento: {selectedProducto.fechaVencimiento}</Text>
                <Text style={styles.clienteText}>Categoría: {selectedProducto.categoria}</Text>
                <Text style={styles.modalSubTitle}>Agregar Cambios</Text>
                <TextInput style={styles.inputForModal}
                  placeholder="Cantidad"></TextInput>
                <TextInput style={styles.inputForModal}
                  placeholder="Valor venta"></TextInput>
              </>
            )}
            <TouchableOpacity style={styles.buttonCerrar} onPress={handleCloseModal}>
              <Text style={styles.colorTextButtonCerrar}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonGuardar}
              onPress={() => alert("Los cambios se han guardado")}>
              <Text style={styles.colorTextButtonGuardar}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default function InventarioScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <ListInventario />
      </View>
    </ScrollView>
  );
}

