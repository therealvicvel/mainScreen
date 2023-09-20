import React from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { Picker } from '@react-native-picker/picker';
import FiltrarBuscar from "../../utilidades/filtrarBuscarProd";

const ListInventario = () => {
  const [data, setData] = useState([]);
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
  
      console.log('Producto actualizado:', productoActualizado);
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
                item.idProducto === selectedProduct.idProducto ? productoActualizado : item
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
    setCantidad(product.cantidad);
    setValorVenta(product.valorVenta);
    setValorCompra(product.valorCompra);
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
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
      <FiltrarBuscar Data={filteredData} onItemSelected={handleAddPress} />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.idProducto.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={{ flex: 1, padding: 16, backgroundColor: '#f0f0f0', margin: 8, borderRadius: 8 }}>
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ padding: 16, backgroundColor: '#004187', borderRadius: 20, width: '80%' }}>
            {selectedProduct && (
              <>
                <Text style={{ color: 'white' }}>Actualizar campos de un producto</Text>
                <Text style={{ color: 'white' }}>ID: {selectedProduct.idProducto}</Text>
                <Text style={{ color: 'white' }}>Nombre: {selectedProduct.nombre}</Text>
                <Text style={{ color: 'white' }}>Marca: {selectedProduct.marca}</Text>
                <Text style={{ color: 'white' }}>Cantidad: {selectedProduct.cantidad}</Text>
                <Text style={{ color: 'white' }}>Valor compra: {selectedProduct.valorCompra}</Text>
                <Text style={{ color: 'white' }}>Valor venta: {selectedProduct.valorVenta}</Text>
                <Text style={{ color: 'white' }}>Unidad medida: {selectedProduct.unidadMedida}</Text>
                <Text style={{ color: 'white' }}>Categoría: {selectedProduct.categoria}</Text>
                <Text style={{ color: 'white' }}>Agregar Cambios</Text>
                <TextInput
                  placeholder="Cantidad"
                  onChangeText={handleCantidadChange}
                  value={cantidad}
                  style={{ backgroundColor: 'white', padding: 8, marginBottom: 8 }}
                />
                <TextInput
                  placeholder="Valor venta"
                  onChangeText={handleValorVentaChange}
                  value={valorVenta}
                  style={{ backgroundColor: 'white', padding: 8, marginBottom: 8 }}
                />
                <TextInput
                  placeholder="Valor compra"
                  onChangeText={handleValorCompraChange}
                  value={valorCompra}
                  style={{ backgroundColor: 'white', padding: 8, marginBottom: 16 }}
                />
                <TouchableOpacity onPress={handleCloseModal}>
                  <Text style={{ color: 'white' }}>Cerrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleGuardarCambios}>
                  <Text style={{ color: 'white' }}>Guardar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default function InventarioScreen({ navigation }) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ListInventario />
    </View>
  );
}
