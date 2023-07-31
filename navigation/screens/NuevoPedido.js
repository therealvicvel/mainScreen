// Importación de módulos y componentes necesarios
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
import { Checkbox } from 'react-native-paper';
import styles from "../../utilidades/styles";
import DateInput from "../../utilidades/calendario";
import BuscarCliente from "../../utilidades/BuscarCliente";

const NuevoPedido = () => {
  // Estados del componente
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [total, setTotal] = useState(0);
  const [selectedClient, setSelectedClient] = useState(null); // Nuevo estado para el cliente seleccionado
  const [selectedDate, setSelectedDate] = useState(''); // Nuevo estado para la fecha seleccionada
  const [observations, setObservations] = useState('');

  // Carga inicial de los productos desde la API al montar el componente
  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/product')
      .then((response) => response.json())
      .then((data) => {
        setData(data.productos);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

   // Función para manejar el cambio de la fecha seleccionada
   const handleSelectDate = (date) => {
    setSelectedDate(date);
  };
  // Actualización del total cuando cambian las cantidades seleccionadas
  useEffect(() => {
    calculateTotal();
  }, [selectedQuantities]);

  // Función para alternar la selección de un producto
  const toggleItemSelection = (item) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [item.idProducto]: !prevState[item.idProducto]
    }));
  };

  // Función para incrementar la cantidad de un producto seleccionado
  const incrementQuantity = (itemId) => {
    setSelectedQuantities(prevState => ({
      ...prevState,
      [itemId]: (prevState[itemId] || 0) + 1
    }));
  };

   // Función para guardar el pedido
    // Función para guardar el pedido
    const crearPedido = () => {
      // Aquí puedes obtener más detalles del cliente o cualquier otra información necesaria para el pedido
      const clienteSeleccionado = selectedClient ? selectedClient.documento : ''; // Utilizamos el campo "documento" del cliente seleccionado
      const fechaPedido = selectedDate;
    
      // Preparar la lista de productos seleccionados con sus cantidades
      const productosSeleccionados = data
        .filter(item => selectedItems[item.idProducto] && (selectedQuantities[item.idProducto] || 0) > 0)
        .map(item => ({
          idProducto: item.idProducto,
          cantidad: selectedQuantities[item.idProducto] || 0,
        }));
    
      // Construir el objeto pedidoGuardado con todos los datos
      const pedidoGuardado = {
        pedido: {
          documentoCliente: clienteSeleccionado,
          fechaEntrega: fechaPedido,
          observacion: observations, // Usamos el estado "observations" para las observaciones del pedido
        },
        productos: productosSeleccionados,
      };
      console.log('Pedido Guardado:', pedidoGuardado);

    
      // Enviar el pedido a la API utilizando fetch
      fetch('https://viramsoftapi.onrender.com/create_order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoGuardado),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta de la API:", data);
        // Resto del código para manejar la respuesta de la API
      })
      .catch((error) => {
        console.error("Error al guardar el pedido: ", error);
        alert("Ocurrió un error al guardar el pedido. Por favor, intenta nuevamente.");
      });
    // Llamar a la función para guardar el pedido y pasarle los datos necesarios
  };
  // Función para decrementar la cantidad de un producto seleccionado
  const decrementQuantity = (itemId) => {
    setSelectedQuantities(prevState => ({
      ...prevState,
      [itemId]: Math.max((prevState[itemId] || 0) - 1, 0)
    }));
  };

  // Renderiza un elemento de la lista de productos
  const rendePedidoItem = ({ item }) => {
    const isSelected = selectedItems[item.idProducto] || false;
    const quantity = selectedQuantities[item.idProducto] || 0;

    return (
      <TouchableOpacity onPress={() => toggleItemSelection(item)}>
        <View style={styles.container}>
          <View style={styles.listItem}>
            <Checkbox
              status={isSelected ? 'checked' : 'unchecked'}
              onPress={() => toggleItemSelection(item)}
            />
            <Text> Nombre: {item.nombre}</Text>
            <Text> Marca: {item.marca}</Text>
            <Text> Precio: {item.valorVenta}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => decrementQuantity(item.idProducto)}>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
              <TextInput
                value={quantity.toString()}
                onChangeText={(text) => {
                  const newQuantity = parseInt(text, 10);
                  setSelectedQuantities(prevState => ({
                    ...prevState,
                    [item.idProducto]: isNaN(newQuantity) ? 0 : newQuantity,
                  }));
                }}
                keyboardType="numeric"
                style={styles.quantityInput}
              />
              <TouchableOpacity onPress={() => incrementQuantity(item.idProducto)}>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Calcula el total del pedido en función de los productos seleccionados
  const calculateTotal = () => {
    let totalAmount = 0;
    data.forEach((item) => {
      if (selectedItems[item.idProducto]) {
        const quantity = selectedQuantities[item.idProducto] || 0;
        totalAmount += item.valorVenta * quantity;
      }
    });
    setTotal(totalAmount);
  };

  // Abre el modal para mostrar los productos seleccionados y la información adicional del pedido
  const openModal = () => {
    setShowModal(true);
    const selected = data.filter(item => selectedItems[item.idProducto] && (selectedQuantities[item.idProducto] || 0) > 0);
    setSelectedProducts(selected);
  };

  // Cierra el modal
  const closeModal = () => {
    setShowModal(false);
  };

   // Función para manejar el cambio del cliente seleccionado
   const handleSelectClient = (client) => {
    setSelectedClient(client);
  };

  // Componente principal
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={rendePedidoItem}
          keyExtractor={(item) => item.idProducto.toString()}
        />
      </View>
      <View style={styles.containerTotal}>
        <Text style={styles.colorTextTotal}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.buttonNext} onPress={openModal}>
          <Text style={styles.colorTextButtonNext}>Siguiente</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Productos seleccionados</Text>
            <FlatList
              data={selectedProducts}
              renderItem={({ item }) => (
                <Text style={styles.clienteText} >
                  Nombre: {item.nombre}, Marca: {item.marca}, Cantidad: {selectedQuantities[item.idProducto] || 0}
                </Text>
              )}
              keyExtractor={(item) => item.idProducto.toString()}
            />
            <Text style={styles.clienteText}>Total: ${total.toFixed(2)}</Text>
            <Text style={styles.modalTitleInfoAdicional}>Informacion adicional:</Text>
            <View>
            <BuscarCliente onSelectClient={handleSelectClient} />            
            {selectedClient ? ( // Mostrar la información del cliente seleccionado solo si existe
            <View>
              <Text style={styles.clienteText}>Datos cliente: </Text>
              <Text style={styles.clienteText}>Nombre: {selectedClient.nombre}</Text>
              <Text style={styles.clienteText}>Direccion: {selectedClient.direccion}</Text>
              </View>
            ) : null}
            </View>
            <TextInput
                style={styles.inputForObservaciones}
                placeholder="Observaciones"
                value={observations} // Vinculamos el valor del TextInput con el estado observations
                onChangeText={setObservations} // Manejamos el cambio del valor del TextInput con setObservations
            />            
            <DateInput onSelectDate={handleSelectDate} />

            {selectedDate ? (
              <View>
                <Text style={styles.clienteText}>Fecha pedido: {selectedDate}</Text>
              </View>
            ) : null}
            <TouchableOpacity style={styles.buttonCrearPedido} onPress={crearPedido}>
              <Text style={styles.colorTextButtonCrearPedido}>Crear pedido</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonCerrar} onPress={closeModal}>
              <Text style={styles.colorTextButtonCerrar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default NuevoPedido;
