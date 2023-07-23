//Importaciones necesarias
import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

//Importaciones de otras pantallas
import HomeScreen from "./screens/HomeScreen";
import InventarioScreen from "./screens/InventarioScreen";
import ClientesScreen from "./screens/ClientesScreen";
import ListClientes from "./screens/ListClientes";
import PedidosScreen from "./screens/PedidosScreen";
import { ScrollView } from "react-native-gesture-handler";
import AddProductoScreen from "./screens/AddProductoScreen";

//Variables con nombres de las demás pantallas
const homeName = "Inicio";
const pedidosName = "Pedidos";
const inventarioName = "Inventario";
const clientesName = "Clientes";
const listName = "Listado de clientes";
const addProductoName = "Agregar producto"

//Variables del menú inferior y superior
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

//Creación de componente por separado para el topTabNavigator de Inventario
const InventarioTopTabNavigator = () => (
  <TopTab.Navigator>
    <TopTab.Screen name="Inventario" component={InventarioScreen} />
    <TopTab.Screen name="Agregar producto" component={AddProductoScreen} />
  </TopTab.Navigator>
);

//Creación de componente por separado para el topTabNavigator de Clientes
const ClientesTopTabNavigator = () => (
  <TopTab.Navigator>
    <TopTab.Screen name="Agregar nuevo cliente" component={MiniScreenAddClientes} />
    <TopTab.Screen name="Ver clientes" component={MiniScreenClientes} />
  </TopTab.Navigator>
);

//Menú superior de agregar nuevo cliente para la pantalla ClientesScreen
const MiniScreenAddClientes = () => (
  <ScrollView>
    <ClientesScreen />
  </ScrollView>
);

//Menú superior para ver los clientes existentes para la pantalla ClientesScreen
const MiniScreenClientes = () => (
  <ScrollView>
    <ListClientes />
  </ScrollView>
);

//Menú superior para agregar nuevo producto para la pantalla InventarioScreen
const MiniScreenAddProducto = () => (
  <ScrollView>
    <InventarioScreen />
  </ScrollView>
);

//Menú superior para ver los productos existentes en el inventario de InventarioScreen
const MiniScreenInventario = () => (
  <ScrollView>
    <AddProductoScreen />
  </ScrollView>
);

//Creación del menú inferior principal y creación de menús superiores de la pantalla ClientesScreen e InventarioScreen
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
        <Tab.Screen name={inventarioName} component={InventarioTopTabNavigator} />
        <Tab.Screen name={clientesName} component={ClientesTopTabNavigator}>
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}