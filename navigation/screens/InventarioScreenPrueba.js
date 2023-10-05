import React from "react"
import { View, Text, FlatList, Image, Button, Modal, TextInput, ImageBackground } from "react-native"
import styles from "../../utilidades/styles"
import { ScrollView } from "react-native"
import { useState, useEffect } from "react"
import { TouchableOpacity } from "react-native"
import { Picker } from "@react-native-picker/picker"
import FiltrarBuscar from "../../utilidades/filtrarBuscarProd"
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';


const ListInventario = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [image, setImage] = useState("");//constante de la imagen
  const [data, setData] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [valorVenta, setValorVenta] = useState("");
  const [valorCompra, setValorCompra] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/product')
      .then((response) => response.json())
      .then((data) => {
        setData(data.productos);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
      });
  }, []);


  const handleCantidadChange = (text) => {
    setCantidad(text);
  }

  const handleValorVentaChange = (text) => {
    setValorVenta(text);
  }

  const handleValorCompraChange = (text) => {
    setValorCompra(text);
  }

  const handleGuardarCambios = async () => {
    if (selectedProducto) {
      const productoActualizado = {
        ...selectedProducto,
        cantidad: cantidad,
        valorVenta: valorVenta,
        valorCompra: valorCompra,
      };

      let imagenBase64 = '';

      if (image) {
        const imgUri = image;
        const base64Img = await FileSystem.readAsStringAsync(imgUri, { encoding: 'base64' });
        imagenBase64 = base64Img.replace('data:image/png;base64,', '');
      }

      productoActualizado.imagen = imagenBase64;

      console.log(productoActualizado);

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

  const renderProductoItem = ({ item }) => {
    if (selectedCategory && item.categoria !== selectedCategory) {
      return null;
    }

    return (
      <TouchableOpacity onPress={() => handleOpenModal(item)}>
        <View style={styles.fondoListas}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.clienteText}>{item.nombre}</Text>
              <Text style={styles.clienteText}>Cantidad: {item.cantidad}</Text>
              <Text style={styles.clienteText}>{item.marca}</Text>
              <Text style={styles.clienteText}>Valor venta: {item.valorVenta}</Text>
              <Text style={styles.clienteText}>Valor compra: {item.valorCompra}</Text>
              <Text style={styles.clienteText}>{item.categoria}</Text>
            </View>
            <View style={{ width: 100, height: 100 }}>
              {/* Muestra las imágenes si están disponibles */}
              {item.imagenes &&
                item.imagenes.map((imagen, index) => {
                  // Decodifica los datos base64 a URL de imagen
                  const imageUrl = `data:image/png;base64,${imagen}`;
                  return (
                    <Image
                      key={index}
                      source={{ uri: imageUrl }}
                      style={{ width: 100, height: 100, borderRadius: 20 }}
                    />
                  );
                })}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.containerThree}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <FiltrarBuscar
          Data={selectedCategory}
          onItemSelected={handleOpenModal}
        />
  
        <View style={{ position: 'absolute', top: 0, right: 0 }}>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.pickerforBuscarProducto}
          >
            <Picker.Item label="Categoría" value="" />
            <Picker.Item label="Líquidos" value="Líquidos" />
            <Picker.Item label="Sólidos" value="Sólidos" />
            <Picker.Item label="Polvos" value="Polvos" />
            <Picker.Item label="Otro" value="Otro" />
          </Picker>
        </View>
      </View>
  
      <FlatList
        data={data}
        style={{ flex: 1 }}
        renderItem={renderProductoItem}
        keyExtractor={(item) => item.idProducto.toString()}
      />
  
      <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedProducto && (
              <>
                <Text style={styles.modalTitle}>Actualizar campos de un producto</Text>
                <Text style={styles.clienteText}>{selectedProducto.nombre}</Text>
                <Text style={styles.clienteText}>Cantidad: {selectedProducto.cantidad}</Text>
                <Text style={styles.clienteText}>Valor venta: {selectedProducto.valorVenta}</Text>
                <Text style={styles.clienteText}>Valor compra: {selectedProducto.valorCompra}</Text>
                <Text style={styles.modalSubTitle}>Agregar Cambios</Text>
  
                <TextInput
                  style={styles.inputForModal}
                  placeholder="Cantidad"
                  onChangeText={handleCantidadChange}
                  value={String(cantidad)}
                  keyboardType="numeric"
                  cursorColor={"#FFFFFF"}
                  placeholderTextColor={"#FFFFFF"}
                />
  
                <TextInput
                  style={styles.inputForModal}
                  placeholder="Valor venta"
                  onChangeText={handleValorVentaChange}
                  value={String(valorVenta)}
                  keyboardType="numeric"
                  cursorColor={"#FFFFFF"}
                  placeholderTextColor={"#FFFFFF"}
                />
  
                <TextInput
                  style={styles.inputForModal}
                  placeholder="Valor compra"
                  onChangeText={handleValorCompraChange}
                  value={String(valorCompra)}
                  keyboardType="numeric"
                  cursorColor={"#FFFFFF"}
                  placeholderTextColor={"#FFFFFF"}
                />
  
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 20,
                      alignSelf: 'center',
                    }}
                  />
                )}
  
                <TouchableOpacity style={styles.buttonCerrar} onPress={handleImagePicker}>
                  <Text style={styles.colorTextButtonCerrar}> Subir imagen</Text>
                </TouchableOpacity>
  
                {image && (
                  <TouchableOpacity style={styles.buttonCerrar} onPress={handleClearImage}>
                    <Text style={styles.colorTextButtonCerrar}> Eliminar imagen</Text>
                  </TouchableOpacity>
                )}
  
                <TouchableOpacity style={styles.buttonCerrar} onPress={handleCloseModal}>
                  <Text style={styles.colorTextButtonCerrar}>Cerrar</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.buttonGuardar} onPress={handleGuardarCambios}>
                  <Text style={styles.colorTextButtonGuardar}>Guardar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
  }

export default function InventarioScreenPrueba({ navigation }) {
  return (

        <ListInventario />

  )
}