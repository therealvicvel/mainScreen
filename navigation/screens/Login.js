import React, { useState } from "react";
import { View, TextInput, Button,TouchableOpacity,Text,StyleSheet}from "react-native";
import styles from "../../utilidades/styles";

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPress = async () => {
    try {
      const response = await fetch('https://viramsoftapi.onrender.com/login      ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      if (!response.ok) {

        alert("Datos de ingreso incorrectos. ");
        setUsername('');
        setPassword('');
        return;
      }

      onLogin();
  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={{...styles.container,justifyContent:'center'}}>
      <TextInput
        placeholder="Usuario"
        style={styles.input}
        value={username}
        cursorColor={"#004187"}
        placeholderTextColor={"#004187"}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        cursorColor={"#004187"}
        placeholderTextColor={"#004187"}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity 
      style={styles.buttonAddProd}
      onPress={handleLoginPress} >
        <Text style={styles.colorTextButtonAddProd}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
};


export default LoginScreen;