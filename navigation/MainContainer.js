import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../estilos/styles";

//Screens
import HomeScreen from "./screens/HomeScreen"
import SettingsScreen from "./screens/PedidosScreen"
import DetailsScreen from "./screens/InventarioScreen"
import ClientesScreen from "./screens/ClientesScreen";
import ListClientes from "./screens/ListClientes";

//Screen names
const homeName = "Inicio";
const pedidosName = "Pedidos";
const inventarioName = "Inventario";
const clientesName = "Clientes";
const listName = "Listado de clientes";

const Tab = createBottomTabNavigator();


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
                <Tab.Screen name={pedidosName} component={SettingsScreen} />
                <Tab.Screen name={inventarioName} component={DetailsScreen} />
                <Tab.Screen name={clientesName} component={ClientesScreen} />
                <Tab.Screen name="ListClientes" component={ListClientes} options={{ tabBarButton: () => null, tabBarVisible: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}