//Importaciones necesarias
import React from 'react';
import { View, Text, StyleSheet, FlatList, Modal } from 'react-native';
import styles from '../../utilidades/styles';
import { ScrollView } from 'react-native'; 
import { TextInput, TouchableOpacity } from 'react-native'; 
import { useState, useEffect } from 'react';


const ListClientes = () => {
  //Funcion que llama los datos de la base de datos 
  console.log("Data de clientes:", data);
  const [data, setData] = useState([]);

  useEffect(() => {
  fetch('https://viramsoftapi.onrender.com/costumer')
    .then((response) => response.json())
    .then((data) => {
      console.log("Datos recibidos de la API:", data);
      setData(data.clientes);
    })
    .catch((error) => {
      console.error("Error fetching data", error);
    });
}, []);


  //Variables para el manejo del Modal
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Función para abrir el modal y establecer el cliente seleccionado
  const handleOpenModal = (cliente) => {
    setSelectedCliente(cliente);
    setIsModalVisible(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  //Creación de campos para mostrar en ellos los datos anteriormente creados
  const renderClienteItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOpenModal(item)}>
      <View style={styles.fondoListas}>
        <Text style={styles.clienteText}>Documento: {item.documento}</Text>
        <Text style={styles.clienteText}>Nombre: {item.nombre}</Text>
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
      <View>
        <Text style={styles.title}>Lista de inventario</Text>
        <FlatList
          data={data}
          SeparadorDeLineas={separador}
          renderItem={renderClienteItem}
          keyExtractor={(item) => item.idProducto.toString()}
        />
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          {selectedCliente && (
            <>
              <Text style={styles.modalTitle}>Actualizar datos del cliente</Text>
              <Text style={styles.clienteText}>Documento: {selectedCliente.documento}</Text>
              <Text style={styles.clienteText}>Nombre: {selectedCliente.nombre}</Text>
              <Text style={styles.clienteText}>Dirección: {selectedCliente.direccion}</Text>
              <Text style={styles.clienteText}>Teléfono: {selectedCliente.telefono}</Text>
              <Text style={styles.modalSubTitle}>Agregar cambios</Text>
              <TextInput style={styles.inputForModal} placeholder= "Nombre"></TextInput>
              <TextInput style={styles.inputForModal} placeholder= "Direccion"></TextInput>
              <TextInput style={styles.inputForModal} placeholder= "Telefono"></TextInput>
            </>
          )}
          <TouchableOpacity style={styles.buttonCerrar} onPress={handleCloseModal}>
            <Text style={styles.colorTextButtonCerrar}>Cerrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGuardar} 
            onPress={() => alert("Los cambios se han guardado")}>
              <Text style={styles.colorTextButtonGuardar}>Guardar</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ListClientes;