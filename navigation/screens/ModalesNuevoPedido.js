import React from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet,FlatList } from "react-native";

const CustomModal = ({ isVisible, onClose, selectedItems, onRemoveItem }) => {
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
            <FlatList
              data={selectedItems}
              keyExtractor={(item) => item.idProducto.toString()}
              renderItem={({ item }) => (
                <View>
                  <Text>{item.nombre}</Text>
                  <Text>Cantidad: {item.quantity}</Text>
                  <TouchableOpacity onPress={() => onRemoveItem(item)}>
                    <Text>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity onPress={onClose}>
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
});

export default CustomModal;
