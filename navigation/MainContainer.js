import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//Screens
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/PedidosScreen";
import DetailsScreen from "./screens/InventarioScreen";
import ClientesScreen from "./screens/ClientesScreen";
import ListClientes from "./screens/ListClientes";
import InventarioScreen from "./screens/InventarioScreen";
import PedidosScreen from "./screens/PedidosScreen";

//Screen names
const homeName = "Inicio";
const pedidosName = "Pedidos";
const inventarioName = "Inventario";
const clientesName = "Clientes";
const listName = "Listado de clientes";

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator(); // Creamos un TopTabNavigator

const MiniScreenAddClientes = () => (
  <View>
    <ClientesScreen/>
  </View>
);

const MiniScreenClientes = () => (
  <View>
    <ListClientes/>
  </View>
);

export default function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName={homeName} screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
                iconName = focused ? "home" : "home-outline"
            } else if (rn === pedidosName) {
                iconName = focused ? "cart" : "cart-outline"
            } else if (rn === inventarioName) {
                iconName = focused ? "albums" : "albums-outline"
            } else if (rn === clientesName) {
                iconName = focused ? "person" : "person-outline"
            }

            return <Ionicons name={iconName} size={size} color={color} />
        },
      })}>
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={pedidosName} component={PedidosScreen} />
        <Tab.Screen name={inventarioName} component={InventarioScreen} />
        <Tab.Screen name={clientesName} >
          
          {() => (
            <TopTab.Navigator>
              <TopTab.Screen name="Agregar nuevo cliente" component={MiniScreenAddClientes} />
              <TopTab.Screen name="Ver clientes" component={MiniScreenClientes} />
            </TopTab.Navigator>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
