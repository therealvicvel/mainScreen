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
    fetch('https://viramsoftapi.onrender.com/costumer')
      .then((response) => response.json())
      .then((data) => {
        setData(data.clientes); 
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
  const handleOpenModal = (cliente) => {
    setSelectedPedido(cliente);
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
        <Text style={styles.clienteText}>Documento: {item.documento}</Text>
        <Text style={styles.clienteText}>Nombre: {item.nombre}</Text>
        <Text style={styles.clienteText}>Apellido: {item.apellido}</Text>
        <Text style={styles.clienteText}>Direccion: {item.direccion}</Text>
        <Text style={styles.clienteText}>Telefono: {item.telefono}</Text>
      </View>
    </TouchableOpacity>
  );

  //Separador visual para cada elemento de la lista
  const separador = () => {
    return <View style={styles.itemSeparador} />
  }

  return (
    //Utilización del FlatList para mostrar los datos, decoración y diseño de la lista y pantalla
    <ScrollView contentContainerStyle={styles.container}>
      <View   >
        <FlatList
        data={data}
        SeparadorDeLineas={separador}
        renderItem={renderPedidoItem}
        keyExtractor={(item) => item.documento.toString()} 
      />
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          {selectedPedido && (
            <>
              <Text style={styles.modalTitle}>Actualizar datos del cliente</Text>
              <Text style={styles.clienteText}>Documento: {selectedPedido.documento}</Text>
              <Text style={styles.clienteText}>Nombre: {selectedPedido.nombre}</Text>
              <Text style={styles.clienteText}>Apellido: {selectedPedido.apellido}</Text>
              <Text style={styles.clienteText}>Dirección: {selectedPedido.direccion}</Text>
              <Text style={styles.clienteText}>Teléfono: {selectedPedido.telefono}</Text>
              <Text style={styles.modalSubTitle}>Agregar cambios</Text>
            </>
          )}
            <TouchableOpacity style={styles.buttonGuardar} 
            onPress={() => alert("se ha cambiado el estado del Pedido")}>
              <Text style={styles.colorTextButtonGuardar}>Cambiar a entregado</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCerrar} onPress={handleCloseModal}>
            <Text style={styles.colorTextButtonCerrar}>Cerrar</Text>
          </TouchableOpacity>
          
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ListPedido;