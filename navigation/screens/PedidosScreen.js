import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

export default function SettingsScreen({ navigation }) {
    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Text
                style={{
                    fontSize: 26,
                    fontWeight: "bold"
                }}>Pedidos</Text>
        </View>
    );
}