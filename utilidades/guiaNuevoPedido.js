import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";

const NuevoPedido = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantities, setQuantities] = useState({});
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetch("https://viramsoftapi.onrender.com/product")
      .then((response) => response.json())
      .then((data) => {
        setData(data.productos);
        setIsLoading(false);
        const initialQuantities = {};
        data.productos.forEach((producto) => {
          initialQuantities[producto.idProducto] = 0;
        });
        setQuantities(initialQuantities);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.idProducto.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text> Nombre: {item.nombre}</Text>
            <Text> Marca: {item.marca}</Text>
            <Text> Precio: {item.valorVenta}</Text>
            <Text> Stock: {item.cantidad}</Text>
            <TouchableOpacity style={styles.boton} onPress={() => alert("producto agregado a la Lista")}>
              <Text style={{ color: "#FDFDFD" }}> Agregar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {/* Botón flotante */}
      <TouchableOpacity style={styles.fixedButton}>
        <Text style={styles.buttonText}>Lista</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({

  boton: {
    backgroundColor: "#6CAEF6",
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    margin: 5,
    padding: 10,
    borderRadius: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addRemoveButton: {
    backgroundColor: '#6CAEF6',
    padding: 5, // Cambia el padding para hacer el botón más pequeño
    borderRadius: 5, // Cambia el borderRadius para hacer el botón más pequeño
    marginLeft: 5,
  },
  quantityInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 5,
    height: 30, // Ajusta la altura del TextInput
  },
  fixedButton: {
    position: 'absolute',
    bottom: 20,  // Ajusta esta propiedad para cambiar la posición vertical
    right: 20,  // Ajusta esta propiedad para cambiar la posición horizontal
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    zIndex: 1, // Asegura que el botón esté por encima de otros elementos
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boton: {
    backgroundColor: '#6CAEF6',
    padding: 5, // Cambia el padding para hacer el botón más pequeño
    borderRadius: 5, // Cambia el borderRadius para hacer el botón más pequeño
    marginTop: 10,
  },
});

export default NuevoPedido;