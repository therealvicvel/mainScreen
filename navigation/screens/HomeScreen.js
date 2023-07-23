//Importaciones necesarias
import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import styles from "../../utilidades/styles";

//Creación del contenido para la pantalla principal
export default function HomeScreen({ navigation }) {
    return (
        <View>
            <Text style={styles.title}>Menú principal</Text>
        </View>
    );
}