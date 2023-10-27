import React, { useState } from "react";
import { View, TextInput, Button, TouchableOpacity, Text, StyleSheet, Modal, ActivityIndicator } from "react-native";
import styles from "../../utilidades/styles";
import { Image } from 'react-native';

const LoginScreen = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const handleLoginPress = async () => {
    setLoading(true);
    setShowLoadingModal(true);

    try {
      const response = await fetch(
        "https://viramsoftapi.onrender.com/login",
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
        alert("Datos de ingreso incorrectos.");
        setUsername("");
        setPassword("");
      } else {
        onLogin();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setShowLoadingModal(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require("../../assets/logo-removebg-preview.png")}
          style={{ width: 200, height: 180 }}
          resizeMode="contain"
        />
      </View>

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
        <Text style={{ color: "#004187", marginTop: 10, marginLeft: 9 }}>
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

      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <Text style={{ color: "#004187" }}>
          Derechos Reservados © Infinite Solutions
        </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={showLoadingModal}
      >
        <View style={styles.modalContainer}>
          <View>
            <Image
              style={{
                width: 80,
                height: 80,
                borderRadius: 80,
              }}
              source={require("../../assets/giphy.gif")}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LoginScreen;
