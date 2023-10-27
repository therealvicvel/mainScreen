import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Calendar } from 'react-native-calendars';
import moment from 'moment'; // Importa la librería 'moment'

function Calendario({ selectedDate, setSelectedDate }) {

  // Obtiene la fecha de "hoy"
  const today = moment();

  // Calcula la fecha mínima (el día siguiente a 'hoy')
  const minDate = today.add(1, 'days').format('YYYY-MM-DD');

  // Calcula la fecha máxima (un mes desde 'hoy')
  const maxDate = today.add(1, 'months').format('YYYY-MM-DD');

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fecha seleccionada: {selectedDate}</Text>
      {Platform.OS === 'ios' ? (
        <DatePicker
          date={selectedDate}
          mode="date"
          placeholder="Selecciona una fecha"
          format="YYYY-MM-DD"
          confirmBtnText="Confirmar"
          cancelBtnText="Cancelar"
          minDate={minDate} 
          maxDate={maxDate} 
          onDateChange={(date) => {
            setSelectedDate(date);
          }}
        />
      ) : (
        <Calendar
          minDate={minDate} 
          maxDate={maxDate} 
          onDayPress={(date) => setSelectedDate(date.dateString)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  text: {
    color: '#000',
    fontSize: 18,
    marginBottom: 20,
  },
  subtext: {
    color: '#000',
    fontSize: 14,
    marginBottom: 20,
  },
});

export default Calendario;
