import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import styles from "./styles";

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
        <View>
          <View>
            <Text style={styles.modalTitle}>Detalles del pedido:</Text>
            <Text>ID: {id}</Text>
            <Text>Cliente: {nombre}</Text>
            <Text>Valor: {precio}</Text>
            <Text>Fecha: {fecha}</Text>
            <Text>Direccion: {direccion}</Text>
            <Text>Estado: {estado}</Text>
            <TouchableOpacity style={styles.button} onPress={() => alert("el pedido se ha marcado como Entregado")}>
<<<<<<< HEAD
              <Text style={styles.buttonConfirm}>Entregado</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCerrar} onPress={() => setModalVisible(false)} >
=======
              <Text style={styles.buttonText}>
                {isEntregado() ? "Cambiar a no entregado" : "Entregado"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCerrar}
              onPress={() => setModalVisible(false)}
            >
>>>>>>> f02f3a1365872716678fc4e3189c5cbb0e97d7bb
              <Text>Cancelar</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default ListProd;
