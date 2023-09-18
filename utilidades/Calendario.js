import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

function Calendario({ selectedDate, setSelectedDate }) {
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setCalendarVisible(false); // Cerrar el calendario después de seleccionar la fecha
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
      return (
        <View>
          <TouchableOpacity onPress={toggleCalendar} style= {styles.buttonText}>
            <Text>Calendario</Text>
          </TouchableOpacity>
          {calendarVisible && (
            <Calendar
              onDayPress={handleDateSelect}
            />
          )}
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Fecha Seleccionada: <Text>{selectedDate}</Text></Text>
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
  buttonText: {
    backgroundColor: '#6CAEF6',
    padding: 10,
    borderRadius: 70,
    marginTop: 10,
    
  }
});
