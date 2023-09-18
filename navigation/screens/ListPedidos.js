import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Modal, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../../utilidades/styles';

const ListPedido = () => {
  const [data, setData] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [detallesPedido, setDetallesPedido] = useState(null);

  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/order')
      .then((response) => response.json())
      .then((data) => {
        setData(data.pedidos);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleOpenModal = (pedido) => {
    setSelectedPedido(pedido);
    handleDetallesPedido(pedido);
  };

  const handleCloseModal = () => {
    setSelectedPedido(null);
  };

  const handleDetallesPedido = () => {
    if (selectedPedido) {
      fetch(`https://viramsoftapi.onrender.com/detalle_pedido/${selectedPedido.idPedido}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Detalles del pedido:', data); // Mostrar en la consola la respuesta de la API
          setDetallesPedido(data.detalle_pedido);
        })
        .catch((error) => {
          console.error('Error al obtener los detalles del pedido:', error);
        });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.idPedido.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={{ flex: 1, backgroundColor: '#ffffff', margin: 5, padding: 10, borderRadius: 5 }}>
            <TouchableOpacity onPress={() => handleOpenModal(item)}>
              <Text>idPedido: {item.idPedido}</Text>
              <Text>cliente: {item.documentoCliente}</Text>
              <Text>fecha Entrega: {item.fechaEntrega}</Text>
              <Text>estado: {item.estado}</Text>
              <Text>Valor: {item.valorTotal}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
<Modal visible={detallesPedido !== null} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalles del Pedido</Text>
            {detallesPedido && detallesPedido.length > 0 ? (
              <ScrollView>
                {detallesPedido.map((producto, index) => (
                  <View key={index}>
                    <Text>Nombre: {producto['nombre']}</Text>
                    <Text>Cantidad: {producto['cantidad']}</Text>
                    <Text>Valor unitario: {producto['valor unitario']}</Text>
                    <Text>Valor total: {producto['valor total']}</Text>
                  </View>
                ))}
              </ScrollView>
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