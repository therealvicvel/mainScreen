import React, { useEffect, useState } from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import BuscarClienteParaPedido from "../../utilidades/BuscarClienteParaPedido";
import Calendario from "../../utilidades/Calendario";
import styles from "../../utilidades/styles";

const ModalesNuevoPedido = ({ modalVisible, setModalVisible, products, setProducts }) => {
  const [total, setTotal] = useState(0);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [observations, setObservations] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [editQuantityIndex, setEditQuantityIndex] = useState(null);
  const [showThirdModal, setShowThirdModal] = useState(false); // Nuevo estado

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
        fechaEntrega: selectedDate,
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
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Elementos seleccionados:</Text>
          <Text style={styles.modalTitle}>Total: <Text>${total.toFixed(2)}</Text></Text>
          {products.map((product, index) => (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }} >
              <Text style={styles.clienteText}>Producto: {product.nombre}</Text>
              <Text style={styles.clienteText}>Cantidad: {product.quantity}</Text>
              <Text style={styles.clienteText}>Precio: {product.valorVenta}  </Text>
              <TouchableOpacity
                style={styles.buttonGuardar}
                onPress={() => handleEditQuantity(index)}>
                <Text style={styles.colorTextButtonGuardar}>Editar cantidad  </Text>
                {editQuantityIndex !== null && (
                  <Modal
                    visible={editQuantityIndex !== null}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setEditQuantityIndex(null)}
                  >
                    <View style={styles.modalContainer} >
                      <View style={styles.modalContent}>
                        <TextInput
                          style={styles.inputForModal}
                          placeholder="Nueva cantidad"
                          keyboardType="numeric"
                          value={products[editQuantityIndex].quantity.toString()}
                          onChangeText={(text) => handleEditQuantityChange(text)}
                          cursorColor={"#FFFFFF"}
                          placeholderTextColor={"#FFFFFF"}
                        />
                        <TouchableOpacity
                          style={styles.buttonGuardar}
                          onPress={handleSaveQuantity}>
                          <Text style={styles.colorTextButtonGuardar}>Guardar cantidad</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCerrar}
                onPress={() => handleRemoveProduct(index)}>
                <Text style={styles.colorTextButtonCerrar}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View >
            <TouchableOpacity
              style={styles.buttonCerrar}
              onPress={handleCloseModal}>
              <Text style={styles.colorTextButtonCerrar}>Volver</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonGuardar}
              onPress={() => {
                if (products.length > 0) {
                  setShowSecondModal(true);
                } else {
                  alert("Debe haber al menos un producto seleccionado.");
                }
              }}
              disabled={products.length === 0}
            >
              <Text style={styles.colorTextButtonGuardar}>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*SEGUNDO MODAL*/}
        {showSecondModal && (
          <Modal
            visible={showSecondModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowSecondModal(false)}
          >
            <View style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}>
              <View style={{ margin: 20, marginTop: 10, padding: 16, backgroundColor: '#FFFFFF', borderRadius: 20, }} >
                <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: "bold", marginBottom: 10, }}>
                  Detalles del pedido</Text>
                <View>
                  <BuscarClienteParaPedido onSelectClient={handleSelectClient} />
                  {selectedClient && (
                    <View>
                      <Text >Datos cliente:</Text>
                      <Text>Nombre: {selectedClient.nombre}</Text>
                      <Text >Direccion: {selectedClient.direccion}</Text>
                    </View>
                  )}
                  <TouchableOpacity
                    style={styles.buttonAddProd}
                    onPress={() => setShowThirdModal(true)} >
                    <Text style={styles.colorTextButtonAddCliente}>Seleccionar fecha</Text>
                  </TouchableOpacity>
                  {/*TERCER MODAL */}
                  <Modal
                    visible={showThirdModal}
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => setShowThirdModal(false)}
                  >
                    <View style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                    }}>
                      <View style={{
                        backgroundColor: 'white',
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        padding: 16,
                      }}>
                        <Calendario selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                        <TouchableOpacity
                          style={styles.buttonCerrar}
                          onPress={() => setShowThirdModal(false)}>
                          <Text style={styles.colorTextButtonCerrar}>Aceptar</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>

                  <TextInput
                    style={styles.input}
                    placeholder="Observaciones"
                    value={observations}
                    cursorColor={"#004187"}
                    placeholderTextColor={"#004187"}
                    onChangeText={setObservations}
                  />

                  <TouchableOpacity style={styles.buttonAddProd} onPress={crearPedido}>
                    <Text style={styles.colorTextButtonAddCliente}>Crear pedido</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => setShowSecondModal(false)} style={styles.buttonAddProd}>
                  <Text style={styles.colorTextButtonAddCliente}>Volver</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}
      </View>
    </Modal>
  );
};

export default ModalesNuevoPedido;
