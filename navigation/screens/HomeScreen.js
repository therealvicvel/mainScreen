import React, { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import BuscarCliente from '../../utilidades/BuscarCliente';

const HomeScreen = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  // Función para manejar la selección del cliente
  const handleSelectClient = (client) => {
    setSelectedClient(client);
    // Realiza cualquier acción adicional que necesites con el cliente seleccionado
  };

  return (
    <View>
      <Text>Este es otro documento</Text>
      <BuscarCliente  onSelectClient={handleSelectClient} />
      {selectedClient && (
        <Text>Cliente seleccionado: {selectedClient.nombre}</Text>
      )}
    </View>
  );
};
export default HomeScreen;
