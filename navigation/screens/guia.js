//Importaciones necesarias
import React from "react";
import { View, Text, FlatList, Image, Button, Modal, TextInput, ImageBackground,  } from "react-native";
import { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from '@react-native-picker/picker';
import FiltrarBuscar from "../../utilidades/filtrarBuscarProd";

//Creación de lista visual de inventario (declaración de variables y sus datos)
const ListInventario = () => {
  const [data, setData] = useState([]);
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState("");
  const [valorVenta, setValorVenta] = useState("");
  const [valorCompra, setValorCompra] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);



  const handleCantidadChange = (text) => {
    setCantidad(text);
  };

  const handleValorVentaChange = (text) => {
    setValorVenta(text);
  };

  const handleValorCompraChange = (text) => {
    setValorCompra(text);
  };

  const handleGuardarCambios = () => {
    if (selectedProduct) {
      const productoActualizado = {
        ...selectedProduct,
        cantidad: cantidad,
        valorVenta: valorVenta,
        valorCompra: valorCompra,
      };

      console.log(productoActualizado);
      fetch(`https://viramsoftapi.onrender.com/edit_product/${selectedProduct.idProducto}`, {
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
            //Actualizar la lista de productos después de guardar los cambios
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
  
  const handleAddPress = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const filterProductsByCategory = () => {
    if (!selectedCategory) {
      setFilteredData(data);
    } else {
      const filteredProducts = data.filter((item) => item.categoria === selectedCategory);
      setFilteredData(filteredProducts);
    }
  };

  useEffect(() => {
    filterProductsByCategory();
  }, [selectedCategory]);

  const filterData = (text) => {
    if (text === '') {
      return [];
    }

    const filteredData = data.filter((item) =>
      item.nombre.toLowerCase().includes(text.toLowerCase()) ||
      item.idProducto.toString().includes(text)
    );
    return filteredData;
  };

  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/product')
      .then((response) => response.json())
      .then((data) => {
        setData(data.productos);
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching data: ", error)
      });
  }, []);

  //Creación de campos para mostrar en ellos los datos anteriormente creados
  return (
    <View style={{ flex: 1 }}>
      <FiltrarBuscar Data={filteredData}/>    
      <View style={{ borderWidth: 1, borderColor: 'black', padding: 10 }}>
         <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
          <Picker.Item label="Todos" value={""} />
          <Picker.Item label="Líquidos" value="Líquidos" />
          <Picker.Item label="Sólidos" value="Sólidos" />
          <Picker.Item label="Polvos" value="Polvos" />
          <Picker.Item label="Otro" value="Otro" />
        </Picker>
      </View>
     
  <FlatList
    data={filteredData}
    keyExtractor={(item) => item.idProducto.toString()}
    numColumns={2}
    renderItem={({ item }) => (
      <View style={{ flex: 1 }}>
        <Text>Nombre: {item.nombre}</Text>
        <Text>Marca: {item.marca}</Text>
        <Text>Precio: {item.valorVenta}</Text>
        <Text>Stock: {item.cantidad}</Text>
        <TouchableOpacity onPress={() => handleAddPress(item)}>
          <Text>Actualizar</Text>
        </TouchableOpacity>
      </View>
    )}
  />
   <Modal visible={isModalVisible} animationType="slide" transparent={true}>
    <View>
      <View style= {{ padding: 16,
    backgroundColor: '#004187',
    borderRadius: 20,}}>
        {selectedProduct && (
          <>
            <Text>Actualizar campos de un producto</Text>
            <Text>ID: {selectedProduct.idProducto}</Text>
            <Text>Nombre: {selectedProduct.nombre}</Text>
            <Text>Marca: {selectedProduct.marca}</Text>
            <Text>Cantidad: {selectedProduct.cantidad}</Text>
            <Text>Valor compra: {selectedProduct.valorCompra}</Text>
            <Text>Valor venta: {selectedProduct.valorVenta}</Text>
            <Text>Unidad medida: {selectedProduct.unidadMedida}</Text>
            <Text>Categoría: {selectedProduct.categoria}</Text>
            <Text>Agregar Cambios</Text>
            <TextInput
              placeholder="Cantidad"
              onChangeText={handleCantidadChange}
              value={cantidad}
            />
            <TextInput
              placeholder="Valor venta"
              onChangeText={handleValorVentaChange}
              value={valorVenta}
            />
            <TextInput
              placeholder="Valor compra"
              onChangeText={handleValorCompraChange}
              value={valorCompra}
            />
          </>
        )}
        <TouchableOpacity onPress={handleCloseModal}>
          <Text>Cerrar</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={handleGuardarCambios}>
            <Text>Guardar</Text>
           </TouchableOpacity>
         </View>
         </View>
      </Modal>
    </View>
    
  );
};

export default function InventarioScreen({ navigation }) {
  return (
    <View>
      <View>
        <ListInventario />
      </View>
    </View>
  );
}

