import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

const ListProd = ({ item }) => {
  const { id, nombre, precio, fecha, direccion, estado } = item;
  const [modalVisible, setModalVisible] = useState(false);
  
  //validar estado pedido
  const isEntregado = () => {
    return estado === "entregado";
  };

  return (
    <TouchableOpacity onPress={() => setModalVisible(true)}>
      <View style={{ padding: 10 }}>
        <View style={styles.Textimput}>
          <Text>id: {id}</Text>
          <Text>Cliente: {nombre}</Text>
          <Text>valor: {precio}</Text>
          <Text>fecha: {fecha}</Text>
          <Text>Direccion: {direccion}</Text>
          <Text>Estado: {estado}</Text>
        </View>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Detalles del Pedido:</Text>
            <Text>ID: {id}</Text>
            <Text>Cliente: {nombre}</Text>
            <Text>Valor: {precio}</Text>
            <Text>Fecha: {fecha}</Text>
            <Text>Direccion: {direccion}</Text>
            <Text>Estado: {estado}</Text>
            <TouchableOpacity style={styles.button} onPress={() => alert("el pedido se ha marcado como Entregado")}>
              <Text style={styles.buttonText}>
                {isEntregado() ? "Cambiar a no entregado" : "Entregado"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCerrar}
              onPress={() => setModalVisible(false)}
            >
              <Text>Cancelar</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Textimput: {
    borderColor: "#A3C669",
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  buttonCerrar: {
    backgroundColor: '#F65F50',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#A3C669',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#A3C669",
    borderRadius: 5,
  },
});

export default ListProd;
