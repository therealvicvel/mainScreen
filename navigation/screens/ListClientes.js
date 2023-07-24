//Importaciones necesarias
import React from 'react';
import { View, Text, StyleSheet, FlatList, Modal } from 'react-native';
import styles from '../../utilidades/styles';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, TouchableOpacity } from 'react-native-web';
import { useState } from 'react';

//Creación de lista visual de clientes (declaración de variables y sus datos)
const ListClientes = () => {
  const datosClientes = [
    { documento: 1098830323, nombre: 'Víctor', apellido: 'Peraza', direccion: 'Calle 20', telefono: '3128876635', foto: './assets/imagenes/usuarioo.png' },
    { documento: 1098830324, nombre: 'Manuel', apellido: 'Beltrán', direccion: 'Calle 21', telefono: '3128876636', foto: './assets/imagenes/usuarioo.png' },
    { documento: 1098830325, nombre: 'José', apellido: 'Melano', direccion: 'Calle 22', telefono: '3128876637', foto: './assets/imagenes/usuarioo.png' },
    { documento: 1098830326, nombre: 'Pepe', apellido: 'Hernández', direccion: 'Calle 23', telefono: '3128876638', foto: './assets/imagenes/usuarioo.png' },
    { documento: 1098830327, nombre: 'Beto', apellido: 'Pérez', direccion: 'Calle 24', telefono: '3128876639', foto: './assets/imagenes/usuarioo.png' },
    { documento: 1098830328, nombre: 'Magda', apellido: 'García', direccion: 'Calle 25', telefono: '3128876630', foto: './assets/imagenes/usuarioo.png' },
  ];

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
        <Text style={styles.clienteText}>Apellido: {item.apellido}</Text>
        <Text style={styles.clienteText}>Dirección: {item.direccion}</Text>
        <Text style={styles.clienteText}>Teléfono: {item.telefono}</Text>
        <Text style={styles.clienteText}> {item.foto}</Text>
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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Lista de clientes</Text>
        <FlatList
          data={datosClientes}
          renderItem={renderClienteItem}
          SeparadorDeLineas={separador}
          keyExtractor={(item) => item.documento.toString()}
        />
      </View>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedCliente && (
            <>
              <Text style={styles.clienteText}>Documento: {selectedCliente.documento}</Text>
              <Text style={styles.clienteText}>Nombre: {selectedCliente.nombre}</Text>
              <Text style={styles.clienteText}>Apellido: {selectedCliente.apellido}</Text>
              <Text style={styles.clienteText}>Dirección: {selectedCliente.direccion}</Text>
              <Text style={styles.clienteText}>Teléfono: {selectedCliente.telefono}</Text>
              <Text>Agregar Cambios</Text>
              <TextInput style={{borderColor: '#A3C669',borderWidth: 1,padding: 10,borderRadius: 10}}
              placeholder= "Nombre"></TextInput>
              <TextInput style={{borderColor: '#A3C669',borderWidth: 1,padding: 10,borderRadius: 10}}
              placeholder= "Apellido"></TextInput>
              <TextInput style={{borderColor: '#A3C669',borderWidth: 1,padding: 10,borderRadius: 10}}
              placeholder= "Direccion"></TextInput>
              <TextInput style={{borderColor: '#A3C669',borderWidth: 1,padding: 10,borderRadius: 10}}
              placeholder= "Telefono"></TextInput>
            </>
          )}
          <TouchableOpacity style={styles.button} onPress={handleCloseModal}>
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: '#A3C669', padding: 10,borderRadius: 10,marginTop: 10,}} 
            onPress={() => alert("los cambios se han guardado")}>
              <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ListClientes;