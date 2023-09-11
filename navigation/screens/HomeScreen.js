import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import MyDatePicker from '../../utilidades/prueba';

function MiCalendario() {
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
      // Utiliza el componente DatePicker para iOS y Android
      return (
        <MyDatePicker />
      );
    } else {
      // Utiliza el componente MyDatePicker para otras plataformas
      return (
        <View>
          <TouchableOpacity onPress={toggleCalendar}>
            <Text>Mostrar Calendario</Text>
          </TouchableOpacity>
          {calendarVisible && (
            <Calendar
              onDayPress={handleDateSelect}
              // Configura otras propiedades del calendario
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
