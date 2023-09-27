//Importaciones necesarias
import React, { useState } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import BuscarCliente from "../utilidades/BuscarCliente";

//Importaciones de otras pantallas
import HomeScreen from "./screens/HomeScreen";
import InventarioScreen from "./screens/InventarioScreen";
import ListClientes from "./screens/ListClientes";
import PedidosScreen from "./screens/PedidosScreen";
import { ScrollView } from "react-native-gesture-handler";
import AddClientesScreen from "./screens/AddClientesScreen";
import AddProductoScreen from "./screens/AddProductoScreen";
import styles from "../utilidades/styles";
import InventarioScreenPrueba from "./screens/InventarioScreenPrueba";
import LoginScreen from "./screens/Login";
//Variables con nombres de las demás pantallas

const homeName = 'Inicio';
const pedidosName = 'Pedidos';
const inventarioName = 'Inventario';
const clientesName = 'Clientes';
const listName = 'Listado de clientes';
const addProductoName = 'Agregar producto';

const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const InventarioTopTabNavigator = () => (
  <TopTab.Navigator>
    <TopTab.Screen name="Productos" component={InventarioScreenPrueba} />
    <TopTab.Screen name="Agregar producto" component={AddProductoScreen} />
  </TopTab.Navigator>
);

const ClientesTopTabNavigator = () => (
  <TopTab.Navigator>
    <TopTab.Screen name="Listado" component={MiniScreenClientes} />
    <TopTab.Screen name="Agregar nuevo cliente" component={AddClientesScreen} />
  </TopTab.Navigator>
);

const MiniScreenClientes = () => (
  <View style={styles.container}>
    <ListClientes />
  </View>
);

const MiniScreenAddClientes = () => (
  <View>
    <AddClientesScreen />
  </View>
);

const MiniScreenAddProducto = () => (
  <View>
    <AddProductoScreen />
  </View>
);

const MiniScreenInventario = () => (
  <View>
    <InventarioScreen />
  </View>
);

export default function MainContainer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está autenticado

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación
    // Por ahora, simplemente establecemos el estado isLoggedIn a true
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
        <LoginScreen onLogin={handleLogin} />
      )}
    </NavigationContainer>
  );
}