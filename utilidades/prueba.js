import React, { useState, useEffect } from 'react';
import { View, Text, Picker } from 'react-native';

const NumeroPicker = ({ onFechaSeleccionada }) => {
  const [numeroSeleccionado, setNumeroSeleccionado] = useState(new Date().getDate());
  const [mesSeleccionado, setMesSeleccionado] = useState('enero');
  const [anoSeleccionado, setAnoSeleccionado] = useState(new Date().getFullYear());

  useEffect(() => {
    const mesActual = new Date().getMonth();
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    setMesSeleccionado(meses[mesActual]);
  }, []);

  const convertirMesANumero = (nombreMes) => {
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return meses.indexOf(nombreMes) + 1;
  };

  const handleMesChange = (mes) => {
    setMesSeleccionado(mes);
    if (mes === 'febrero' && numeroSeleccionado > 28) {
      setNumeroSeleccionado(28);
    }
  };

  const diaFormato = numeroSeleccionado < 10 ? `0${numeroSeleccionado}` : `${numeroSeleccionado}`;
  const mesNumero = convertirMesANumero(mesSeleccionado);
  const mesFormato = mesNumero < 10 ? `0${mesNumero}` : `${mesNumero}`;
  const fechaEntrega = `${anoSeleccionado}-${mesFormato}-${diaFormato}`;

  const handleAnoChange = (ano) => {
    setAnoSeleccionado(ano);
  };

  useEffect(() => {
    const mesNumero = convertirMesANumero(mesSeleccionado);
    const mesFormato = mesNumero < 10 ? `0${mesNumero}` : `${mesNumero}`;
    const diaFormato = numeroSeleccionado < 10 ? `0${numeroSeleccionado}` : `${numeroSeleccionado}`;
    const fechaEntrega = `${anoSeleccionado}-${mesFormato}-${diaFormato}`;
    onFechaSeleccionada(fechaEntrega); // Llama a la función prop onFechaSeleccionada con la fecha calculada
  }, [numeroSeleccionado, mesSeleccionado, anoSeleccionado, onFechaSeleccionada]);

  const currentYear = new Date().getFullYear();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20, flex: 0.05}}>
      <Text style={{ fontSize: 16, color: 'white' }}>Fecha Entrega: </Text>
      <Picker
        selectedValue={numeroSeleccionado}
        onValueChange={setNumeroSeleccionado}
        itemStyle={{ fontSize:9 }}  >
        {Array.from({ length: 31 }, (_, index) => (
          <Picker.Item label={`${index + 1}`} value={index + 1} key={index} />
        ))}
      </Picker>

      <Picker
        selectedValue={mesSeleccionado}
        onValueChange={handleMesChange}
        style={{ width: 100 }}
        itemStyle={{ fontSize:9 }}
      >
        {[
          'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
          'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ].map((mes) => (
          <Picker.Item label={mes} value={mes} key={mes} />
        ))}
      </Picker>
      <Picker
        selectedValue={anoSeleccionado}
        onValueChange={handleAnoChange}
        style={{ width: 80 }}
        itemStyle={{ fontSize:9 }}  
      >
        <Picker.Item label={`${currentYear}`} value={currentYear} />
        <Picker.Item label={`${currentYear + 1}`} value={currentYear + 1} />
      </Picker>
    </View>
  );
};

export default NumeroPicker;
