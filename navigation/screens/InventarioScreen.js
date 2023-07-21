import React from "react";
import { View, Text, FlatList, Image, Button } from "react-native";
import styles from "../../utilidades/styles";
import { ScrollView } from 'react-native-gesture-handler';

const ListClientes = () => {
    const datosProductos = [
        { idProducto: 1, nombre: 'Varsol', cantidad: '5', valCompra: '2200', valVenta: '6500', unidadMedida: '500L', fechaVencimiento: "2024-08-05" },
        { idProducto: 2, nombre: 'Escoba', cantidad: '15', valCompra: '4200', valVenta: '8500', unidadMedida: '450ML', fechaVencimiento: "2024-08-05" },
        { idProducto: 3, nombre: 'Trapero', cantidad: '14', valCompra: '4200', valVenta: '6500', unidadMedida: '500L', fechaVencimiento: "2024-08-05" },
        { idProducto: 4, nombre: 'Cloro', cantidad: '13', valCompra: '2200', valVenta: '8700', unidadMedida: '450ML', fechaVencimiento: "2024-08-05" },
        { idProducto: 5, nombre: 'Limpido', cantidad: '1', valCompra: '4200', valVenta: '6500', unidadMedida: '500L', fechaVencimiento: "2024-08-05" },
        { idProducto: 6, nombre: 'Desinfectante', cantidad: '5', valCompra: '4200', valVenta: '8700', unidadMedida: '500ML', fechaVencimiento: "2024-08-05" },
        { idProducto: 7, nombre: 'Jabón', cantidad: '7', valCompra: '2200', valVenta: '6500', unidadMedida: '450ML', fechaVencimiento: "2024-08-05" },
        { idProducto: 8, nombre: 'Jabón líquido', cantidad: '44', valCompra: '4200', valVenta: '6500', unidadMedida: '500ML', fechaVencimiento: "2024-08-05" },
        { idProducto: 9, nombre: 'Bolsa', cantidad: '45', valCompra: '2200', valVenta: '6500', unidadMedida: '450L', fechaVencimiento: "2024-08-05" },
        { idProducto: 10, nombre: 'Jabón en polvo', cantidad: '89', valCompra: '4200', valVenta: '8500', unidadMedida: '500L', fechaVencimiento: "2024-08-05" },
        { idProducto: 11, nombre: 'Jabón Rey', cantidad: '90', valCompra: '2200', valVenta: '8700', unidadMedida: '450L', fechaVencimiento: "2024-08-05" },
    ];

    const renderProductoItem = ({ item }) => (
        <View style={styles.fondoListas}>
            <Text style={styles.clienteText}>ID: {item.idProducto}</Text>
            <Text style={styles.clienteText}>Nombre: {item.nombre}</Text>
            <Text style={styles.clienteText}>Cantidad: {item.cantidad}</Text>
            <Text style={styles.clienteText}>Valor compra: {item.valCompra}</Text>
            <Text style={styles.clienteText}>Valor venta: {item.valVenta}</Text>
            <Text style={styles.clienteText}>Unidad medida: {item.unidadMedida}</Text>
            <Text style={styles.clienteText}>Fecha vencimiento: {item.fechaVencimiento}</Text>
        </View>
    );

    const separador = () => {
        return <View style={styles.itemSeparador} />
    }

    return (
        <ScrollView>
            <View style={styles.fondito}>
                <Text style={styles.title}>Lista de inventario</Text>
                <FlatList 
                    data={datosProductos}
                    renderItem={renderProductoItem}
                    SeparadorDeLineas={separador} buttonAdd
                    keyExtractor={(item) => item.idProducto.toString()}
                />
                <Button style={styles.buttonAddProd} title="Agregar productos" />
                <Button style={styles.buttonRemoveProd} title="Quitar productos" />
            </View>
        </ScrollView>
    );
};

export default function InventarioScreen({ navigation }) {
    return (
        <ScrollView>
            <View>
                <Text style={styles.miniTitle}>
                    Inventario
                </Text>
                <ListClientes />
            </View>
        </ScrollView>
    );
}

