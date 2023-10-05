//Importaciones necesarias
import React, { useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
//Importaciones de otras pantallas
import HomeScreen from "./screens/HomeScreen";
import ListClientes from "./screens/ListClientes";
import PedidosScreen from "./screens/PedidosScreen";
import AddClientesScreen from "./screens/AddClientesScreen";
import AddProductoScreen from "./screens/AddProductoScreen";
import styles from "../utilidades/styles";
import InventarioScreenPrueba from "./screens/InventarioScreenPrueba";
import LoginScreen from "./screens/Login";
//Variables con nombres de las demás pantallas

const homeName = 'Inicio';
const pedidosName = 'Pedidos';
const inventarioName = 'Inventario.';
const clientesName = 'Clientes';
const loginName= 'Login';
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();


const ClientesTopTabNavigator = ({ navigation }) => { 
  const TopTab = createMaterialTopTabNavigator();
//importacion de la vista ListPedido
  const MiniScreenClientes = () => (
 
          <ListClientes />

       );
//importacion de la vita NuevoPedido    
  const MiniScreenAddClientes = () => (
<AddClientesScreen />
  );
//lo que se va ver en la vista Pedidos(el menu arriba de NuevoPedido y ListPedido) y por defecto abre List Pedido
  return (

      <TopTab.Navigator>
            <TopTab.Screen name="LIsta Clientes" component={MiniScreenClientes} />
            <TopTab.Screen name="Agregar Clientes" component={MiniScreenAddClientes} />
      </TopTab.Navigator>

  );
}

const InventarioTopTabNavigator = ({ navigation }) => { 
  const TopTab = createMaterialTopTabNavigator();
//importacion de la vista ListPedido
  const MiniScreenInventario = () => (
    
          <InventarioScreenPrueba />

       );
//importacion de la vita NuevoPedido    
  const MiniScreenAddProducto = () => (
<AddProductoScreen />
  );
//lo que se va ver en la vista Pedidos(el menu arriba de NuevoPedido y ListPedido) y por defecto abre List Pedido
  return (

      <TopTab.Navigator>
            <TopTab.Screen name=" Lista Inventario" component={MiniScreenInventario} />
            <TopTab.Screen name="Agregar Producto" component={MiniScreenAddProducto} />
      </TopTab.Navigator>

  );
}

export default function MainContainer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está autenticado

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <NavigationContainer>
      {isLoggedIn ? (
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === inventarioName) {
              iconName = focused ? 'albums' : 'albums-outline';
            } else if (rn === clientesName) {
              iconName = focused ? 'person' : 'person-outline';
            } else if (rn === pedidosName) {
              iconName = focused ? 'cart' : 'cart-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name={homeName} component={HomeScreen} />
        <Tab.Screen name={inventarioName} component={InventarioTopTabNavigator} />
        <Tab.Screen name={clientesName} component={ClientesTopTabNavigator} />
        <Tab.Screen name={pedidosName} component={PedidosScreen} />
      </Tab.Navigator>
      ) : (
        <LoginScreen name={loginName} onLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
}