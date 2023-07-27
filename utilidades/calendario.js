import React, { useState } from 'react';
import { View, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const calendario = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
  
    // Función para mostrar/ocultar el calendario desplegable
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    // Función para mostrar/ocultar el selector de hora
    const showTimePicker = () => {
      setTimePickerVisibility(true);
    };
  
    const hideTimePicker = () => {
      setTimePickerVisibility(false);
    };
  
    // Funciones para manejar la selección de fecha y hora
    const handleDateConfirm = (date) => {
      setSelectedDate(date);
      hideDatePicker();
    };
  
    const handleTimeConfirm = (time) => {
      setSelectedDate(time);
      hideTimePicker();
    };
  
    return (
      <View>
        {/* Botón para abrir el calendario desplegable */}
        <Button title="Seleccionar Fecha" onPress={showDatePicker} />
  
        {/* Botón para abrir el selector de hora */}
        <Button title="Seleccionar Hora" onPress={showTimePicker} />
  
        {/* Calendario desplegable */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleDateConfirm}
          onCancel={hideDatePicker}
        />
  
        {/* Selector de hora */}
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleTimeConfirm}
          onCancel={hideTimePicker}
        />
        
        {/* Puedes mostrar la fecha y hora seleccionadas */}
        <Text>Fecha y Hora Seleccionadas: {selectedDate.toString()}</Text>
      </View>
    );
  };
  
  export default calendario;