import React, { useEffect, useState } from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import CalendarioPedidos from "../../utilidades/Calendario";

const CustomModal = ({ isVisible, onClose, selectedItems, onRemoveItem, onNext }) => {
  // Inicializa el estado total
  const [total, setTotal] = useState(0);
  // Estado para controlar si se muestra el segundo modal
  const [showSecondModal, setShowSecondModal] = useState(false);

  useEffect(() => {
    // Calcular el total de todos los productos
    const calculatedTotal = selectedItems.reduce((acc, item) => acc + item.quantity * item.precio, 0);
    // Actualizar el estado del total
    setTotal(calculatedTotal);
  }, [selectedItems]);

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Elementos seleccionados:</Text>
          <Text>Total: <Text>${total.toFixed(2)}</Text></Text>
          <FlatList
            data={selectedItems}
            keyExtractor={(item) => item.idProducto.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text>{item.nombre} cantidad: {item.quantity} val.Unidad: {item.precio} </Text>
                <TouchableOpacity onPress={() => onRemoveItem(item)} style={styles.button}>
                  <Text>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
            style={styles.flatList}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
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
              <CalendarioPedidos onDateChange={(fecha) => console.log(fecha)} />
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  itemContainer: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 5,
    borderRadius: 5,
  },
  flatList: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    width: "100%",
  },
});

export default CustomModal;
