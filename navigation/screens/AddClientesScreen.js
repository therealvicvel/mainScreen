import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import styles from "../../utilidades/styles";

const initialState = {
  documento: "",
  nombre: "",
  direccion: "",
  telefono: "",
};

export default function AddClientesScreen({ navigation }) {
  const [formData, setFormData] = useState(initialState);

  const validarCampos = () => {
    const { documento, nombre, direccion, telefono } = formData;

    if (
      documento.trim() === "" || (documento.length < 8 || documento.length > 11)
    ) {
      alert("El documento debe tener entre 8 y 11 números");
      return;
    } else if (nombre.trim() === "" || nombre.length >= 20) {
      alert("El nombre no puede ser nulo o tener más de 20 caracteres");
      return;
    } else if (direccion.trim() === "" || direccion.length >= 50) {
      alert("La dirección no puede ser nula o tener más de 50 caracteres");
      return;
    } else if (telefono.trim() === "" || telefono.length !== 10) {
      alert("El teléfono no puede ser nulo o debe tener 10 caracteres");
      return;
    } else {
      handleAgregarCliente();
    }
  };

  const handleAgregarCliente = () => {
    fetch('https://viramsoftapi.onrender.com/create_costumer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Respuesta de la API:", data);
      if (data && data.nuevoCliente) {
        alert("No se pudo agregar el cliente debido a un error en el servidor. Por favor, intenta nuevamente.");
      } else {
        setFormData(initialState);
        alert("El cliente se ha agregado correctamente.");
      }
    })
    .catch((error) => {
      console.error("Error al agregar el cliente: ", error);
    });
  };

  return (
    <View contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Documento del cliente"
        onChangeText={(text) => setFormData({ ...formData, documento: text })}
        value={formData.documento}
        keyboardType="numeric"
        cursorColor={"#004187"}
        placeholderTextColor={"#004187"}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del cliente"
        onChangeText={(text) => setFormData({ ...formData, nombre: text })}
        value={formData.nombre}
        cursorColor={"#004187"}
        placeholderTextColor={"#004187"}
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección del cliente"
        onChangeText={(text) => setFormData({ ...formData, direccion: text })}
        value={formData.direccion}
        cursorColor={"#004187"}
        placeholderTextColor={"#004187"}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono del cliente"
        onChangeText={(text) => setFormData({ ...formData, telefono: text })}
        value={formData.telefono}
        keyboardType="numeric"
        cursorColor={"#004187"}
        placeholderTextColor={"#004187"}
      />
      <TouchableOpacity style={styles.buttonAddCliente} onPress={validarCampos}>
        <Text style={styles.colorTextButtonAddCliente}>Agregar cliente</Text>
      </TouchableOpacity>
    </View>
  );
}
