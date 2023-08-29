import React, { useState, useEffect } from 'react';
import { View, Text,  } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CalendarioPedidos = ({ onDateChange }) => {
  const [numeroSeleccionado, setNumeroSeleccionado] = useState(new Date().getDate());
  const [mesSeleccionado, setMesSeleccionado] = useState(1); // Cambiado a número en vez de cadena
  const [anoSeleccionado, setAnoSeleccionado] = useState(new Date().getFullYear());

  useEffect(() => {
    const mesActual = new Date().getMonth();
    setMesSeleccionado(mesActual + 1); // Se ajusta para que el índice 0 corresponda a enero (1)
  }, []);

  useEffect(() => {
    const fechaFormatoISO = `${anoSeleccionado}-${mesSeleccionado.toString().padStart(2, '0')}-${numeroSeleccionado.toString().padStart(2, '0')}`;
    onDateChange(fechaFormatoISO);
  }, [numeroSeleccionado, mesSeleccionado, anoSeleccionado]);

  const handleMesChange = (mes) => {
    setMesSeleccionado(mes);
    if (mes === 2 && numeroSeleccionado > 28) { // Se ajusta para el mes de febrero
      setNumeroSeleccionado(28);
    }
  };
  

  const handleAnoChange = (ano) => {
    setAnoSeleccionado(ano);
  };

  const currentYear = new Date().getFullYear();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, flex: 0.05 }}>
      <Text style={{ fontSize: 16, color: 'black' }}>Fecha Entrega: </Text>
      <Picker
        selectedValue={numeroSeleccionado}
        onValueChange={setNumeroSeleccionado}
        itemStyle={{ fontSize: 9 }}
      >
        {Array.from({ length: 31 }, (_, index) => (
          <Picker.Item label={`${index + 1}`} value={index + 1} key={index} />
        ))}
      </Picker>

      <Picker
        selectedValue={mesSeleccionado}
        onValueChange={handleMesChange}
        style={{ width: 100 }}
        itemStyle={{ fontSize: 9 }}
      >
        {[
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ].map((mes, index) => (
          <Picker.Item label={mes} value={index + 1} key={mes} /> // Se ajusta el valor a números del 1 al 12
        ))}
      </Picker>
      <Picker
        selectedValue={anoSeleccionado}
        onValueChange={handleAnoChange}
        style={{ width: 80 }}
        itemStyle={{ fontSize: 9 }}
      >
        <Picker.Item label={`${currentYear}`} value={currentYear} />
        <Picker.Item label={`${currentYear + 1}`} value={currentYear + 1} />
      </Picker>
    </View>
  );
};

export default CalendarioPedidos;