import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import Calendario from '../../utilidades/Calendario';
import FiltrarBuscar from '../../utilidades/filtrarBuscarProd';
function MiCalendario() {
  return (

    <View style={styles.container}>
      <Calendario/>
      <View>
      <FiltrarBuscar
      /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  blueText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default MiCalendario;
