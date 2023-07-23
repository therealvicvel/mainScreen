//Importaciones necesarias
import React from "react";
import { View, Text, Button, TextInput, StyleSheet, ScrollView, Modal } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "../../utilidades/styles";

//Creación del formulario para agregar un nuevo cliente
export default function ClientesScreen({ navigation }) {
    const [documento, setDocumento] = React.useState('');
    const [nombre, setNombre] = React.useState('');
    const [apellido, setApellido] = React.useState('');
    const [direccion, setDireccion] = React.useState('');
    const [telefono, setTelefono] = React.useState('');

    const handleDocumentoChange = (text) => {
        setDocumento(text);
    };

    const handleNombreChange = (text) => {
        setNombre(text);
    };

    const handleApellidoChange = (text) => {
        setApellido(text);
    };

    const handleDireccionChange = (text) => {
        setDireccion(text);

    };
    const handleTelefonoChange = (text) => {
        setTelefono(text);
    };

    //Mostrar los datos ingresados por consola
    const handleAgregarCliente = () => {
        console.log('Documento:', documento);
        console.log('Nombre:', nombre);
        console.log('Apellido:', apellido);
        console.log('Direccion:', direccion);
        console.log('Teléfono:', telefono);
    };

    return (
        //Captura de datos, diseño y decoración del formulario
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.miniTitle}>¿Deseas agregar un nuevo cliente?</Text>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Documento del cliente"
                    onChangeText={handleDocumentoChange}
                    value={documento}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nombre del cliente"
                    onChangeText={handleNombreChange}
                    value={nombre}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Apellido del cliente"
                    onChangeText={handleApellidoChange}
                    value={apellido}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Dirección del cliente"
                    onChangeText={handleDireccionChange}
                    value={direccion}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Teléfono del cliente"
                    onChangeText={handleTelefonoChange}
                    value={telefono}
                    keyboardType="phone-pad"
                />
            </View>
            <View style={styles.buttonAdd}>
                <Button

                    title="Agregar cliente" onPress={handleAgregarCliente} />
            </View>
            <View style={styles.buttonList}>
            </View>
        </ScrollView>
    );
}

