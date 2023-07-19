import React from "react";
import { View, Text, Button, TextInput, StyleSheet, ScrollView } from "react-native";
import styles from "../../estilos/styles";
import { useNavigation } from '@react-navigation/native';


export default function ClientesScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                ¿Deseas agregar un nuevo cliente?
            </Text>
            <Button style = {styles.button}  title = "Nuevo cliente">
            </Button>
        </View>

    );
}