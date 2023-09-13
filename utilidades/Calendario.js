import React, { useState } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

function Calendario() {
  const [selectedDate, setSelectedDate] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handleDateSelect = (date) => {
    setFechaSeleccionada(date.dateString);
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
          <TouchableOpacity onPress={toggleCalendar}>
            <Text>Mostrar Calendario</Text>
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
      <Text style={styles.text}>Fecha Seleccionada: <Text>{fechaSeleccionada}</Text></Text>
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
});
