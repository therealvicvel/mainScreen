//Importaciones necesarias
import React from "react";
import { View, Text, Button, TextInput, StyleSheet, ScrollView, TouchableOpacity,
} from "react-native";
import { Picker } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../../utilidades/styles";
import { useState } from "react";

//Creación del formulario para agregar un nuevo producto
export default function AddProductoScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [valCompra, setValCompra] = useState("");
  const [valVenta, setValVenta] = useState("");
  const [unidadMedida, setUnidadMedida] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [marca, setMarca] = useState("");
  const [categoria, setCategoria] = useState("");
  
  const opcionesCategoria = [
  { label: "Seleccionar categoría", value: "" }, 
  { label: "Líquidos", value: "Líquidos" },
  { label: "Sólidos", value: "Sólidos" },
  { label: "Polvos", value: "Polvos" },
  { label: "Otro", value: "Otro" },
  ];

  const [data, setData] = useState([]);

  const validarCampos = () => {
    if (
      nombre.trim() === "" ||
      cantidad.trim() === "" ||
      valCompra.trim() === "" ||
      valVenta.trim() === "" ||
      unidadMedida.trim() === "" ||
      fechaVencimiento.trim() === "" ||
      marca.trim() === "" ||
      categoria === ""
    ) {
      return false;
    }
    return true;
  };

  const handleAgregarProducto = () => {
    if (!validarCampos()) {
        alert("Por favor, completa todos los campos antes de agregar el producto.");
        return;
    }

    const nuevoProducto = {
      nombre: nombre,
      cantidad: cantidad,
      valCompra: valCompra,
      valVenta: valVenta,
      unidadMedida: unidadMedida,
      fechaVencimiento: fechaVencimiento,
      categoria: categoria,
      marca: marca,
    };
    fetch("https://viramsoftapi.onrender.com/create_product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoProducto),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta de la API:", data);
        setData([data.nuevoProducto]);
        if (data && data.nuevoProducto) {
            alert("El producto se ha agregado correctamente.");
            //Limpieza de los campos para un nuevo producto
            setNombre("");
            setCantidad("");
            setValCompra("");
            setValVenta("");
            setUnidadMedida("");
            setFechaVencimiento("");
            setMarca("");
            setCategoria("");
          } else {
            alert("Ocurrió un error al agregar el producto. Por favor, intenta nuevamente.");
          }
        })
      .catch((error) => {
        console.error("Error al agregar el producto: ", error);
      });
  };

  const handleNombreChange = (text) => {
    setNombre(text);
  };

  const handleCantidadChange = (text) => {
    setCantidad(text);
  };

  const handleValCompraChange = (text) => {
    setValCompra(text);
  };
  const handleCategoriaChange = (text) => {
    setCategoria(text);
  };
  const handleMarcaChange = (text) => {
    setMarca(text);
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

  return (
    //Captura de datos, diseño y decoración del formulario
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del producto"
          onChangeText={handleNombreChange}
          value={nombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Marca"
          onChangeText={handleMarcaChange}
          value={marca}
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
        <Picker
        style={styles.picker}
          selectedValue={categoria}
          onValueChange={(itemValue) => setCategoria(itemValue)}
        >
          {opcionesCategoria.map((opcion) => (
            <Picker.Item key={opcion.value} label={opcion.label} value={opcion.value} />
          ))}
        </Picker>
        <TouchableOpacity
          style={styles.buttonAddProd}
          onPress={handleAgregarProducto}
        >
          <Text style={styles.colorTextButtonGuardar}>Agregar producto</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
