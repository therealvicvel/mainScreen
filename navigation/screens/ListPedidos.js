import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Modal, ScrollView, TouchableOpacity, ActivityIndicator, Linking, Share } from 'react-native';

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

  const setDetallesPDF = () => {
    if (selectedPedido) {
      setIsLoading(true);
  
      fetch(`https://viramsoftapi.onrender.com/generar_comprobante?pedido_id=${selectedPedido.idPedido}`)
        .then((response) => {
          if (response.ok) {
            const contentDisposition = response.headers.get('content-disposition');
            const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
            const filename = filenameMatch && filenameMatch[1] ? filenameMatch[1] : 'comprobante_pedido.pdf';
  
            // Comparte el enlace de descarga del PDF
            Share.share({
              message: `Descarga el comprobante del pedido aquí: ${response.url}`,
            })
              .then(setIsLoading(false))
              .catch((error) => console.error('Error al compartir:', error));
          } else {
            console.error('Error al obtener los detalles del pedido:', response.status);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.error('Error al obtener los detalles del pedido:', error);
          setIsLoading(false);
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
              <Text style={styles.listItemText}>{item.nombre}</Text>
              <Text style={styles.listItemText}>Fecha de entrega: {item.fechaEntrega}</Text>
              <Text style={styles.listItemText}>{item.estado}</Text>
              <Text style={styles.listItemText}>Total: ${item.valorTotal}</Text>
              <TouchableOpacity style= {styles.buttonEntregaryDetalles} ><Text  style={{color: '#004187'}}>Entregar</Text></TouchableOpacity>
              <TouchableOpacity style= {styles.buttonEntregaryDetalles} onPress={() => handleOpenModal(item)}>
                <Text style={{color: '#004187'}}>Detalles</Text>
              </TouchableOpacity>
          </View>
        )}
      />

      <Modal visible={detallesPedido !== null} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalles del pedido</Text>
            {isLoading ? (
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : detallesPedido && detallesPedido.length > 0 ? (
              <View>
                {detallesPedido.map((producto, index) => (
                  <View key={index}>
                    <Text >{producto['nombre']}</Text>
                    <Text >Cantidad: {producto['cantidad']}</Text>
                    <Text >Valor unitario: {producto['valor unitario']}</Text>
                    <Text >Valor total: {producto['valor total']}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text>No hay detalles disponibles para este pedido.</Text>
            )}
            <TouchableOpacity style={styles.buttonCerrar} onPress={setDetallesPDF}>
        <Text style={styles.colorTextButtonCerrar}>Descargar PDF</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCerrar}onPress={() => setDetallesPedido(null)}>
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

  listItemText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#FFFFFF',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  buttonGuardar: {
    backgroundColor: '#6CAEF6',
    padding: 10,
    borderRadius: 70,
    marginTop: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonCerrar: {
    marginTop: 10,
    backgroundColor: '#004187',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  colorTextButtonCerrar: {
    color: 'white',
  },
 FlatListestilo: {
    flex: 1,
    backgroundColor: '#004187',
    margin: 5,
    padding: 10,
    borderRadius: 30,
  },
 buttonEntregaryDetalles: {
  backgroundColor: '#FFFFFF',
  padding: 10,
  borderRadius: 70,
  marginTop: 10,
  alignItems: "center"
},
};