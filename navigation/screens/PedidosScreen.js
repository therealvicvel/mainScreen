import { View, StyleSheet, FlatList, Text } from "react-native";
import React from 'react';
import { ScrollView } from "react-native";
import NuevoPedido from "./NuevoPedido";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ListPedido from "./ListPedidos";
import styles from "../../utilidades/styles";



const PedidosScreen = ({ navigation }) => { 
    const TopTab = createMaterialTopTabNavigator();
//importacion de la vista ListPedido
    const MiniScreenListPed = () => (
        <View>
            <View>
             <ListPedido/>
            </View>
        </View>   
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