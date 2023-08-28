import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

const ModalComponent = ({ visible, data, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Contenido del modal */}
        <Text>Nombre: {data.nombre}</Text>
        <Text>Marca: {data.marca}</Text>
        <Text>Precio: {data.valorVenta}</Text>
        <Text>Stock: {data.cantidad}</Text>
        {/* Agrega los elementos adicionales que desees mostrar en el modal */}
        <TouchableOpacity onPress={onClose}>
          <Text>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo semitransparente
  },
};

export default ModalComponent;