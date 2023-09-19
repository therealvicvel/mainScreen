import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Modal, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

const ListPedido = () => {
  const [data, setData] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [detallesPedido, setDetallesPedido] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para controlar la carga

  useEffect(() => {
    if (isLoading && selectedPedido) {
      handleDetallesPedido(selectedPedido);
    }
  }, [isLoading, selectedPedido]);

  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/order')
      .then((response) => response.json())
      .then((data) => {
        setData(data.pedidos);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleOpenModal = (pedido) => {
    setSelectedPedido(pedido);
    setDetallesPedido(null); // Reset detallesPedido
    setIsLoading(true);
    // Rest of the code
  };

  const handleCloseModal = () => {
    setSelectedPedido(null);
  };

  const handleDetallesPedido = () => {
    if (selectedPedido) {
      fetch(`https://viramsoftapi.onrender.com/detalle_pedido/${selectedPedido.idPedido}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Detalles del pedido:', data);
          setDetallesPedido(data.detalle_pedido);
          setIsLoading(false); // Marcar que se ha completado la carga
        })
        .catch((error) => {
          console.error('Error al obtener los detalles del pedido:', error);
          setIsLoading(false); // Asegurarse de marcar que se ha completado la carga en caso de error
        });
    }
  };
  return  (
    <View >
      <FlatList
            data={data}
            keyExtractor={(item) => item.idPedido.toString()}
            numColumns={2}
        renderItem={({ item }) => (
          <View style = {styles.FlatListestilo}>
              <Text style={styles.listItemText}>cliente: {item.documentoCliente}</Text>
              <Text style={styles.listItemText}>fecha Entrega: {item.fechaEntrega}</Text>
              <Text style={styles.listItemText}>{item.estado}</Text>
              <TouchableOpacity><Text>cambiar</Text></TouchableOpacity>
              <Text style={styles.listItemText}>Valor: {item.valorTotal}</Text>
              <TouchableOpacity onPress={() => handleOpenModal(item)}>
                <Text>Detalles</Text>
              </TouchableOpacity>
          </View>
        )}
      />

      <Modal visible={detallesPedido !== null} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalles del Pedido</Text>
            {isLoading ? (
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : detallesPedido && detallesPedido.length > 0 ? (
              <View>
                {detallesPedido.map((producto, index) => (
                  <View key={index}>
                    <Text style={styles.listItemText}>Nombre: {producto['nombre']}</Text>
                    <Text style={styles.listItemText}>Cantidad: {producto['cantidad']}</Text>
                    <Text style={styles.listItemText}>Valor unitario: {producto['valor unitario']}</Text>
                    <Text style={styles.listItemText}>Valor total: {producto['valor total']}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text>No hay detalles disponibles para este pedido.</Text>
            )}
            <TouchableOpacity style={styles.buttonCerrar} onPress={() => setDetallesPedido(null)}>
              <Text style={styles.colorTextButtonCerrar}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ListPedido;
const styles = {
  container: {
    flex: 1,
  },
  listItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
  listItemText: {
    fontSize: 16,
    marginBottom: 5,
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
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonCerrar: {
    marginTop: 10,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  colorTextButtonCerrar: {
    color: 'white',
  },
 FlatListestilo :{
  flex: 1,
  backgroundColor: '#ffffff',
  margin: 5,
  padding: 10,
  borderRadius: 5,
 }
};