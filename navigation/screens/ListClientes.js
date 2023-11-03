import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Modal, ScrollView, TouchableOpacity, ActivityIndicator, Linking, Platform,RefreshControl } from 'react-native';
import styles from "../../utilidades/styles";
import { TextInput } from "react-native";
import BuscarCliente from "../../utilidades/BuscarCliente";
import { Picker } from "@react-native-picker/picker"
import { Image } from 'react-native';
import AddClientesScreen from "./AddClientesScreen";

const ListClientes = () => {
  const [data, setData] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [showModalAddCliente, setShowModalAddCliente] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetch('https://viramsoftapi.onrender.com/costumer')
    .then((response) => response.json())
    .then((data) => {
      setData(data.clientes);
      setFilteredData(data.clientes);
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    filterClientesByCategory();
  }, [selectedCategory]);

  useEffect(() => {
    fetch('https://viramsoftapi.onrender.com/costumer')
      .then((response) => response.json())
      .then((data) => {
        setData(data.clientes);
        setFilteredData(data.clientes);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const filterClientesByCategory = () => {
    if (!selectedCategory) {
      setFilteredData(data);
    } else {
      const filteredClientes = data.filter((item) => item.estado === selectedCategory);
      setFilteredData(filteredClientes);
    }
  };


  const validarCampos = () => {
    if (nombre.trim() === "" || nombre.length >= 20) {
      alert("El nombre no puede ser nulo o pasar de los 20 caracteres");
      return;
    } else if (direccion.trim() === "" || direccion.length >= 70) {
      alert("La dirección no puede ser nulo o pasar de los 70 caracteres");
      return;
    } else if (!/^\d{10}$/.test(telefono)) {
      alert("el telefono debe contener exactamente 10 dígitos numéricos");
      return;
    } else {
      return editarCliente();
    }
  };
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
  const handleOpenModaldd = () => {
    setShowModalAddCliente(true);
  };

  const handleCloseModaAdd = () => {
    setShowModalAddCliente(false);
  };

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

  return (
    <View style={styles.containerTwo}>
      <View style={{marginBottom:10, maxWidth: 340,}}
      >
        <BuscarCliente
          Data={data}
          onSelectClient={handleOpenModal} 
        />

      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.documento.toString()}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }
        style={{flex: 1}}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOpenModal(item)}>
            <View style={{flex:1, paddingHorizontal:10}}>
            <View style={{ backgroundColor: '#004187', padding: 16,borderRadius: 30, marginBottom: 12,}}>
        <Text style={styles.clienteText}>{item.documento}</Text>
        <Text style={styles.clienteText}>{item.nombre}</Text>
        <Text style={styles.clienteText}>{item.direccion}</Text>
        <Text style={styles.clienteText}>{item.telefono}</Text>
        <Text style={styles.clienteText}>{item.estado}</Text>
      </View>
            </View>
     
    </TouchableOpacity>
        )}
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCliente && (
              <>
                <Text style={styles.modalTitle}>
                  Actualizar datos del cliente
                </Text>

                <Text style={styles.clienteText}>{selectedCliente.nombre}</Text>
                <Text style={styles.clienteText}>
                  {selectedCliente.direccion}
                </Text>
                <Text style={styles.clienteText}>
                  {selectedCliente.telefono}
                </Text>
                <Text style={styles.modalSubTitle}>Agregar cambios</Text>
                <TextInput
                  style={styles.inputForModal}
                  placeholder="Nombre"
                  value={nombre}
                  onChangeText={(text) => setNombre(text)}
                  cursorColor={"#FFFFFF"}
                  placeholderTextColor={"#FFFFFF"}
                />
                <TextInput
                  style={styles.inputForModal}
                  placeholder="Direccion"
                  value={direccion}
                  onChangeText={(text) => setDireccion(text)}
                  cursorColor={"#FFFFFF"}
                  placeholderTextColor={"#FFFFFF"}
                />
                <TextInput
                  style={styles.inputForModal}
                  placeholder="Telefono"
                  value={telefono}
                  keyboardType="number-pad"
                  onChangeText={(text) => setTelefono(text)}
                  cursorColor={"#FFFFFF"}
                  placeholderTextColor={"#FFFFFF"}
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
              onPress={validarCampos}
            >
              <Text style={styles.colorTextButtonGuardar}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 30,
          right: 20,
          padding: 10,
          borderRadius: 60,
          zIndex: 1,
          backgroundColor: "#FFFFFF",
        }}
        onPress={handleOpenModaldd}
      >
        <Image
          source={require("../../assets/addCliente.png")}
          resizeMode="contain"
          style={{
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            tintColor: "#004187",
          }}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModalAddCliente}
        onRequestClose={handleCloseModaAdd}

      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              margin: 20,
              padding: 16,
              backgroundColor: "#FFFFFF",
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Agregar clientes
            </Text>
            <AddClientesScreen />
            <TouchableOpacity
              style={{ backgroundColor: '#FFFFFF',
              padding: 10,
              borderRadius: 70,
              marginTop: 10,}}
              onPress={handleCloseModaAdd}
            >
              <Text style={styles.colorTextButtonCerrar}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ListClientes;