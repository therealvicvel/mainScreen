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
          if (data && data.nuevoCliente) {
            alert("Ocurrió un error al agregar el cliente. Por favor, intenta nuevamente.");
          } else {
            setDocumento("");
            setNombre("");
            setDireccion("");
            setTelefono("");
            alert("El cliente se ha agregado correctamente.");
            loadDataFromServer();
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

    //MARRANADA PARA QUE CARGUEN TODOS LOS DATOS DE LA API
    const loadDataFromServer = () => {
      fetch("https://viramsoftapi.onrender.com/costumer")
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos de la API:", data);
        setData(data.clientes);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
    }
    useEffect(() => {
      // Cargar los datos desde el servidor al montar el componente
      loadDataFromServer();
    }, []);


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
                <TouchableOpacity style={styles.buttonAddCliente} onPress={handleAgregarCliente}>
                    <Text style={styles.colorTextButtonAddCliente}>Agregar cliente</Text>
                </TouchableOpacity>
            </ScrollView>
        </ScrollView>
    );
}

