//Importaciones necesarias
import React from 'react';
import { View, Text, FlatList, Modal } from 'react-native';
import styles from '../../utilidades/styles';
import { ScrollView } from 'react-native'; 
import { TextInput, TouchableOpacity } from 'react-native'; 
import { useState,useEffect} from 'react';

//Creación de lista visual de clientes (declaración de variables y sus datos)
const ListPedido = () => {
  //prueba
  const [data, setData] = useState([]);

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
  //Variables para el manejo del Modal
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
//  //validar estado pedido

  // Función para abrir el modal y establecer el cliente seleccionado
  const handleOpenModal = (pedido) => {
    setSelectedPedido(pedido);
    setIsModalVisible(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  //Creación de campos para mostrar en ellos los datos anteriormente creados
  const renderPedidoItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOpenModal(item)}>
      <View style={styles.fondoListas}>
        <Text style={styles.clienteText}>Documento: {item.documentoCliente}</Text>
        <Text style={styles.clienteText}>Estado: {item.estado}</Text>
        <Text style={styles.clienteText}>Observación: {item.observacion}</Text>
        <Text style={styles.clienteText}>Fecha de Pedido: {item.fechaPedido}</Text>
        <Text style={styles.clienteText}>Fecha de entrega: {item.fechaEntrega}</Text>
        <Text style={styles.clienteText}>Valor total: {item.valorTotal}</Text>
      </View>
    </TouchableOpacity>
  );

  //Separador visual para cada elemento de la lista
  const separador = () => {
    return <View style={styles.itemSeparador} />
  }

  return (
    //Utilización del FlatList para mostrar los datos, decoración y diseño de la lista y pantalla
    <View contentContainerStyle={styles.container}>
      <View   >
        <FlatList
        data={data}
        SeparadorDeLineas={separador}
        renderItem={renderPedidoItem}
        keyExtractor={(item) => item.idPedido} 
      />
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          {selectedPedido && (
            <>
              <Text style={styles.modalTitle}>Actualizar datos del cliente</Text>
              <Text style={styles.clienteText}>Documento: {selectedPedido.documentoCliente}</Text>
              <Text style={styles.clienteText}>observación: {selectedPedido.observacion}</Text>
              <Text style={styles.clienteText}>Fecha de entrega: {selectedPedido.fechaEntrega}</Text>
              <Text style={styles.clienteText}>Estado: {selectedPedido.estado}</Text>
              <Text style={styles.clienteText}>Fecha pedido: {selectedPedido.fechaPedido}</Text>
              <Text style={styles.clienteText}>Valor total: {selectedPedido.valorTotal}</Text>
              <Text style={styles.modalSubTitle}>Cambiar estado</Text>
            </>
          )}
            <TouchableOpacity style={styles.buttonGuardar} 
            onPress={() => alert("Se ha cambiado el estado del pedido")}>
              <Text style={styles.colorTextButtonGuardar}>Cambiar a entregado</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCerrar} onPress={handleCloseModal}>
            <Text style={styles.colorTextButtonCerrar}>Cerrar</Text>
          </TouchableOpacity>
          
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ListPedido;