import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Modal, ScrollView, TouchableOpacity, ActivityIndicator, Linking, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Picker } from '@react-native-picker/picker';


const ListPedido = () => {
  const [data, setData] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [detallesPedido, setDetallesPedido] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para controlar la carga
  const [pdfDecoded, setPdfDecoded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

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
        setFilteredData(data.pedidos);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filterPedidosByCategory = () => {
    if (!selectedCategory) {
      setFilteredData(data);
    } else {
      const filteredPedidos = data.filter((item) => item.estado === selectedCategory);
      setFilteredData(filteredPedidos);
    }
  };

  useEffect(() => {
    filterPedidosByCategory();
  }, [selectedCategory]);


  const handleOpenModal = (pedido) => {
    setSelectedPedido(pedido);
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

  ///COMPARTIR Y CONVERTIR EL PDF
  const fetchBase64Data = async () => {
    try {
      if (!selectedPedido) {
        console.error('No selected pedido.');
        return null;
      }

      const response = await fetch(
        `https://viramsoftapi.onrender.com/generar_comprobante?pedido_id=${selectedPedido.idPedido}`
      );
      const data = await response.json();
      console.log('API response:', data);

      // Extract the base64Data from the API response
      const base64Data = data[0]; // Assuming the base64Data is the first item in the array
      return base64Data;
    } catch (error) {
      console.error('Error al obtener base64Data desde la API:', error);
      return null;
    }
  };


  const cleanBase64Data = (base64Data) => {
    // Eliminar los caracteres " y [
    let cleanedData = base64Data.replace(/"/g, '').replace(/\[/g, '');

    // Eliminar los caracteres ] al final si existen
    if (cleanedData.endsWith(']')) {
      cleanedData = cleanedData.slice(0, -1);
    }

    return cleanedData;
  };

  const decodeBase64ToPDFAndShare = async () => {
    const base64Data = await fetchBase64Data();

    if (base64Data) {
      const fileName = 'Comprobante_Pedido'; // Assuming a fixed file name for now
      const filePath = `${FileSystem.documentDirectory}${fileName}.pdf`;

      try {
        // Write the PDF buffer to the file
        await FileSystem.writeAsStringAsync(filePath, base64Data, {
          encoding: FileSystem.EncodingType.Base64,
        });
        console.log('Archivo PDF decodificado y guardado correctamente en:', filePath);

        // Compartir el archivo PDF después de decodificar
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(filePath);
        } else {
          alert('La función de compartir no está disponible en tu dispositivo');
        }
      } catch (error) {
        console.error('Error al decodificar o compartir el archivo PDF:', error);
      }
    }
  };

  const descargarPDF = async () => {
    try {
      const base64Data = await fetchBase64Data();

      if (base64Data) {
        const cleanedBase64Data = cleanBase64Data(base64Data);

        const fileName = 'Comprobante_Pedido.pdf';
        const filePath = `${FileSystem.documentDirectory}${fileName}`;

        try {
          // Write the cleaned base64Data (PDF) to the file
          await FileSystem.writeAsStringAsync(filePath, cleanedBase64Data, {
            encoding: FileSystem.EncodingType.Base64,
          });
          console.log('Archivo PDF decodificado y guardado correctamente en:', filePath);

          // Mostrar la ubicación donde se ha guardado el archivo PDF
          if (Platform.OS === 'android') {
            alert('El PDF se ha guardado en: ' + filePath);
          } else {
            alert('El PDF se ha guardado en el directorio de documentos.');
          }
        } catch (error) {
          console.error('Error al decodificar el PDF:', error);
        }
      } else {
        alert('No se ha generado el PDF aún.');
      }
    } catch (error) {
      console.error('Error al descargar el archivo PDF:', error);
    }
  };

  const cambiarEstadoPedido = () => {
    if (selectedPedido) {
      const idPedido = selectedPedido.idPedido;
      const url = `https://viramsoftapi.onrender.com/edit_product_state_delivered/${idPedido}`;

      fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nuevo_estado: "entregado", // Cambia "entregado" al estado que corresponda
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log("Respuesta de la API:", responseData);
          if (responseData.success) {
            alert("Hubo un error al cambiar el estado del pedido.");
          } else {
            alert("El estado del pedido se ha cambiado correctamente.");
            // Actualizar la lista de pedidos después de cambiar el estado
            setData((prevData) => {
              const newData = prevData.map((item) =>
                item.idPedido === selectedPedido.idPedido
                  ? {
                    ...item,
                    estado: responseData.nuevo_estado,
                  }
                  : item
              );
              setSelectedPedido(null); // Limpiar el pedido seleccionado
              return newData;
            });
          }
        })
        .catch((error) => {
          console.log("Error al cambiar el estado del pedido: ", error);
        });
    }
  };


  return (
    <View style={{ backgroundColor: '#FFFFFF', flex: 1, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, }}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.pickerforBuscarProducto}
          >
            <Picker.Item label="Todos" value="" />
            <Picker.Item label="Entregado" value="Entregado" />
            <Picker.Item label="Pendiente" value="Pendiente" />
            <Picker.Item label="Cancelado" value="Cancelado" />
          </Picker>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.idPedido.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.FlatListestilo}>
            <Text style={styles.listItemText}>{item.nombre}</Text>
            <Text style={styles.listItemText}>Fecha de entrega: {item.fechaEntrega}</Text>
            <Text style={styles.listItemText}>{item.estado}</Text>
            <Text style={styles.listItemText}>Total: ${item.valorTotal}</Text>
            <TouchableOpacity
              style={styles.buttonEntregaryDetalles}
              onPress={cambiarEstadoPedido}
            >
              <Text style={{ color: '#004187' }}>Entregar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonEntregaryDetalles} onPress={() => handleOpenModal(item)}>
              <Text style={{ color: '#004187' }}>Detalles</Text>
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
            <TouchableOpacity style={styles.buttonCerrar} onPress={descargarPDF}>
              <Text style={styles.colorTextButtonCerrar}>Descargar PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCerrar} onPress={decodeBase64ToPDFAndShare}>
              <Text style={styles.colorTextButtonCerrar}>Compartir PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCerrar} onPress={() => setDetallesPedido(null)} onRequestClose={setDetallesPedido}>
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
  pickerforBuscarProducto: {
    color: "#004187",
    borderRadius: 20,
    padding: 8,
    borderColor: '#004187',
    width: 150,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-end',
    marginStart: 80,
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