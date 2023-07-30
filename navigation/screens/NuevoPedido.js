// Importación de módulos y componentes necesarios
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
import { Checkbox } from 'react-native-paper';
import styles from "../../utilidades/styles";
import DateInput from "../../utilidades/calendario";
import BuscarCliente from "../../utilidades/BuscarCliente";

const NuevoPedido = () => {
  // Estados del componente
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [total, setTotal] = useState(0);

  // Carga inicial de los productos desde la API al montar el componente
  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/product')
      .then((response) => response.json())
      .then((data) => {
        setData(data.productos);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Actualización del total cuando cambian las cantidades seleccionadas
  useEffect(() => {
    calculateTotal();
  }, [selectedQuantities]);

  // Función para alternar la selección de un producto
  const toggleItemSelection = (item) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [item.idProducto]: !prevState[item.idProducto]
    }));
  };

  // Función para incrementar la cantidad de un producto seleccionado
  const incrementQuantity = (itemId) => {
    setSelectedQuantities(prevState => ({
      ...prevState,
      [itemId]: (prevState[itemId] || 0) + 1
    }));
  };

  // Función para decrementar la cantidad de un producto seleccionado
  const decrementQuantity = (itemId) => {
    setSelectedQuantities(prevState => ({
      ...prevState,
      [itemId]: Math.max((prevState[itemId] || 0) - 1, 0)
    }));
  };

  // Renderiza un elemento de la lista de productos
  const rendePedidoItem = ({ item }) => {
    const isSelected = selectedItems[item.idProducto] || false;
    const quantity = selectedQuantities[item.idProducto] || 0;

    return (
      <TouchableOpacity onPress={() => toggleItemSelection(item)}>
        <View style={styles.container}>
          <View style={styles.listItem}>
            <Checkbox
              status={isSelected ? 'checked' : 'unchecked'}
              onPress={() => toggleItemSelection(item)}
            />
            <Text> Nombre: {item.nombre}</Text>
            <Text> Marca: {item.marca}</Text>
            <Text> Precio: {item.valorVenta}</Text>
            <Text> Fecha de vencimiento: {item.fechaVencimiento}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => decrementQuantity(item.idProducto)}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <TextInput
                value={quantity.toString()}
                onChangeText={(text) => {
                  const newQuantity = parseInt(text, 10);
                  setSelectedQuantities(prevState => ({
                    ...prevState,
                    [item.idProducto]: isNaN(newQuantity) ? 0 : newQuantity,
                  }));
                }}
                keyboardType="numeric"
                style={styles.quantityInput}
              />
              <TouchableOpacity onPress={() => incrementQuantity(item.idProducto)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Calcula el total del pedido en función de los productos seleccionados
  const calculateTotal = () => {
    let totalAmount = 0;
    data.forEach((item) => {
      if (selectedItems[item.idProducto]) {
        const quantity = selectedQuantities[item.idProducto] || 0;
        totalAmount += item.valorVenta * quantity;
      }
    });
    setTotal(totalAmount);
  };

  // Abre el modal para mostrar los productos seleccionados y la información adicional del pedido
  const openModal = () => {
    setShowModal(true);
    const selected = data.filter(item => selectedItems[item.idProducto] && (selectedQuantities[item.idProducto] || 0) > 0);
    setSelectedProducts(selected);
  };

  // Cierra el modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Componente principal
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={rendePedidoItem}
          keyExtractor={(item) => item.idProducto.toString()}
        />
      </View>
      <View style={styles.containerTotal}>
        <Text style={styles.colorTextTotal}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.buttonNext} onPress={openModal}>
          <Text style={styles.colorTextButtonNext}>Siguiente</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Productos seleccionados</Text>
            <FlatList
              data={selectedProducts}
              renderItem={({ item }) => (
                <Text style={styles.clienteText} >
                  Nombre: {item.nombre}, Marca: {item.marca}, Cantidad: {selectedQuantities[item.idProducto] || 0}
                </Text>
              )}
              keyExtractor={(item) => item.idProducto.toString()}
            />
            <Text style={styles.clienteText}>Total: ${total.toFixed(2)}</Text>
            <Text style={styles.modalTitle}>Informacion Adicional:</Text>
            <View>
            <BuscarCliente/>
            </View>
            <TextInput style={styles.inputForModal} placeholder="Observaciones" />
            <Text style={styles.clienteText}>Fecha Pedido: {<DateInput />} </Text>
            <TouchableOpacity style={styles.buttonCrearPedido} onPress={() => alert("Pedido creado con éxito")}>
              <Text style={styles.colorTextButtonCrearPedido}>Crear pedido</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCerrar} onPress={closeModal}>
              <Text style={styles.colorTextButtonCerrar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NuevoPedido;
