import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

export default function HomeScreen({ navigation }) {
    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Text
                onPress={() => alert("Este es la pantalla de inicio. ")}
                style={{
                    fontSize: 26,
                    fontWeight: "bold"
                }}>Menú principal</Text>
        </View>
    );
}