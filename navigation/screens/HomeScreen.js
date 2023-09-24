import React, { useState, useEffect } from 'react';
import { View, Image, Button, StyleSheet, TouchableOpacity, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function MiCalendario() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se necesita permiso para acceder a la cámara y la galería.');
      }
    })();
  }, []);

  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleClearImage = () => {
    setImage(null); // Borra la imagen estableciendo la URI en null
  };

  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <TouchableOpacity 
      style={styles.buttonGuardar}
      onPress={handleImagePicker} ><Text> Subir Imagen</Text></TouchableOpacity>
      {image && 
      <TouchableOpacity style={styles.buttonGuardar}  onPress={handleClearImage}>
        <Text> Eliminar Imagen</Text>
      </TouchableOpacity>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGuardar: {
    backgroundColor: '#6CAEF6',
    padding: 10,
    borderRadius: 70,
    marginTop: 10,
  },
});

export default MiCalendario;
