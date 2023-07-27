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
    const [apellido, setApellido] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');

    const [data, setData] = useState([]);
    const handleAgregarCliente = () => {
        const nuevoCliente = {
          documento: documento,
          nombre: nombre,
          apellido: apellido,
          direccion: direccion,
          telefono: telefono,
        };
        fetch('https://viramsoftapi.onrender.com/costumer', {
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

    const handleApellidoChange = (text) => {
        setApellido(text);
    };

    const handleDireciconChange = (text) => {
        setDireccion(text);

    };
    const handleTelefonoChange = (text) => {
        setTelefono(text);
    };

    /*Mostrar los datos ingresados por consola
    const handleAgregarProducto = () => {
        console.log('Documento:', documento);
        console.log('Nombre:', nombre);
        console.log('Apellido:', apellido);
        console.log('Dirección:', direccion);
        console.log('Teléfono:', telefono);
    };*/

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
                    placeholder="Apellido del cliente"
                    onChangeText={handleApellidoChange}
                    value={apellido}
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

