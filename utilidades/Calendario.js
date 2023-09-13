import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

function Calendario({ onDateSelect }) { // Agrega onDateSelect como prop
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date); // Llama a la función onDateSelect y pasa la fecha seleccionada
  };

  const toggleCalendar = () => {
    setCalendarVisible(!calendarVisible);
  };

  const renderCalendar = () => {
    if (Platform.OS === 'ios') {
      // Utiliza el componente DatePicker para iOS
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
    } else {
      // Utiliza el componente Calendar de react-native-calendars para otras plataformas
      return (
        <View>
          <TouchableOpacity onPress={toggleCalendar}>
            <Text>Mostrar Calendario</Text>
          </TouchableOpacity>
          {calendarVisible && (
            <Calendar
              onDayPress={handleDateSelect}
              // Configura otras propiedades del calendario según tus necesidades
            />
          )}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fecha Seleccionada: <Text style={styles.blueText}>{fechaSeleccionada}</Text></Text>
      {renderCalendar()}
    </View>
  );
}

export default Calendario;

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
