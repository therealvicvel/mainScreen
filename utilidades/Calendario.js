import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CalendarioPedidos = ({ onDateChange }) => {
  const [numeroSeleccionado, setNumeroSeleccionado] = useState(new Date().getDate());
  const [mesSeleccionado, setMesSeleccionado] = useState(1);
  const [anoSeleccionado, setAnoSeleccionado] = useState(new Date().getFullYear());

  useEffect(() => {
    const mesActual = new Date().getMonth();
    setMesSeleccionado(mesActual + 1);
    if (mesActual === 1 && numeroSeleccionado > 28) {
      setNumeroSeleccionado(28);
    }
  }, []);

  useEffect(() => {
    const fechaFormatoISO = `${anoSeleccionado}-${mesSeleccionado.toString().padStart(2, '0')}-${numeroSeleccionado.toString().padStart(2, '0')}`;
    onDateChange(fechaFormatoISO);
  }, [numeroSeleccionado, mesSeleccionado, anoSeleccionado]);

  const handleMesChange = (mes) => {
    setMesSeleccionado(mes);
    if (mes === 2 && numeroSeleccionado > 28) {
      setNumeroSeleccionado(28);
    }
  };

  const handleAnoChange = (ano) => {
    setAnoSeleccionado(ano);
  };

  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fecha de Entrega:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={numeroSeleccionado}
          onValueChange={setNumeroSeleccionado}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {Array.from({ length: 31 }, (_, index) => (
            <Picker.Item label={`${index + 1}`} value={index + 1} key={index} />
          ))}
        </Picker>
        <Picker
          selectedValue={mesSeleccionado}
          onValueChange={handleMesChange}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          {[
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
          ].map((mes, index) => (
            <Picker.Item label={mes} value={index + 1} key={mes} />
          ))}
        </Picker>
        <Picker
          selectedValue={anoSeleccionado}
          onValueChange={handleAnoChange}
          style={styles.picker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label={`${currentYear}`} value={currentYear} />
          <Picker.Item label={`${currentYear + 1}`} value={currentYear + 1} />
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1, // Agregar un borde inferior
    borderBottomColor: '#ccc', // Color del borde inferior
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10, // Espacio entre el texto y los Pickers
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    flex: 1, // Para ocupar todo el espacio disponible
    height: 40, // Altura de los Pickers
    fontSize: 14, // Tamaño de fuente de los Pickers
  },
  pickerItem: {
    fontSize: 14, // Tamaño de fuente de los elementos del Picker
  },
});

export default CalendarioPedidos;
