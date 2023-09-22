import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import Calendario from '../../utilidades/Calendario';
import ImagePicker from "react-native-image-picker";
function MiCalendario() {
  return (

    <View style={styles.container}>

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
