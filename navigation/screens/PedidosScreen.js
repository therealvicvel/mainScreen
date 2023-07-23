import { View, StyleSheet, FlatList, Text } from "react-native";
import React from 'react';
import { ScrollView } from "react-native-web";
import NuevoPedido from "./NuevoPedido";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import ListPedido from "./ListPedidos";



const PedidosScreen = ({ navigation }) => {

    // <View style = {styles.container}>
    //     <Text>prueba1 </Text>
    //     <TextInput style= {styles.Textimput} placeholder= "Nuevo Pedidos"/>
    //     <TouchableOpacity>
    //         <Text style= { styles.bottom}>Vista de nuevos Pedidos</Text>
    //     </TouchableOpacity>
    // </View>   
    const TopTab = createMaterialTopTabNavigator(); // Creamos un TopTabNavigator

    const MiniScreenListPed = () => (
        <ScrollView>
            <View>
             <ListPedido/>
            </View>
        </ScrollView>   
         );
    
    const MiniScreenNewPed = () => (
      <NuevoPedido/>
    );

    return (

        <TopTab.Navigator>
              <TopTab.Screen name="Ver Pedidos" component={MiniScreenListPed} />
              <TopTab.Screen name="Nuevo Pedidio" component={MiniScreenNewPed} />
        </TopTab.Navigator>

    );
}

export default PedidosScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginHorizontal:10
    },
    Textimput: {
        borderColor: '#A3C669',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    bottom: {
        backgroundColor: '#A3C669',
        color: '#FFF',
        fontSize: 'auto',
        padding: 15,
        margin: 10,
        borderRadius: 10,

    }
})