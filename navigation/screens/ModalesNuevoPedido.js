import React, { useEffect, useState } from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import BuscarCliente from "../../utilidades/BuscarCliente";
import Calendario from "../../utilidades/Calendario";


const ModalesNuevoPedido = ({ modalVisible, setModalVisible, products, setProducts }) => {
  const [total, setTotal] = useState(0);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [observations, setObservations] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [editQuantityIndex, setEditQuantityIndex] = useState(null);

  const handleEditQuantity = (index) => {
    setEditQuantityIndex(index);
  };
  const handleEditQuantityChange = (text) => {
    const newQuantity = parseInt(text, 10) || 0;
  
    // Validar que la nueva cantidad no sea mayor que el stock
    if (editQuantityIndex !== null && newQuantity > products[editQuantityIndex].cantidad) {
      alert('La cantidad no puede ser mayor que el stock disponible.');
      return;
    }
  
    // Solo actualizar si la nueva cantidad es válida (mayor o igual a cero)
    if (newQuantity >= 0) {
      const updatedProducts = products.map((product, index) => {
        if (index === editQuantityIndex) {
          return {
            ...product,
            quantity: newQuantity,
          };
        }
        return product;
      });
      setProducts(updatedProducts);
    }
  };
  
  const handleSaveQuantity = () => {
    setEditQuantityIndex(null);
  };
  useEffect(() => {
    const calculatedTotal = products.reduce((acc, product) => acc + product.quantity * product.valorVenta, 0);
    setTotal(calculatedTotal);
  }, [products]);

  const handleSelectClient = (client) => {
    setSelectedClient(client);
  };

  const handleCloseModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };
  const crearPedido = () => {
    if (!selectedClient) {
      alert('Debes seleccionar un cliente antes de crear el pedido.');
      return;
    }
  
    if (!selectedDate) {
      alert('Debes seleccionar una fecha antes de crear el pedido.');
      return;
    }
  
    if (!observations.trim()) {
      alert('Debes ingresar observaciones antes de crear el pedido.');
      return;
    }
    // Aquí puedes obtener más detalles del cliente o cualquier otra información necesaria para el pedido
    const clienteSeleccionado = selectedClient ? selectedClient.documento : ''; // Utilizamos el campo "documento" del cliente seleccionado

    // Preparar la lista de productos seleccionados con sus cantidades
    const productosSeleccionados = products.map(item => ({
      idProducto: item.idProducto,
      cantidad: item.quantity || 0, // Usamos la cantidad del producto directamente
    }));

    // Construir el objeto pedidoGuardado con todos los datos
    const pedidoGuardado = {
      pedido: {
        documentoCliente: clienteSeleccionado,
        fechaEntrega: selectedDate ,
        observacion: observations, // Usamos el estado "observations" para las observaciones del pedido
      },
      productos: productosSeleccionados,
    };
    console.log('Pedido Guardado:', pedidoGuardado);

    // Enviar el pedido a la API utilizando fetch
    fetch('https://viramsoftapi.onrender.com/create_order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pedidoGuardado),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta de la API:", data);
      // Resto del código para manejar la respuesta de la API
    })
    .catch((error) => {
      console.error("Error al guardar el pedido: ", error);
      alert("Ocurrió un error al guardar el pedido. Por favor, intenta nuevamente.");
    });
    setShowSecondModal(false);
    setModalVisible(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.header}>Elementos seleccionados:</Text>
          <Text>Total: <Text style={styles.total}>${total.toFixed(2)}</Text></Text>
          {products.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <Text>Producto: {product.nombre}</Text>
              <Text>Cantidad: {product.quantity}</Text>
              <Text>Precio: {product.valorVenta}</Text>
              <TouchableOpacity onPress={() => handleEditQuantity(index)}>
                <Text style={styles.link}>Editar Cantidad</Text>
                {editQuantityIndex !== null && (
                  <Modal
                    visible={editQuantityIndex !== null}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setEditQuantityIndex(null)}
                  >
                    <View style={styles.modalContent}>
                      <View style={styles.innerContent}>
                        <TextInput
                          placeholder="Nueva cantidad"
                          keyboardType="numeric"
                          value={products[editQuantityIndex].quantity.toString()}
                          onChangeText={(text) => handleEditQuantityChange(text)}
                        />
                        <TouchableOpacity onPress={handleSaveQuantity}>
                          <Text style={styles.link}>Guardar Cantidad</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemoveProduct(index)}>
                <Text style={styles.link}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={styles.link}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (products.length > 0) {
                  setShowSecondModal(true);
                } else {
                  alert("Debe haber al menos un producto seleccionado.");
                }
              }}
              disabled={products.length === 0}
            >
              <Text style={styles.link}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </View>
  
        {showSecondModal && (
          <Modal
            visible={showSecondModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowSecondModal(false)}
          >
            <View style={styles.container}>
              <View style={styles.content}>
                <Text style={styles.header}>Detalles Pedido</Text>
                <View>
               
                  <BuscarCliente onSelectClient={handleSelectClient} />
                  {selectedClient && (
                    <View>
                      <Text>Datos cliente:</Text>
                      <Text>Nombre: {selectedClient.nombre}</Text>
                      <Text>Direccion: {selectedClient.direccion}</Text>
                    </View>
                  )}
                  <Calendario selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                  <TextInput
                    placeholder="Observaciones"
                    value={observations}
                    onChangeText={setObservations}
                  />
                   
                  <TouchableOpacity onPress={crearPedido}>
                    <Text style={styles.link}>Crear pedido</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setShowSecondModal(false)}>
                  <Text style={styles.link}>Volver</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </Modal>
  );};

export default ModalesNuevoPedido;
const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  total: {
    fontWeight: 'bold',
  },
  productItem: {
    marginBottom: 15,
  },
  link: {
    backgroundColor: "#6CAEF6",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },
};