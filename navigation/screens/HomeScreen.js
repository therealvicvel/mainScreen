import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, Image} from 'react-native';
import Calendario from '../../utilidades/Calendario';
import * as ImagePicker from 'expo-image-picker';
function MiCalendario() {

  const [selectedImage, setSelectedImage] = useState(null);

  const handleCancelarTodo = () => {
    setSelectedImage("");
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // Solicitar la imagen en formato base64
    });
  
    if (!result.cancelled) {
      setSelectedImage(result);
    }
  };
  
  return (

    <View style={styles.container}>
<TouchableOpacity
          style={styles.buttonAddCliente}
          onPress={pickImage}

        >
          <Text style={styles.colorTextButtonGuardar}>Seleccionar imagen</Text>
        </TouchableOpacity>
        
          <Text>Esta es la imagen que debería verse: </Text>
          {selectedImage && <Image source={{ uri: selectedImage.uri }} style={{ width: 200, height: 200 }} />}
        
        <TouchableOpacity
          style={styles.buttonLimpiarCampos}
          onPress={handleCancelarTodo}>
          <Text>Cancelar</Text>
          </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDos: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  blueText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default MiCalendario;
