//Importaciones necesarias
import React from "react";
import { View, Text, FlatList, Image, Button, Modal, TextInput } from "react-native";
import styles from "../../utilidades/styles";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from 'react-native-gesture-handler';
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';

//Creación de lista visual de inventario (declaración de variables y sus datos)
const ListInventario = () => {

  const [selectedCategory, setSelectedCategory] = useState(null);

 
  //Funcion que llama los datos de la base de datos

  const [data, setData] = useState([]);
   //Variable para almacenar el ID del producto ingresado
   const [productoId, setProductoId] = useState('');

   //Función para buscar el producto por ID
   const handleSearchProducto = () => {
    const productoEncontrado = data.find((producto) => producto.idProducto === parseInt(productoId));
    if (productoEncontrado) {
      setSelectedProducto(productoEncontrado);
      setCantidad(productoEncontrado.cantidad);
      setValorVenta(productoEncontrado.valorVenta);
      setValorCompra(productoEncontrado.valorCompra);
      setIsModalVisible(true);
    } else {
      //Mostrar una alerta o mensaje indicando que el producto no fue encontrado
      alert('Producto no encontrado');
    }
  };
   //fin prueba
  

  const [cantidad, setCantidad] = useState("");
  const [valorVenta, setValorVenta] = useState("");
  const [valorCompra, setValorCompra] = useState("");

  const handleCantidadChange = (text) => {
    setCantidad(text);
  };

  const handleValorVentaChange = (text) => {
    setValorVenta(text);
  };

  const handleValorCompraChange = (text) => {
    setValorCompra(text);
  };

  const handleGuardarCambios = () => {
    if (selectedProducto) {
      const productoActualizado = {
        ...selectedProducto,
        cantidad: cantidad,
        valorVenta: valorVenta,
        valorCompra: valorCompra,
      };

      fetch(`https://viramsoftapi.onrender.com/edit_product/${selectedProducto.idProducto}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoActualizado),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.success) {
            alert("Hubo un problema al guardar los cambios.");

            // Actualizar el producto en la lista local sin recargar la página
            setData((prevData) => {
              return prevData.map((item) =>
                item.idProducto === selectedProducto.idProducto ? productoActualizado : item
              );
            });

            setIsModalVisible(false);
          } else {
            alert("Los cambios se han guardado correctamente.");
            setIsModalVisible(false);
          }
        })
        .catch((error) => {
          console.log("Error al guardar los cambios: ", error);
        });
    }
  };
  

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

  //Función para abrir el modal y establecer el producto seleccionado
  const handleOpenModal = (producto) => {
    setSelectedProducto(producto);
    setCantidad(producto.cantidad);
    setValorVenta(producto.valorVenta);
    setValorCompra(producto.valorCompra)
    setIsModalVisible(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  //Creación de campos para mostrar en ellos los datos anteriormente creados
  const renderProductoItem = ({ item }) => {
    if (selectedCategory && item.categoria !== selectedCategory) {
      return null; // No mostrar productos de otras categorías si hay una categoría seleccionada
    }
  
    return (
      <TouchableOpacity onPress={() => handleOpenModal(item)}>
        <View style={styles.fondoListas}>
          <Text style={styles.clienteText}>{item.nombre}</Text>
          <Text style={styles.clienteText}>Cantidad: {item.cantidad}</Text>
          
          <Text style={styles.clienteText}>Marca: {item.marca}</Text>
          <Text style={styles.clienteText}>Valor venta: {item.valorVenta}</Text>
          <Text style={styles.clienteText}>Valor compra: {item.valorCompra}</Text>
          <Text style={styles.clienteText}>Unidad de medida: {item.unidadMedida}</Text>
          <Text style={styles.clienteText}>{item.categoria}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  //Separador visual para cada elemento de la lista
  const separador = () => {
    return <View style={styles.itemSeparador} />
  }

  return (
    //Utilización del FlatList para mostrar los datos, decoración y diseño de la lista y pantalla
    <ScrollView contentContainerStyle={styles.container}>
      {/* TextInput para ingresar el ID del producto */}
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
          {/* fin prueba */}
          <View style={styles.categoriaSelector}>
            <Text style={styles.label}>Filtrar por categoría:</Text>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              style={styles.pickerforBuscarProducto}>
              <Picker.Item label="Todos" value="" />
              <Picker.Item label="Líquidos" value="Líquidos" />
              <Picker.Item label="Sólidos" value="Sólidos" />
              <Picker.Item label="Polvos" value="Polvos" />
              <Picker.Item label="Otro" value="Otro" />
            </Picker>
          </View>
          
      <View>
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
          
          <Text style={styles.clienteText}>{selectedProducto.nombre}</Text>
          
          <Text style={styles.clienteText}>{selectedProducto.categoria}</Text>
          <Text style={styles.modalSubTitle}>Agregar Cambios</Text>
          <Text style={styles.textAyuda}>Cantidad</Text>
          <TextInput
            style={styles.inputForModal}
            placeholder="Cantidad"
            onChangeText={handleCantidadChange}
            value={cantidad}
          />
          <Text style={styles.textAyuda}>Valor venta</Text>
          <TextInput
            style={styles.inputForModal}
            placeholder="Valor venta"
            onChangeText={handleValorVentaChange}
            value={valorVenta}
          />
          <Text style={styles.textAyuda}>Valor compra</Text>
          <TextInput
            style={styles.inputForModal}
            placeholder="Valor compra"
            onChangeText={handleValorCompraChange}
            value={valorCompra}
          />
        </>
      )}
      <TouchableOpacity style={styles.buttonCerrar} onPress={handleCloseModal}>
              <Text style={styles.colorTextButtonCerrar}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonGuardar}
              onPress={handleGuardarCambios}>
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

