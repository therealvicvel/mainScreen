import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Modal, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';

const ListPedido = () => {
  const [data, setData] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [detallesPedido, setDetallesPedido] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setDetallesPedido(null);
    setIsLoading(true);
  };

  const handleCloseModal = () => {
    setSelectedPedido(null);
  };

  const handleDetallesPedido = () => {
    if (selectedPedido) {
      fetch(`https://viramsoftapi.onrender.com/detalle_pedido/${selectedPedido.idPedido}`)
        .then((response) => response.json())
        .then((data) => {
          setDetallesPedido(data.detalle_pedido);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error al obtener los detalles del pedido:', error);
          setIsLoading(false);
        });
    }
  };
<<<<<<< HEAD
  return  (
=======

  const setDetallesPDF = () => {
    if (selectedPedido) {
      setIsLoading(true);

      // Envía una solicitud GET para obtener el enlace de descarga del PDF
      fetch(`https://viramsoftapi.onrender.com/generar_comprobante?pedido_id=${selectedPedido.idPedido}`)
        .then((response) => {
          if (response.ok) {
            const contentDisposition = response.headers.get('content-disposition');
            const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
            const filename = filenameMatch && filenameMatch[1] ? filenameMatch[1] : 'comprobante_pedido.pdf';

            // Abre el enlace de descarga en el navegador predeterminado
            Linking.openURL(response.url);
            setIsLoading(false);
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


  return (
>>>>>>> e342550eeee75c5d707dad079ebeb60fa3a65cc5
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.idPedido.toString()}
        numColumns={2}
        renderItem={({ item }) => (
<<<<<<< HEAD
          <View style = {styles.FlatListestilo}>
              <Text style={styles.listItemText}>{item.nombre}</Text>
              <Text style={styles.listItemText}>Fecha de entrega: {item.fechaEntrega}</Text>
              <Text style={styles.listItemText}>{item.estado}</Text>
              <Text style={styles.listItemText}>Total: ${item.valorTotal}</Text>
              <TouchableOpacity style= {styles.buttonEntregaryDetalles} ><Text  style={{color: '#004187'}}>Entregar</Text></TouchableOpacity>
              <TouchableOpacity style= {styles.buttonEntregaryDetalles} onPress={() => handleOpenModal(item)}>
                <Text style={{color: '#004187'}}>Detalles</Text>
              </TouchableOpacity>
              
=======
          <View style={styles.FlatListestilo}>
            <Text style={styles.listItemText}>Cliente: {item.nombre}</Text>
            <Text style={styles.listItemText}>Fecha Entrega: {item.fechaEntrega}</Text>
            <Text style={styles.listItemText}>{item.estado}</Text>
            <TouchableOpacity style={styles.buttonGuardar}>
              <Text style={{ color: '#FFFFFF' }}>Cambiar</Text>
            </TouchableOpacity>
            <Text style={styles.listItemText}>Valor: {item.valorTotal}</Text>
            <TouchableOpacity style={styles.buttonGuardar} onPress={() => handleOpenModal(item)}>
              <Text style={{ color: '#FFFFFF' }}>Detalles</Text>
            </TouchableOpacity>
>>>>>>> e342550eeee75c5d707dad079ebeb60fa3a65cc5
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
<<<<<<< HEAD
                    <Text >{producto['nombre']}</Text>
                    <Text >Cantidad: {producto['cantidad']}</Text>
                    <Text >Valor unitario: {producto['valor unitario']}</Text>
                    <Text >Valor total: {producto['valor total']}</Text>
=======
                    <Text>Nombre: {producto['nombre']}</Text>
                    <Text>Cantidad: {producto['cantidad']}</Text>
                    <Text>Valor unitario: {producto['valor unitario']}</Text>
                    <Text>Valor total: {producto['valor total']}</Text>
>>>>>>> e342550eeee75c5d707dad079ebeb60fa3a65cc5
                  </View>
                ))}
              </View>
            ) : (
              <Text>No hay detalles disponibles para este pedido.</Text>
            )}
             <TouchableOpacity style={styles.buttonCerrar} onPress={setDetallesPDF}>
        <Text style={styles.colorTextButtonCerrar}>Descargar PDF</Text>
      </TouchableOpacity>

            <TouchableOpacity style={styles.buttonCerrar} onPress={() => setDetallesPedido(null)}>
              <Text style={styles.colorTextButtonCerrar}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  FlatListestilo: {
    flex: 1,
    backgroundColor: '#004187',
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
  listItemText: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
    color: '#FFFFFF'
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
  buttonEntregaryDetalles: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 70,
    marginTop: 10,
    alignItems: "center"
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
<<<<<<< HEAD
 FlatListestilo :{
  flex: 1,
  backgroundColor: '#004187',
  margin: 5,
  padding: 10,
  borderRadius: 30,
 }
};
=======
};

export default ListPedido;
>>>>>>> e342550eeee75c5d707dad079ebeb60fa3a65cc5
