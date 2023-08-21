import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import CalendarioPedidos from '../../utilidades/prueba';

const HomeScreen = () => {
  const handleDateChange = (date) => {
    // Aquí puedes manejar la lógica cuando la fecha cambie
    console.log('Nueva fecha seleccionada:', date);
  };

  return (
    <View>
      <Text>¡Mi Aplicación React Native!</Text>
      <CalendarioPedidos onDateChange={handleDateChange} />
    </View>
  );
};
export default HomeScreen;
