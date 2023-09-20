import React from "react"
import {View, Text, FlatList, Image, Button, Modal, TextInput, ImageBackground} from "react-native"
import styles from "../../utilidades/styles"
import { ScrollView } from "react-native"
import { useState, useEffect } from "react"
import { TouchableOpacity } from "react-native"
import { Picker } from "@react-native-picker/picker"

const ListInventario = () => {
    const [selectedCategory, setSelectedCategory] = useState("");

    const [data, setData] = useState ([]);

    const [cantidad, setCantidad] = useState("");
    const [valorVenta, setValorVenta] = useState("");
    const [valorCompra, setValorCompra] = useState("");

    const handleCantidadChange = (text) => {
        setCantidad(text);
    }

    const handleValorVentaChange = (text) => {
        setValorVenta(text);
    }

    const handleValorCompraChange = (text) => {
        setValorCompra(text);
    }

    useEffect(() => {
        fetch('https://viramsoftapi.onrender.com/product')
        .then((response) => response.json())
        .then ((data) => {
            setData(data.productos);
        })
        .catch((error) => {
            console.error("Error fetching data: ", error)
        });
    }, []);

    const [selectedProducto, setSelectedProducto] = useState(null);

    const handleGuardarCambios = () => {
    if (selectedProducto) {
      const productoActualizado = {
        ...selectedProducto,
        cantidad: cantidad,
        valorVenta: valorVenta,
        valorCompra: valorCompra,
      };
      console.log(productoActualizado);
      fetch(`https://viramsoftapi.onrender.com/edit_product/${selectedProducto.idProducto}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoActualizado),
      })
        .then((response) => response.json())
        .then((responseData) => {
          
          if (responseData.success) {
            alert("Hubo un error al guardar los cambios.");
          } else {
            alert("Los cambios se han guardado correctamente.");
            setData((prevData) => {
              const newData = prevData.map((item) =>
                item.idProducto === selectedProducto.idProducto ? productoActualizado : item
              );
              setIsModalVisible(false);
              return newData;
            });
            
          }
        })
        .catch((error) => {
          console.log("Error al guardar los cambios: ", error);
        });
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = (producto) => {
    setSelectedProducto(producto);
    setCantidad(producto.cantidad),
    setValorVenta(producto.valorVenta),
    setValorCompra(producto.valorCompra),
    setIsModalVisible(true);
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
  }

  const renderProductoItem = ({ item }) => {
    if (selectedCategory && item.categoria !== selectedCategory) {
        return null;
    }
    return (
        <TouchableOpacity onPress={() => handleOpenModal(item)}>
            <View style={styles.fondoListas}>
            <Text style={styles.clienteText}>{item.nombre}</Text>
            <Text style={styles.clienteText}>Cantidad: {item.cantidad}</Text>
            <Text style={styles.clienteText}>{item.marca}</Text>
            <Text style={styles.clienteText}>Valor venta: {item.valorVenta}</Text>
            <Text style={styles.clienteText}>Valor compra: {item.valorCompra}</Text>
            <Text style={styles.clienteText}>{item.categoria}</Text>  
            </View>
        </TouchableOpacity>
    );
  };

  return (
    <View style={styles.containerThree}>
            <View style={styles.categoriaSelector}>
            <Text style={styles.label}>Filtrar por categoría:</Text>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
              style={styles.pickerforBuscarProducto}>
              <Picker.Item label="Todos" value={""} />
              <Picker.Item label="Líquidos" value="Líquidos" />
              <Picker.Item label="Sólidos" value="Sólidos" />
              <Picker.Item label="Polvos" value="Polvos" />
              <Picker.Item label="Otro" value="Otro" />
            </Picker>
            </View>
        <FlatList
          data={data}
          style={{flex: 1}}
          renderItem={renderProductoItem}
          keyExtractor={(item) => item.idProducto.toString()}
        /> 
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProducto && (
              <>
                <Text style={styles.modalTitle}>Actualizar campos de un producto</Text>
                <Text style={styles.clienteText}>ID: {selectedProducto.idProducto}</Text>
                <Text style={styles.clienteText}>Nombre: {selectedProducto.nombre}</Text>
                <Text style={styles.clienteText}>Marca: {selectedProducto.marca}</Text>
                <Text style={styles.clienteText}>Cantidad: {selectedProducto.cantidad}</Text>
                <Text style={styles.clienteText}>Valor compra: {selectedProducto.valorCompra}</Text>
                <Text style={styles.clienteText}>Valor venta: {selectedProducto.valorVenta}</Text>
                <Text style={styles.clienteText}>Unidad medida: {selectedProducto.unidadMedida}</Text>
                <Text style={styles.clienteText}>Categoría: {selectedProducto.categoria}</Text>
                <Text style={styles.modalSubTitle}>Agregar Cambios</Text>
                <TextInput
                  style={styles.inputForModal}
                  placeholder="Cantidad"
                  onChangeText={handleCantidadChange}
                  value={String(cantidad)}
                />
                <TextInput
                  style={styles.inputForModal}
                  placeholder="Valor venta"
                  onChangeText={handleValorVentaChange}
                  value={String(valorVenta)}
                />
                <TextInput
                  style={styles.inputForModal}
                  placeholder="Valor compra"
                  onChangeText={handleValorCompraChange}
                  value={String(valorCompra)}
                />
              </>
            )}
            <TouchableOpacity style={styles.buttonCerrar} onPress={handleCloseModal}>
              <Text style={styles.colorTextButtonCerrar}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonGuardar}
              onPress={handleGuardarCambios}>
              <Text style={styles.colorTextButtonGuardar}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function InventarioScreenPrueba ({ navigation }) {
    return (
        <View>
            <View>
                <ListInventario/>
            </View>
        </View>
    )
}