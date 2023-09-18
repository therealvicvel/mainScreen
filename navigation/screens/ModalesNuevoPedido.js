import React, { useEffect, useState } from "react";
import { View, Modal, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import BuscarCliente from "../../utilidades/BuscarCliente";
import Calendario from "../../utilidades/Calendario";


const ModalesNuevoPedido = ({ modalVisible, setModalVisible, products, setProducts }) => {
  const [total, setTotal] = useState(0);
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [observations, setObservations] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [editQuantityIndex, setEditQuantityIndex] = useState(null);

  const handleEditQuantity = (index) => {
    setEditQuantityIndex(index);
  };
  const handleEditQuantityChange = (text) => {
    const newQuantity = parseInt(text, 10) || 0;
  
    // Validar que la nueva cantidad no sea mayor que el stock
    if (editQuantityIndex !== null && newQuantity > products[editQuantityIndex].cantidad) {
      alert('La cantidad no puede ser mayor que el stock disponible.');
      return;
    }
  
    // Solo actualizar si la nueva cantidad es válida (mayor o igual a cero)
    if (newQuantity >= 0) {
      const updatedProducts = products.map((product, index) => {
        if (index === editQuantityIndex) {
          return {
            ...product,
            quantity: newQuantity,
          };
        }
        return product;
      });
      setProducts(updatedProducts);
    }
  };
  
  const handleSaveQuantity = () => {
    setEditQuantityIndex(null);
  };
  useEffect(() => {
    const calculatedTotal = products.reduce((acc, product) => acc + product.quantity * product.valorVenta, 0);
    setTotal(calculatedTotal);
  }, [products]);

  const handleSelectClient = (client) => {
    setSelectedClient(client);
  };

  const handleCloseModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleRemoveProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };
  const crearPedido = () => {
    if (!selectedClient) {
      alert('Debes seleccionar un cliente antes de crear el pedido.');
      return;
    }
  
    if (!selectedDate) {
      alert('Debes seleccionar una fecha antes de crear el pedido.');
      return;
    }
  
    if (!observations.trim()) {
      alert('Debes ingresar observaciones antes de crear el pedido.');
      return;
    }
    // Aquí puedes obtener más detalles del cliente o cualquier otra información necesaria para el pedido
    const clienteSeleccionado = selectedClient ? selectedClient.documento : ''; // Utilizamos el campo "documento" del cliente seleccionado

    // Preparar la lista de productos seleccionados con sus cantidades
    const productosSeleccionados = products.map(item => ({
      idProducto: item.idProducto,
      cantidad: item.quantity || 0, // Usamos la cantidad del producto directamente
    }));

    // Construir el objeto pedidoGuardado con todos los datos
    const pedidoGuardado = {
      pedido: {
        documentoCliente: clienteSeleccionado,
        fechaEntrega: selectedDate ,
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
    setShowSecondModal(false);
    setModalVisible(false);
  };
  return (
    <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(!modalVisible)}
  >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Elementos seleccionados:</Text>
          <Text>Total: <Text>${total.toFixed(2)}</Text></Text>
          {products.map((product, index) => (
          <View key={index} style={styles.productItem}>
           <Text>Producto: {product.nombre}</Text>
           <Text>Cantidad: {product.quantity}</Text>
           <Text>Precio: {product.valorVenta}</Text>
           <TouchableOpacity onPress={() => handleEditQuantity(index)}>
              <Text>Editar Cantidad</Text>
              {editQuantityIndex !== null && (
  <Modal
    visible={editQuantityIndex !== null}
    animationType="slide"
    transparent={true}
    onRequestClose={() => setEditQuantityIndex(null)}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TextInput
          style={styles.quantityInput}
          placeholder="Nueva cantidad"
          keyboardType="numeric"
          value={products[editQuantityIndex].quantity.toString()}
          onChangeText={(text) => handleEditQuantityChange(text)}
        />
        <TouchableOpacity onPress={handleSaveQuantity}>
          <Text>Guardar Cantidad</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)}
             </TouchableOpacity>
           <TouchableOpacity onPress={() => handleRemoveProduct(index)}>
              <Text>Eliminar</Text>
             </TouchableOpacity>
          </View>
          ))}
          <View style={styles.buttonContainer}>
            <TouchableOpacity  style={styles.closeButton} onPress={handleCloseModal}>
              <Text>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
  onPress={() => {
    if (products.length > 0) {
      setShowSecondModal(true);
    } else {
      // Mostrar un mensaje si no hay productos seleccionados
      alert("Debe haber al menos un producto seleccionado.");
    }
  }}
              disabled={products.length === 0} // Deshabilitar si no hay productos
            >
              <Text>Siguiente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Segundo Modal */}
      {showSecondModal && (
        <Modal
          visible={showSecondModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowSecondModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Contenido del segundo modal */}
              <Text>Detalles Pedido</Text>

              {/* Integra el componente BuscarCliente */}
              <View>
                <BuscarCliente onSelectClient={handleSelectClient} />
                {selectedClient ? ( // Mostrar la información del cliente seleccionado solo si existe
                  <View>
                    
                    <Text style={styles.clienteText}>Datos cliente: </Text>
                    <Text style={styles.clienteText}>Nombre: {selectedClient.nombre}</Text>
                    <Text style={styles.clienteText}>Direccion: {selectedClient.direccion}</Text>
                  </View>
                ) : null}
                <Calendario selectedDate={selectedDate} setSelectedDate={setSelectedDate} /> {/* Pasar la fecha seleccionada y la función para actualizarla */}
                <TextInput
                  placeholder="Observaciones"
                  value={observations} // Vinculamos el valor del TextInput con el estado observations
                  onChangeText={setObservations} // Manejamos el cambio del valor del TextInput con setObservations
                />
                <TouchableOpacity onPress={crearPedido}>
                  <Text>Crear pedido</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => setShowSecondModal(false)}>
                <Text>volver</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#6CAEF6',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#6CAEF6',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ModalesNuevoPedido;