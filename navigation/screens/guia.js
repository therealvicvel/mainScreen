import React, { useState } from "react";
import {View,Text,TextInput,TouchableOpacity,ScrollView,Image,Button} from "react-native";
import styles from "../../utilidades/styles";
import { Picker } from '@react-native-picker/picker';
import ImagePicker from "react-native-image-picker";
import * as ImagePicker from 'expo-image-picker';

export default function AddProductoScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [valorCompra, setValorCompra] = useState("");
  const [valorVenta, setValorVenta] = useState("");
  const [unidadMedida, setUnidadMedida] = useState("");
  const [marca, setMarca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const opcionesCategoria = [
    { label: "Seleccionar categoría", value: "" },
    { label: "Líquidos", value: "Líquidos" },
    { label: "Sólidos", value: "Sólidos" },
    { label: "Polvos", value: "Polvos" },
    { label: "Otro", value: "Otro" },
  ];

  const validarCampos = () => {
    if (
      nombre.trim() === "" ||
      cantidad.trim() === "" ||
      valorCompra.trim() === "" ||
      valorVenta.trim() === "" ||
      unidadMedida.trim() === "" ||
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
      valorCompra: valorCompra,
      valorVenta: valorVenta,
      unidadMedida: unidadMedida,
      categoria: categoria,
      marca: marca,
      // Agregamos la URI de la imagen seleccionada
      imagen: selectedImage.uri,
    };

    fetch("https://viramsoftapi.onrender.com/create_product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoProducto),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Respuesta de la API:", responseData);
        if (responseData.success) {
          alert(
            "Ocurrió un error al agregar el producto. Por favor, intenta nuevamente."
          );
        } else {
          setNombre("");
          setCantidad("");
          setValorCompra("");
          setValorVenta("");
          setUnidadMedida("");
          setMarca("");
          setCategoria("");
          setSelectedImage(null); // Limpiamos la imagen seleccionada
          alert("El producto se ha agregado correctamente.");
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

  const handleValorCompraChange = (text) => {
    setValorCompra(text);
  };
  const handleCategoriaChange = (text) => {
    setCategoria(text);
  };
  const handleMarcaChange = (text) => {
    setMarca(text);
  };
  const handleValorVentaChange = (text) => {
    setValorVenta(text);
  };
  const handleUnidadMedidaChange = (text) => {
    setUnidadMedida(text);
  };

  const handleSelectImage = () => {
    ImagePicker.showImagePicker({}, (response) => {
      if (response.uri) {
        setSelectedImage(response);
      }
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.containerAddProd}>
      <ScrollView style={styles.containerAddProd}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del producto"
          onChangeText={handleNombreChange}
          value={nombre}
          cursorColor={"#004187"}
          placeholderTextColor={"#004187"}
        />
        <TextInput
          style={styles.input}
          placeholder="Marca"
          onChangeText={handleMarcaChange}
          value={marca}
          cursorColor={"#004187"}
          placeholderTextColor={"#004187"}
        />
        <TextInput
          style={styles.input}
          placeholder="Cantidad"
          onChangeText={handleCantidadChange}
          value={cantidad}
          keyboardType="numeric"
          cursorColor={"#004187"}
          placeholderTextColor={"#004187"}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor de compra"
          onChangeText={handleValorCompraChange}
          value={valorCompra}
          keyboardType="numeric"
          cursorColor={"#004187"}
          placeholderTextColor={"#004187"}
        />
        <TextInput
          style={styles.input}
          placeholder="Valor de venta"
          onChangeText={handleValorVentaChange}
          value={valorVenta}
          keyboardType="numeric"
          cursorColor={"#004187"}
          placeholderTextColor={"#004187"}
        />
        <TextInput
          style={styles.input}
          placeholder="Unidad de medida"
          onChangeText={handleUnidadMedidaChange}
          value={unidadMedida}
          cursorColor={"#004187"}
          placeholderTextColor={"#004187"}
        />
        <Picker
          style={styles.picker}
          selectedValue={categoria}
          onValueChange={(itemValue) => setCategoria(itemValue)}
        >
          {opcionesCategoria.map((opcion) => (
            <Picker.Item
              key={opcion.value}
              label={opcion.label}
              value={opcion.value}
            />
          ))}
        </Picker>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
        {/* Botón para seleccionar imagen */}
        <Button
        title="hola"
          style={styles.buttonAddCliente}
          onPress={handleSelectImage}
        >
          <Text style={styles.colorTextButtonGuardar}>Seleccionar Imagen</Text>
        </Button>

        {/* Mostrar la imagen seleccionada */}
        {selectedImage && (
          <Image
            source={{ uri: selectedImage.uri }}
            style={{ width: 200, height: 200 }}
          />
        )}

        <TouchableOpacity
          style={styles.buttonAddProd}
          onPress={handleAgregarProducto}
        >
          <Text style={styles.colorTextButtonGuardar}>Agregar producto</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
}
