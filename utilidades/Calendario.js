import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Calendar } from 'react-native-calendars';

function Calendario({ selectedDate, setSelectedDate }) {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fecha Seleccionada: {selectedDate}</Text>
      {Platform.OS === 'ios' ? (
        <DatePicker
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
      ) : (
        <Calendar
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
});

export default Calendario;
