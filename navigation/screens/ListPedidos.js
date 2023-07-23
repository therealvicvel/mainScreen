import React from "react";
import { View, Text, StyleSheet,FlatList } from "react-native";
import ListProd from "../../utilidades/ListProd";
import { ScrollView } from "react-native-web";
///funcion de productos de ejemplo
const ListPedido = () =>{
    const productosExample = [
        {
            nombre: 'Doña Antonella',
            id: '0001',
            precio: '45000',
            fecha: '00/00/0000',
            direccion: 'Provenza',
            estado: 'Sin Entregar'
        }, {
            nombre: 'Marco Tienda',
            id: '001',
            precio: '30000',
            fecha: '00/00/0000',
            direccion: 'Luz de Salvacion',
            estado: 'Sin Entregar'
        },
        {
            nombre: 'Alejandra Carniceria',
            id: '002',
            precio: '5000',
            fecha: '00/00/0000',
            direccion: 'Dangond',
            estado: 'Entregado'
        },
        {
            nombre: 'Alex Adams',
            id: '003',
            precio: '74000',
            fecha: '00/00/0000',
            direccion: 'Cristal Alto',
            estado: 'Sin Entregar'
        }
    ];
    //lo que se ve
   return (
    <ScrollView>
        <View styles={styles.container}>
          <View style={styles.container} >
               <Text style={{padding:10, justifyContent: 'center'} }>Pedidos Example</Text>
               <FlatList  
               data= {productosExample}
              keyExtractor = {(item) => item.id}
              renderItem = {({ item, index }) => <ListProd item={item}/>}
             />
          </View> 
        </View>
    </ScrollView>
        
       
   );
}

//estilos pa que se vea bonito
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


export default ListPedido;