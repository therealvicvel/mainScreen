import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Modal, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../../utilidades/styles';
import { TextInput } from 'react-native';
import BuscarCliente from '../../utilidades/BuscarCliente';

const ListClientes = () => {
  const [data, setData] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleOpenModal = (cliente) => {
    setSelectedCliente(cliente);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const renderClienteItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOpenModal(item)}>
      <View style={styles.fondoListas}>
        <Text style={styles.clienteText}>{item.documento}</Text>
        <Text style={styles.clienteText}>{item.nombre}</Text>
        <Text style={styles.clienteText}>{item.direccion}</Text>
        <Text style={styles.clienteText}>{item.telefono}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <BuscarCliente
          Data={data}
          onSelectClient={handleOpenModal} // Actualiza el cliente seleccionado al hacer clic en un cliente en BuscarCliente
        />
        <FlatList
          data={data}
          renderItem={renderClienteItem}
          keyExtractor={(item) => item.documento.toString()}
        />
      </View>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          {selectedCliente && (
            <>
              <Text style={styles.modalTitle}>Actualizar datos del cliente</Text>
              
              
              <Text style={styles.modalSubTitle}>Agregar cambios</Text>
              <Text style={styles.textAyuda}>Nombre</Text>
              <TextInput style={styles.inputForModal} placeholder= "Nombre"></TextInput>
              <Text style={styles.textAyuda}>Dirección</Text>
              <TextInput style={styles.inputForModal} placeholder= "Direccion"></TextInput>
              <Text style={styles.textAyuda}>Teléfono</Text>
              <TextInput style={styles.inputForModal} placeholder= "Teléfono"></TextInput>
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