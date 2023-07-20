import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import styles from '../../estilos/styles';
import { ScrollView } from 'react-native-gesture-handler';

const ListClientes = () => {
  const datosClientes = [
    { documento: 1098830323, nombre: 'Víctor', apellido: 'Peraza', direccion: 'Calle 20', telefono: '3128876635', foto: './assets/imagenes/usuarioo.png' },
    { documento: 1098830324, nombre: 'Manuel', apellido: 'Beltrán', direccion: 'Calle 21', telefono: '3128876636', foto: './assets/imagenes/usuarioo.png' },
    { documento: 1098830325, nombre: 'José', apellido: 'Melano', direccion: 'Calle 22', telefono: '3128876637', foto: './assets/imagenes/usuarioo.png' },
    { documento: 1098830326, nombre: 'Pepe', apellido: 'Hernández', direccion: 'Calle 23', telefono: '3128876638', foto: './assets/imagenes/usuarioo.png' },
    { documento: 1098830327, nombre: 'Beto', apellido: 'Pérez', direccion: 'Calle 24', telefono: '3128876639', foto: './assets/imagenes/usuarioo.png' },
    { documento: 1098830328, nombre: 'Magda', apellido: 'García', direccion: 'Calle 25', telefono: '3128876630', foto: './assets/imagenes/usuarioo.png' },
  ];

  const renderClienteItem = ({ item }) => (
    <View style={styles.fondoListas}>
      <Text style={styles.clienteText}>Documento: {item.documento}</Text>
      <Text style={styles.clienteText}>Nombre: {item.nombre}</Text>
      <Text style={styles.clienteText}>Apellido: {item.apellido}</Text>
      <Text style={styles.clienteText}>Dirección: {item.direccion}</Text>
      <Text style={styles.clienteText}>Teléfono: {item.telefono}</Text>
      <Text style={styles.clienteText}> {item.foto}</Text>
    </View>
  );

  const separador = () => {
    return <View style={styles.itemSeparador} />
  }
  
  return (
    <ScrollView>
      <View style={styles.fondito}>
        <Text style={styles.title}>Lista de clientes</Text>
        <FlatList
          data={datosClientes}
          renderItem={renderClienteItem}
          SeparadorDeLineas={separador}
          keyExtractor={(item) => item.documento.toString()}
        />
      </View>
    </ScrollView>
  );
};

export default ListClientes;