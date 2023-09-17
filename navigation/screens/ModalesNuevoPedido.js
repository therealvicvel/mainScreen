import React, { useEffect, useState } from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import BuscarCliente from "../../utilidades/BuscarCliente";
import Calendario from "../../utilidades/Calendario";

const ModalesNuevoPedido = ({ modalVisible, setModalVisible, products, setProducts }) => {
  const [total, setTotal] = useState(0);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [observations, setObservations] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

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

  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(!modalVisible)}
  >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Elementos seleccionados:</Text>
          <Text>Total: <Text>${total.toFixed(2)}</Text></Text>
          {products.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <Text>Producto: {product.nombre}</Text>
              <Text>Cantidad: {product.quantity}</Text>
              <Text>Precio: {product.valorVenta}</Text>
              <TouchableOpacity onPress={() => handleRemoveProduct(index)}>
                <Text>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity  style={styles.closeButton} onPress={handleCloseModal}>
              <Text>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setShowSecondModal(true)}>
              <Text>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Segundo Modal */}
      {showSecondModal && (
        <Modal
          visible={showSecondModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowSecondModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Contenido del segundo modal */}
              <Text>Detalles Pedido</Text>

              {/* Integra el componente BuscarCliente */}
              <View>
                <BuscarCliente onSelectClient={handleSelectClient} />
                {selectedClient ? ( // Mostrar la información del cliente seleccionado solo si existe
                  <View>
                    
                    <Text style={styles.clienteText}>Datos cliente: </Text>
                    <Text style={styles.clienteText}>Nombre: {selectedClient.nombre}</Text>
                    <Text style={styles.clienteText}>Direccion: {selectedClient.direccion}</Text>
                  </View>
                ) : null}
                <Calendario/>
                <TextInput
                  placeholder="Observaciones"
                  value={observations} // Vinculamos el valor del TextInput con el estado observations
                  onChangeText={setObservations} // Manejamos el cambio del valor del TextInput con setObservations
                />
                <TouchableOpacity onPress={crearPedido}>
                  <Text>Crear pedido</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => setShowSecondModal(false)}>
                <Text>volver</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#6CAEF6',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#6CAEF6',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ModalesNuevoPedido;