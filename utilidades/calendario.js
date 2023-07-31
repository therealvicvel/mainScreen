import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Platform, DatePickerAndroid } from 'react-native';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import styles from './styles';

const DateInput = ({ onSelectDate }) => {
  const [date, setDate] = useState('');
  const [isValidDate, setIsValidDate] = useState(true);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  // Función para validar el formato de fecha yyyy-MM-dd
  const isValidDateFormat = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

     // Función para manejar el cambio en el DatePicker o TextInput
  const handleDateChange = (selectedDate) => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      setDate(formattedDate);
      setIsValidDate(true);
      onSelectDate(formattedDate); // Llama a la función desde la prop 'onSelectDate' para actualizar el estado de la fecha en el componente padre (NuevoPedido)
    }
  };
  // Función para abrir el DatePicker en Android
  const openDatePickerAndroid = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
        mode: 'calendar',
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setDate(formattedDate);
        setIsValidDate(true);
      }
    } catch (error) {
      console.warn('Error al abrir el DatePicker: ', error.message);
    }
  };

  // Funciones para mostrar/ocultar el DatePicker en dispositivos móviles
  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);
  const handleConfirm = (selectedDate) => {
    hideDatePicker();
    handleDateChange(selectedDate);
  };

  return (
    <View>
      {Platform.OS === 'web' ? (
        <DatePicker
        style={styles.inputFecha}
          selected={date ? new Date(date) : null}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="yyyy-MM-dd"
        />
      ) : (
        <View>
          <TextInput
            style={[styles.inputFecha, !isValidDate && styles.invalidInputFecha]}
            placeholder="yyyy-MM-dd"
            value={date}
            onChangeText={handleDateChange}
            onFocus={() => {
              if (Platform.OS === 'android') {
                openDatePickerAndroid();
              } else {
                showDatePicker();
              }
            }}
          />
          <DateTimePickerModal
          style={styles.inputFecha}
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      )}
    </View>
  );
};

export default DateInput;
