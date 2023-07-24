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

const data = [
  { id: '1', title: 'Escoba', marca: 'marco',precio: '5000', checked: false, quantity: 0 },
  { id: '2', title: 'Trapero', marca: 'Doña Martha', precio: '8000',checked: false, quantity: 0 },
  { id: '3', title: 'Jabon Liquido', marca: 'Bimbo', precio: '4000',checked: false, quantity: 0 },
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
      <View style={{ padding: 10 }}>
        <View style={styles.listItem}>
          <TouchableOpacity onPress={() => handleToggleProduct(item.id)}>
            <Checkbox.Android status={item.checked ? 'checked' : 'unchecked'} />
          </TouchableOpacity>
          <Text> Producto: {item.title}</Text>
          <Text>  Marca: {item.marca}</Text>
          <Text>  Precio U: {item.precio}</Text>
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
        <Text style={{ padding: 10 }}>Resultado: {result}</Text>
        <TouchableOpacity style={styles.button} onPress={handleModalVisibility}>
          <Text style={styles.buttonText}>Siguiente</Text>
        </TouchableOpacity>
      </View>
     {/* editar ventana emergente (modal) */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleModalVisibility}>
        <View style={{flex:1,backgroundColor:"#FFFF"}}>
          <View style={styles.Textimput}>
            <Text >Productos seleccionados:</Text>
            <FlatList
              data={selectedProducts}
              renderItem={({ item }) => (
                <Text>{`${item.title} - ${item.marca} - Cantidad: ${item.quantity}`}</Text>
              )}
              keyExtractor={(item) => item.id}
            />
            <Text>Datos cliente: </Text>
            <Text>Valor total: {result}</Text>
            <TextInput style= {styles.TextBuscar} placeholder= "Ingrese la fecha de entrega"/>
            <TextInput style= {styles.TextBuscar} placeholder= "Buscar Cliente......Dar enter para Buscar"/>
            <TextInput style= {styles.TextBuscar} placeholder= "Observaciones"/>
            <TouchableOpacity style={styles.button} onPress={() => alert("El pedido se ha guardado")}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCerrar} onPress={handleModalVisibility}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 80,
    padding: 10,
  },
  button: {
    backgroundColor: '#A3C669',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonCerrar: {
    backgroundColor: '#F65F50',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  Textimput: {
    marginHorizontal:'20%', marginVertical:'5%', backgroundColor: '#FFFF',
    borderColor: '#A3C669',
    backgroundColor:'#FFFF',
    borderWidth: 1,
    padding: 10,
    flex:1,
    borderRadius: 10
},
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  containerTotal: {
    backgroundColor: '#E397C9',
    flex: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#A3C669',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  quantityInput: {
    width: 50,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  quantityButton: {
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  TextBuscar: {
    borderColor: '#A3C669',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
},
});

export default NuevoPedido;
