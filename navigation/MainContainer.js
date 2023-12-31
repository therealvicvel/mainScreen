//Importaciones necesarias
import React, { useState } from "react";
import { View, Text, TouchableOp, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
//Importaciones de otras pantallas
import NuevoPedido from "./screens/NuevoPedido";
import ListPedido from "./screens/ListPedidos";
import ListClientes from "./screens/ListClientes";
import AddClientesScreen from "./screens/AddClientesScreen";
import styles from "../utilidades/styles";
import LoginScreen from "./screens/Login";

//Variables con nombres de las demás pantallas
const homeName = 'Pedidos';
const pedidosName = 'Nuevo pedido';
const clientesName = 'Clientes';
const loginName = 'Login';
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();


export default function MainContainer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para verificar si el usuario está autenticado

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  // Función para manejar la salida (logout)
  const handleLogout = () => {
    setIsLoggedIn(false);
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
                iconName = focused ? "clipboard" : "clipboard-outline";
              } else if (rn === clientesName) {
                iconName = focused ? "person" : "person-outline";
              } else if (rn === pedidosName) {
                iconName = focused ? "cart" : "cart-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name={homeName}
            component={ListPedido}
            options={{
              headerRight: () => (
                <TouchableOpacity
                onPress={handleLogout} 
                style={{ marginRight: 15 }}
              >
                <Ionicons name="exit" size={30} color="#004187" />
                  <Text style={styles.colorTextButtonSalir}>Salir</Text>
              </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name={clientesName}
            component={ListClientes}
            options={{
              headerRight: () => (
                <TouchableOpacity
                onPress={handleLogout} 
                  style={{ marginRight: 15 }}
                >
                  <Ionicons name="exit" size={30} color="#004187" />
                  <Text style={styles.colorTextButtonSalir}>Salir</Text>
                </TouchableOpacity>
              ),
            }}
          />
          <Tab.Screen
            name={pedidosName}
            component={NuevoPedido}
            options={{
              headerRight: () => (
                <TouchableOpacity
                  onPress={handleLogout} 
                  style={{ marginRight: 15 ,alignItems:'center'}}
                >
                  <Ionicons name="exit" size={30} color="#004187" />
                  <Text style={styles.colorTextButtonSalir}>Salir</Text>
                </TouchableOpacity>
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
        <LoginScreen name={loginName} onLogin={handleLogin} />
      )}
    </NavigationContainer>
  );

}