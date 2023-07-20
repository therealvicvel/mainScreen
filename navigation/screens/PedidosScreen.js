import React from "react";
import { Touchable } from "react-native";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color } from "react-native-reanimated";

export default function SettingsScreen({navigation}) {
    return (      
        <View style = {styles.container}>
            <Text>prueba1 </Text>
            <TextInput style= {styles.Textimput} placeholder= "Nuevo Pedidos"/>
            <TouchableOpacity>
                <Text style= { styles.bottom}>Vista de nuevos Pedidos</Text>
            </TouchableOpacity>
        </View>       
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7FCC3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Textimput: {
        borderColor: '#A3C669',
        borderWidth: 1, 
        padding: 10,
        borderRadius:10
    },
    bottom:{
        backgroundColor: '#A3C669',
        color: '#FFF',
        fontSize: 'auto',
        padding: 15,
        margin: 10,
        borderRadius: 10,

    }
})