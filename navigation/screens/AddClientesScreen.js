//Importaciones necesarias
import React from "react";
import { View, Text, Button, TextInput, StyleSheet, ScrollView} from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "../../utilidades/styles";
import { useState, useEffect} from "react";
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
          documento.trim() === "" || documento.length  > 8 && documento.length < 11
        ) {
          alert("el documento debe tener minimo 8 y maximo 11 numeros");
          return ;          
        }
        else if(  nombre.trim() === "" || nombre.length >= 20){
          alert("el Nombre no puede ser nulo o pasar de los 20 caracteres");
          return ;          
        }
        else if(  direccion.trim() === "" || direccion.length >= 20){
          alert("la direccion no puede ser nulo o pasar de los 20 caracteres");
          return ;          
        }
        else if(  telefono.trim() === "" || telefono.length !== 10){
          alert("el telefono no puede ser nulo o pasar de los 10 caracteres");
          return ;          
        }
        
        else {
          return handleAgregarCliente();
        }
      };

    const handleAgregarCliente = () => {
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
          if (data && data.nuevoCliente) {
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
            <ScrollView style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Documento del cliente"
                    onChangeText={handleDocumentoChange}
                    value={documento}
                    keyboardType="numeric"
                    cursorColor={"#004187"}
                    placeholderTextColor={"#004187"}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nombre del cliente"
                    onChangeText={handleNombreChange}
                    value={nombre}
                    cursorColor={"#004187"}
                    placeholderTextColor={"#004187"}
                    
                />
                <TextInput
                    style={styles.input}
                    placeholder="Direccion del cliente"
                    onChangeText={handleDireciconChange}
                    value={direccion}
                    cursorColor={"#004187"}
                    placeholderTextColor={"#004187"}
                    
                />
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono del cliente"
                    onChangeText={handleTelefonoChange}
                    value={telefono}
                    keyboardType="numeric"
                    cursorColor={"#004187"}
                    placeholderTextColor={"#004187"}
                />
                <TouchableOpacity style={styles.buttonAddCliente} onPress={validarCampos}>
                    <Text style={styles.colorTextButtonAddCliente}>Agregar cliente</Text>
                </TouchableOpacity>
            </ScrollView>
        </ScrollView>
    );
}

