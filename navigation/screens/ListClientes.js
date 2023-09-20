import React, { useState, useEffect } from "react";
import {View,Text,FlatList,Modal,StyleSheet,TouchableOpacity,ScrollView} from "react-native";
import styles from "../../utilidades/styles";
import { TextInput } from "react-native";
import BuscarCliente from "../../utilidades/BuscarCliente";

const ListClientes = () => {
  const [data, setData] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  const editarCliente = () => {
    if (selectedCliente) {
      const clienteActualizado = {
        ...selectedCliente,
        documento: selectedCliente.documento,
        nombre: nombre,
        direccion: direccion,
        telefono: telefono,
      };
      console.log(clienteActualizado);
      fetch(
        `https://viramsoftapi.onrender.com/edit_costumer/${selectedCliente.documento}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clienteActualizado),
        }
      )
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.success) {
            alert("Hubo un error al guardar los cambios.");
          } else {
            alert("Los cambios se han guardado correctamente.");
            //Actualizar la lista de clientes después de guardar los cambios
            setData((prevData) => {
              const newData = prevData.map((item) =>
                item.documento === selectedCliente.documento
                  ? clienteActualizado
                  : item
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

  useEffect(() => {
    fetch("https://viramsoftapi.onrender.com/costumer")
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos de la API:", data);
        setData(data.clientes);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);
  

  const handleOpenModal = (cliente) => {
    setSelectedCliente(cliente);
    setNombre(cliente.nombre);
    setDireccion(cliente.direccion);
    setTelefono(cliente.telefono);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const renderClienteItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOpenModal(item)}>
      <View style={styles.fondoListas}>
        <Text style={styles.clienteText}>Documento: {item.documento}</Text>
        <Text style={styles.clienteText}>Nombre: {item.nombre}</Text>
        <Text style={styles.clienteText}>Direccion: {item.direccion}</Text>
        <Text style={styles.clienteText}>Telefono: {item.telefono}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.containerTwo}>
        <BuscarCliente
          Data={data}
          onSelectClient={handleOpenModal} //Actualiza el cliente seleccionado al hacer clic en un cliente en BuscarCliente
        />
        <FlatList
          data={data}
          renderItem={renderClienteItem}
          keyExtractor={(item) => item.documento.toString()}
        />
      
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCliente && (
              <>
                <Text style={styles.modalTitle}>
                  Actualizar datos del cliente
                </Text>
                <Text style={styles.clienteText}>
                  Documento: {selectedCliente.documento}
                </Text>
                <Text style={styles.clienteText}>
                  Nombre: {selectedCliente.nombre}
                </Text>
                <Text style={styles.clienteText}>
                  Dirección: {selectedCliente.direccion}
                </Text>
                <Text style={styles.clienteText}>
                  Teléfono: {selectedCliente.telefono}
                </Text>
                <Text style={styles.modalSubTitle}>Agregar cambios</Text>
                <TextInput
                  style={styles.inputForModal}
                  placeholder="Nombre"
                  value={nombre}
                  onChangeText={(text) => setNombre(text)}
                />
                <TextInput
                  style={styles.inputForModal}
                  placeholder="Direccion"
                  value={direccion}
                  onChangeText={(text) => setDireccion(text)}
                />
                <TextInput
                  style={styles.inputForModal}
                  placeholder="Telefono"
                  value={telefono}
                  keyboardType="phone-pad"
                  onChangeText={(text) => setTelefono(text)}
                />
              </>
            )}
            <TouchableOpacity
              style={styles.buttonCerrar}
              onPress={handleCloseModal}
            >
              <Text style={styles.colorTextButtonCerrar}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonGuardar}
              onPress={editarCliente}
            >
              <Text style={styles.colorTextButtonGuardar}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ListClientes;
