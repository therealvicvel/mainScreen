import { View, StyleSheet, FlatList, Text } from "react-native";
import React from 'react';
import { ScrollView } from "react-native-web";
import NuevoPedido from "./NuevoPedido";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ListPedido from "./ListPedidos";



const PedidosScreen = ({ navigation }) => { 
    const TopTab = createMaterialTopTabNavigator();
//importacion de la vista ListPedido
    const MiniScreenListPed = () => (
        <ScrollView>
            <View>
             <ListPedido/>
            </View>
        </ScrollView>   
         );
//importacion de la vita NuevoPedido    
    const MiniScreenNewPed = () => (
      <NuevoPedido/>
    );
//lo que se va ver en la vista Pedidos(el menu arriba de NuevoPedido y ListPedido) y por defecto abre List Pedido
    return (

        <TopTab.Navigator>
              <TopTab.Screen name="Ver Pedidos" component={MiniScreenListPed} />
              <TopTab.Screen name="Nuevo Pedidio" component={MiniScreenNewPed} />
        </TopTab.Navigator>

    );
}
//estilo de la vista
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