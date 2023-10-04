import React, { useState, useEffect } from "react";
import {View,Text,FlatList,Modal,StyleSheet,TouchableOpacity,ScrollView} from "react-native";
import styles from "../../utilidades/styles";
import { TextInput } from "react-native";
import BuscarCliente from "../../utilidades/BuscarCliente";
import { Picker } from "@react-native-picker/picker"

const ListClientes = () => {
  const [data, setData] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedState, setSelectedState] = useState("");
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
  
      // Validar los campos
      if (
        clienteActualizado.nombre.trim() === "" ||
        clienteActualizado.direccion.trim() === "" ||
        clienteActualizado.telefono.trim() === ""
      ) {
        alert("Por favor, completa todos los campos antes de guardar los cambios.");
        return;
      }
  
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
              loadDataFromServer();
              return newData;
            });
            
          }
        })
        .catch((error) => {
          console.log("Error al guardar los cambios: ", error);
        });
    }
  };

 

  const loadDataFromServer =() => {

    fetch("https://viramsoftapi.onrender.com/costumer")
    .then((response) => response.json())
    .then((data) => {
      console.log("Datos recibidos de la API:", data);
      setData(data.clientes);
    })
    .catch((error) => {
      console.error("Error fetching data", error);
    });
  }

  useEffect(() => {
   // Cargar los datos desde el servidor al montar el componente
   loadDataFromServer();
  }, []);

  const handlePickerChange = (itemValue) => {
    setSelectedState(itemValue);
    
    let apiUrl;
    
    if (itemValue === "Líquidos") {
      apiUrl = "https://viramsoftapi.onrender.com/costumer_active";
    } else if (itemValue === "Sólidos") {
      apiUrl = "https://viramsoftapi.onrender.com/costumer_inactive";
    } else {
      apiUrl = "https://viramsoftapi.onrender.com/costumer";
    }
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos de la API:", data);
        setData(data.clientes);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  };

  const cambiarEstadoCliente = () => {
    if (selectedCliente) {
      const idCliente = selectedCliente.documento;
  
      const url = `https://viramsoftapi.onrender.com/costumer_change_state/${idCliente}?doc_cliente=${idCliente}&summary=Estado%20cambiado`;
  
      fetch(url, {
        method: "POST", // Dependiendo de lo que requiera tu API (puede ser PUT o PATCH también)
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.success) {
            alert("Hubo un error al cambiar el estado del cliente.");
          } else {
            alert("El estado del cliente se ha cambiado correctamente.");
            // Actualizar la lista de clientes después de cambiar el estado
            setData((prevData) => {
              const newData = prevData.map((item) =>
                item.documento === selectedCliente.documento
                  ? {
                      ...item,
                      estado: responseData.nuevo_estado,
                    }
                  : item
              );
              setIsModalVisible(false);
              return newData;
            });
          }
        })
        .catch((error) => {
          console.log("Error al cambiar el estado del cliente: ", error);
        });
    }
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

  const renderClienteItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOpenModal(item)}>
      <View style={styles.fondoListas}>
        <Text style={styles.clienteText}>{item.documento}</Text>
        <Text style={styles.clienteText}>{item.nombre}</Text>
        <Text style={styles.clienteText}>{item.direccion}</Text>
        <Text style={styles.clienteText}>{item.telefono}</Text>
        <Text style={styles.clienteText}>{item.estado}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.containerTwo}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, }}>
        <BuscarCliente
          Data={data}
          onSelectClient={handleOpenModal} //Actualiza el cliente seleccionado al hacer clic en un cliente en BuscarCliente
        />
        <View style={{ position: 'absolute', top: 0, right: 0 }}>
  <Picker
  selectedValue={selectedState}
  onValueChange={handlePickerChange}
  style={styles.pickerforBuscarProducto}
>
  <Picker.Item label="Estado" value={""} />
  <Picker.Item label="Activo" value="Líquidos" />
  <Picker.Item label="Inactivo" value="Sólidos" />
</Picker>

</View>
        </View>
        <FlatList
          data={data}
          renderItem={renderClienteItem}
          keyExtractor={(item) => item.documento.toString()}
          
        />
      
      <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={handleCloseModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCliente && (
              <>
                <Text style={styles.modalTitle}>
                  Actualizar datos del cliente
                </Text>
                
                <Text style={styles.clienteText}>
                  {selectedCliente.nombre}
                </Text>
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
                  keyboardType="numeric"
                  onChangeText={(text) => setTelefono(text)}
                  cursorColor={"#FFFFFF"}
                  placeholderTextColor={"#FFFFFF"}
                />
              </>
            )}
            <TouchableOpacity
              style={styles.buttonGuardar}
              onPress={cambiarEstadoCliente}
            >
              <Text style={styles.colorTextButtonGuardar}>Cambiar estado</Text>
            </TouchableOpacity>
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