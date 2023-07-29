//Importaciones necesarias
import React from "react";
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "../../utilidades/styles";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

//Creación del formulario para agregar un nuevo cliente
export default function AddClientesScreen({ navigation }) {
    const [documento, setDocumento] = useState('');
    const [nombre, setNombre] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');

    const [data, setData] = useState([]);
    const validarCampos = () => {
        if (
          documento.trim() === "" ||
          nombre.trim() === "" ||
          direccion.trim() === "" ||
          telefono.trim() === ""
        ) {
          return false;
        }
        return true;
      };

    const handleAgregarCliente = () => {
        if (!validarCampos()) {
            alert("Por favor, completa todos los campos antes de agregar el cliente.");
            return;
        }
        const nuevoCliente = {
          documento: documento,
          nombre: nombre,
          direccion: direccion,
          telefono: telefono,
        };
        fetch('https://viramsoftapi.onrender.com/create_costumer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoCliente),
        })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta de la API:", data);
          setData([data.nuevoCliente]);
          if (data && data.nuevoProducto) {
            alert("Ocurrió un error al agregar el cliente. Por favor, intenta nuevamente.");
          } else {
            setDocumento("");
            setNombre("");
            setDireccion("");
            setTelefono("");
            alert("El cliente se ha agregado correctamente.");
          }
        })
        .catch((error) => {
          console.error("Error al agregar el cliente: ", error);
        });
      };

    const handleDocumentoChange = (text) => {
        setDocumento(text);
    };

    const handleNombreChange = (text) => {
        setNombre(text);
    };

    const handleDireciconChange = (text) => {
        setDireccion(text);

    };
    const handleTelefonoChange = (text) => {
        setTelefono(text);
    };

    return (
        //Captura de datos, diseño y decoración del formulario
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Documento del cliente"
                    onChangeText={handleDocumentoChange}
                    value={documento}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nombre del cliente"
                    onChangeText={handleNombreChange}
                    value={nombre}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Direccion del cliente"
                    onChangeText={handleDireciconChange}
                    value={direccion}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono del cliente"
                    onChangeText={handleTelefonoChange}
                    value={telefono}
                    keyboardType="phone-pad"
                />
                <TouchableOpacity style={styles.buttonAddCliente} onPress={handleAgregarCliente}>
                    <Text style={styles.colorTextButtonAddCliente}>Agregar cliente</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

