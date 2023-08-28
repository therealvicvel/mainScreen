import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import CalendarioPedidos from '../../utilidades/prueba';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Contenido de tu pantalla */}
      <Text>Contenido de la pantalla</Text>
      <TouchableOpacity style={styles.fixedButton}>
        <Text style={styles.buttonText}>Botón Fijo</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fixedButton: {
    position: 'absolute',
    bottom: 20,  // Ajusta esta propiedad para cambiar la posición vertical
    right: 20,  // Ajusta esta propiedad para cambiar la posición horizontal
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});