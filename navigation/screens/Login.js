import React, { useState } from "react";
import { View, TextInput, Button,TouchableOpacity,Text,StyleSheet}from "react-native";
import styles from "../../utilidades/styles";
import { Image } from 'react-native';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoginPress = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://viramsoftapi.onrender.com/login      ",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (!response.ok) {
        alert("Datos de ingreso incorrectos. ");
        setUsername("");
        setPassword("");
        setLoading(false);
        return;
      }

      onLogin();
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
      }}
    >
      <Image
        source={require("../../assets/logo-removebg-preview.png")}
        style={{ width: 200, height: 180,justifyContent:'center',alignItems:'center' }}
        resizeMode="contain"
      />
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
        secureTextEntry={!showPassword}
        style={styles.input}
        value={password}
        cursorColor={"#004187"}
        placeholderTextColor={"#004187"}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
        <Text>
          {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonAddProd}
        onPress={handleLoginPress}
        disabled={loading}
      >
        <Text style={styles.colorTextButtonAddProd}>Ingresar</Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 20, color: "#004187" }}>
        Derechos Reservados © Infinite Solutions
      </Text>
    </View>
  );
};


export default LoginScreen;