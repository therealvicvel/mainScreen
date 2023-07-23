//Importaciones necesarias
import React from "react";
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "../../utilidades/styles";

//Creación del formulario para agregar un nuevo producto
export default function AddProductoScreen({ navigation }) {
    const [nombre, setNombre] = React.useState('');
    const [cantidad, setCantidad] = React.useState('');
    const [valCompra, setValCompra] = React.useState('');
    const [valVenta, setValVenta] = React.useState('');
    const [unidadMedida, setUnidadMedida] = React.useState('');
    const [fechaVencimiento, setFechaVencimiento] = React.useState('');

    const handleNombreChange = (text) => {
        setNombre(text);
    };

    const handleCantidadChange = (text) => {
        setCantidad(text);
    };

    const handleValCompraChange = (text) => {
        setValCompra(text);

    };
    const handleValVentaChange = (text) => {
        setValVenta(text);
    };
    const handleUnidadMedidaChange = (text) => {
        setUnidadMedida(text);
    };
    const handleFechaVencimientoChange = (text) => {
        setFechaVencimiento(text);
    };

    //Mostrar los datos ingresados por consola
    const handleAgregarProducto = () => {
        console.log('ID:', idProducto);
        console.log('Nombre:', nombre);
        console.log('Cantidad:', cantidad);
        console.log('Valor compra:', valCompra);
        console.log('Valor venta:', valVenta);
        console.log('Unidad medida:', unidadMedida);
        console.log('Fecha vencimiento:', fechaVencimiento);
    };

    return (
        //Captura de datos, diseño y decoración del formulario
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.miniTitle}>¿Deseas agregar un nuevo producto?</Text>
            </View>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre del producto"
                    onChangeText={handleNombreChange}
                    value={nombre}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Cantidad"
                    onChangeText={handleCantidadChange}
                    value={cantidad}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Valor de compra"
                    onChangeText={handleValCompraChange}
                    value={valCompra}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Valor de venta"
                    onChangeText={handleValVentaChange}
                    value={valVenta}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Unidad de medida"
                    onChangeText={handleUnidadMedidaChange}
                    value={unidadMedida}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Fecha de vencimiento"
                    onChangeText={handleFechaVencimientoChange}
                    value={fechaVencimiento}
                />
            </View>
            <View style={styles.buttonAdd}>
                <Button

                    title="Agregar producto" onPress={handleAgregarProducto} />
            </View>
            <View style={styles.buttonList}>
            </View>
        </ScrollView>
    );
}

