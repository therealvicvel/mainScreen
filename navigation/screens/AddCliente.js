import React, { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from "react-native";

const ClientesScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleNombreChange = (text) => {
    setNombre(text);
  };

  const handleTelefonoChange = (text) => {
    setTelefono(text);
  };

  const handleAgregarCliente = () => {
    // Aquí puedes agregar la lógica para guardar el cliente en la base de datos o hacer lo que desees con la información ingresada.
    console.log("Nombre:", nombre);
    console.log("Teléfono:", telefono);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>¿Deseas agregar un nuevo cliente?</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del cliente"
        onChangeText={handleNombreChange}
        value={nombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono del cliente"
        onChangeText={handleTelefonoChange}
        value={telefono}
        keyboardType="phone-pad"
      />
      <Button title="Agregar cliente" onPress={handleAgregarCliente} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default ClientesScreen;
