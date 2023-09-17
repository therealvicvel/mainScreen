import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ModalesNuevoPedido = ({ modalVisible, setModalVisible, products }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeaderText}>Productos Agregados:</Text>
          {products.map((product, index) => (
            <View key={index} style={styles.productItem}>
              <Text>Producto: {product.nombre}</Text>
              <Text>Cantidad: {product.quantity}</Text>
            </View>
          ))}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
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
});

export default ModalesNuevoPedido;