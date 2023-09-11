import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';

function MyDatePicker() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View>
      <Text>Fecha seleccionada: {selectedDate}</Text>
      <DatePicker
        style={{ width: 200 }}
        date={selectedDate}
        mode="date"
        placeholder="Selecciona una fecha"
        format="YYYY-MM-DD"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        onDateChange={(date) => {
          setSelectedDate(date);
        }}
      />
    </View>
  );
}

export default MyDatePicker;
