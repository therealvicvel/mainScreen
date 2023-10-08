import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Button } from "react-native";
import styles from "../../utilidades/styles";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


export default function AddProductoScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [valorCompra, setValorCompra] = useState("");
  const [valorVenta, setValorVenta] = useState("");
  const [unidadMedida, setUnidadMedida] = useState("");
  const [marca, setMarca] = useState("");
  const [categoria, setCategoria] = useState("");
  const [image, setImage] = useState("");//constante de la imagen
  const [data, setData] = useState([]);

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

  const handleCancelarTodo = () => {
    setNombre("");
    setCantidad("");
    setValorCompra("");
    setValorVenta("");
    setUnidadMedida("");
    setMarca("");
    setCategoria("");
    setImage("");
  }

  const handleAgregarProducto = async () => {
    if (!validarCampos()) {
      alert("Por favor, completa todos los campos antes de agregar el producto.");
      return;
    }

    let imagenBase64 = '';

    if (image) {
      const imgUri = image;
      const base64Img = await FileSystem.readAsStringAsync(imgUri, { encoding: 'base64' });
      imagenBase64 = base64Img.replace('data:image/png;base64,', '');
    }

    const nuevoProducto = {
      nombre: nombre,
      cantidad: cantidad,
      valorCompra: valorCompra,
      valorVenta: valorVenta,
      unidadMedida: unidadMedida,
      categoria: categoria,
      marca: marca,
      imagen: imagenBase64,
    };

    console.log(nuevoProducto); // Agrega este log

    fetch("https://viramsoftapi.onrender.com/create_product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoProducto),
    })
      .then((response) => response.json())
      .then((responseData) => {
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
          setImage("");
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
  //Codigo de la imagen
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se necesita permiso para acceder a la cámara y la galería.');
      }
    })();
  }, []);

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleClearImage = () => {
    setImage(null); // Borra la imagen estableciendo la URI en null
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
        {/* Código de la imagen */}
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 20,
              alignSelf: 'center',
            }}
          />
        )}
        <TouchableOpacity
          style={styles.buttonAddProd}
          onPress={handleImagePicker}
        >
          <Text style={styles.colorTextButtonAddProd}> Subir imagen</Text>
        </TouchableOpacity>
        {image && (
          <TouchableOpacity style={styles.buttonAddProd} onPress={handleClearImage}>
            <Text style={styles.colorTextButtonAddProd}> Eliminar imagen</Text>
          </TouchableOpacity>
        )}
        {/* Fin del código */}
        <TouchableOpacity
          style={styles.buttonAddProd}
          onPress={handleAgregarProducto}
        >
          <Text style={styles.colorTextButtonAddProd}>Agregar producto</Text>
        </TouchableOpacity>
      </ScrollView>
    </ScrollView>
  );
        }  