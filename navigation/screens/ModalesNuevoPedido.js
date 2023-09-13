import React, { useEffect, useState } from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from "react-native";
import BuscarCliente from "../../utilidades/BuscarCliente";
import Calendario from "../../utilidades/Calendario";


const CustomModal = ({ isVisible, onClose, selectedItems, onRemoveItem, onNext, selectedDate, setFechaSeleccionada}) => {
  // Inicializa el estado total
  const [total, setTotal] = useState(0);
  // Estado para controlar si se muestra el segundo modal
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null); // Nuevo estado para el cliente seleccionado
  const [observations, setObservations] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    // Calcular el total de todos los productos
    const calculatedTotal = selectedItems.reduce((acc, item) => acc + item.quantity * item.precio, 0);
    // Actualizar el estado del total
    setTotal(calculatedTotal);
  }, [selectedItems]);

  const handleSelectClient = (client) => {
    setSelectedClient(client);
  };

  const handleCloseModal = () => {
    setResetState(true); // Establece resetState en true al cerrar el modal
    onClose();
  };
  // Función para guardar el pedido
  const crearPedido = () => {
    // Aquí puedes obtener más detalles del cliente o cualquier otra información necesaria para el pedido
    const clienteSeleccionado = selectedClient ? selectedClient.documento : ''; // Utilizamos el campo "documento" del cliente seleccionado

    // Preparar la lista de productos seleccionados con sus cantidades
    const productosSeleccionados = selectedItems.map(item => ({
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
  };

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
                <Text>{item.nombre}   </Text>
                <Text>cantidad: {item.quantity || 0}</Text>
                <Text>val.Unidad: {item.precio}</Text>
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
  clienteText: {
    marginBottom: 5,
  },
});

export default CustomModal;
