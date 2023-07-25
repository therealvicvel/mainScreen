//Importaciones necesarias
import React from "react";
import { View, Text, FlatList, Image, Button, Modal, TextInput } from "react-native";
import styles from "../../utilidades/styles";
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

//Creación de lista visual de inventario (declaración de variables y sus datos)
const ListInventario = () => {
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

    //Variables para el manejo del Modal
    const [selectedProducto, setSelectedProducto] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Función para abrir el modal y establecer el producto seleccionado
    const handleOpenModal = (producto) => {
        setSelectedProducto(producto);
        setIsModalVisible(true);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    //Creación de campos para mostrar en ellos los datos anteriormente creados
    const renderProductoItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleOpenModal(item)}>
        <View style={styles.fondoListas}>
            <Text style={styles.clienteText}>ID: {item.idProducto}</Text>
            <Text style={styles.clienteText}>Nombre: {item.nombre}</Text>
            <Text style={styles.clienteText}>Cantidad: {item.cantidad}</Text>
            <Text style={styles.clienteText}>Valor compra: {item.valCompra}</Text>
            <Text style={styles.clienteText}>Valor venta: {item.valVenta}</Text>
            <Text style={styles.clienteText}>Unidad medida: {item.unidadMedida}</Text>
            <Text style={styles.clienteText}>Fecha vencimiento: {item.fechaVencimiento}</Text>
        </View>
        </TouchableOpacity>
    );

    //Separador visual para cada elemento de la lista
    const separador = () => {
        return <View style={styles.itemSeparador} />
    }

    return (
        //Utilización del FlatList para mostrar los datos, decoración y diseño de la lista y pantalla
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <Text style={styles.title}>Lista de inventario</Text>
                <FlatList
                    data={datosProductos}
                    renderItem={renderProductoItem}
                    SeparadorDeLineas={separador}
                    keyExtractor={(item) => item.idProducto.toString()}
                />
            </View>
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          {selectedProducto && (
            <>
            <Text style={styles.modalTitle}>Actualizar campos de un producto</Text>
              <Text style={styles.clienteText}>ID: {selectedProducto.idProducto}</Text>
              <Text style={styles.clienteText}>Nombre: {selectedProducto.nombre}</Text>
              <Text style={styles.clienteText}>Cantidad: {selectedProducto.cantidad}</Text>
              <Text style={styles.clienteText}>Valor compra: {selectedProducto.valCompra}</Text>
              <Text style={styles.clienteText}>Valor venta: {selectedProducto.valVenta}</Text>
              <Text style={styles.clienteText}>Unidad medida: {selectedProducto.unidadMedida}</Text>
              <Text style={styles.clienteText}>Fecha vencimiento: {selectedProducto.fechaVencimiento}</Text>
              <Text style={styles.modalSubTitle}>Agregar Cambios</Text>
              <TextInput style={styles.inputForModal}
              placeholder= "Cantidad"></TextInput>
              <TextInput style={styles.inputForModal}
              placeholder= "Valor venta"></TextInput> 
            </>
          )}
          <TouchableOpacity style={styles.buttonCerrar} onPress={handleCloseModal}>
            <Text style={styles.colorTextButtonCerrar}>Cerrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGuardar} 
            onPress={() => alert("Los cambios se han guardado")}>
              <Text style={styles.colorTextButtonGuardar}>Guardar</Text>
          </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
    );
};

export default function InventarioScreen({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <Text style={styles.miniTitle}>
                    Inventario
                </Text>
                <ListInventario />
            </View>
        </ScrollView>
    );
}

