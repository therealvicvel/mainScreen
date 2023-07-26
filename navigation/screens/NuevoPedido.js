import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  Button,
} from 'react-native';
import { Checkbox } from 'react-native-paper';
import styles from '../../utilidades/styles';

const data = [
  { id: '1', title: 'Escoba ', marca: 'Marco ', precio: '5000 ', checked: false, quantity: 0 },
  { id: '2', title: 'Trapero ', marca: 'Doña Martha ', precio: '8000 ', checked: false, quantity: 0 },
  { id: '3', title: 'Jabon Liquido ', marca: 'Bimbo ', precio: '4000 ', checked: false, quantity: 0 },
  { id: '4', title: 'Jabon Liquido ', marca: 'Bimbo ', precio: '4000 ', checked: false, quantity: 0 },
  { id: '5', title: 'Jabon Liquido ', marca: 'Bimbo ', precio: '4000 ', checked: false, quantity: 0 },
  { id: '6', title: 'Jabon Liquido ', marca: 'Bimbo ', precio: '4000 ', checked: false, quantity: 0 },
  { id: '7', title: 'Jabon Liquido ', marca: 'Bimbo ', precio: '4000 ', checked: false, quantity: 0 },
  { id: '8', title: 'Jabon Liquido ', marca: 'Bimbo ', precio: '4000 ', checked: false, quantity: 0 },
];

const NuevoPedido = () => {
  const [listData, setListData] = useState(data);
  const [result, setResult] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  //funcion que calcular la cantidad y el precio
  useEffect(() => {
    const calculateResult = () => {
      let total = 0;
      listData.forEach((item) => {
        if (item.checked) {
          total += item.quantity * Number(item.precio);
        }
      });
      setResult(total);
    };
    calculateResult();
  }, [listData]);
  //validacion del checkbox 
  const toggleCheckbox = (itemId) => {
    setListData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
    );
  };
  //contador del input que captura el numero y los datos del producto
  const handleQuantityChange = (itemId, quantity) => {
    setListData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };
  //codigo del Checkbox
  const handleIncrement = (itemId) => {
    setListData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (itemId) => {
    setListData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      )
    );
  };

  const handleToggleProduct = (itemId) => {
    const product = listData.find((item) => item.id === itemId);
    if (product.checked) {
      setSelectedProducts((prevProducts) => prevProducts.filter((item) => item.id !== itemId));
    } else {
      setSelectedProducts((prevProducts) => [...prevProducts, product]);
    }
    toggleCheckbox(itemId);
  };
  //mostrar u ocultar el Modal
  const handleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  //Vista etiqueta de los detallles del producto
  const renderItem = ({ item }) => {
    return (
      <View style={styles.container}>
        <View style={styles.listItem}>
          <TouchableOpacity onPress={() => handleToggleProduct(item.id)}>
            <Checkbox.Android status={item.checked ? 'checked' : 'unchecked'} />
          </TouchableOpacity>
          <Text>Producto: {item.title}</Text>
          <Text>Marca: {item.marca}</Text>
          <Text>Precio unidad: {item.precio}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => handleDecrement(item.id)}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <TextInput
              value={item.quantity.toString()}
              onChangeText={(text) => handleQuantityChange(item.id, text)}
              keyboardType="numeric"
              style={styles.quantityInput}
            />
            <TouchableOpacity onPress={() => handleIncrement(item.id)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  //lo que se imprime en la vista
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={listData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.containerTotal}>
        <Text style={styles.colorTextTotal}>Total: {result}</Text>
        <TouchableOpacity style={styles.buttonNext} onPress={handleModalVisibility}>
          <Text style={styles.colorTextButtonNext}>Siguiente</Text>
        </TouchableOpacity>
      </View>
      {/* editar ventana emergente (modal) */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleModalVisibility}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Productos seleccionados:</Text>
            <FlatList
              data={selectedProducts}
              renderItem={({ item }) => (
                <Text style={styles.infoPedidoText}>{`${item.title} - ${item.marca} - Cantidad: ${item.quantity}`}</Text>
              )}
              keyExtractor={(item) => item.id}
            />
            <Text style={styles.modalSubTitle}>Información adicional:</Text>
            <Text style={styles.miniContentText}>Datos cliente: </Text>
            <Text style={styles.miniContentText}>Valor total: {result}</Text>
            <Text style={styles.modalSubTitle}>Nuevo pedido</Text>
            <TextInput style={styles.inputForModal} placeholder="Fecha de entrega" />
            <TextInput style={styles.inputForModal} placeholder="Buscar cliente..." />
            <TextInput style={styles.inputForModal} placeholder="Observaciones" />
            <TouchableOpacity style={styles.buttonCerrar} onPress={handleModalVisibility}>
            <Text style={styles.colorTextButtonCerrar}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCrearPedido} onPress={() => alert("Pedido creado con éxito")}>
            <Text style={styles.colorTextButtonCrearPedido}>Crear pedido</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NuevoPedido;
