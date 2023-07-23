import React from "react";
import { View, Text, StyleSheet,FlatList } from "react-native";
import ListProd from "../../utilidades/ListProd";
import { ScrollView } from "react-native-web";

const ListPedido = () =>{
    const productosExample = [
        {
            nombre: 'maruchan',
            id: '0001',
            precio: '1500',
            marca: 'sexo',
        }, {
            nombre: 'maruchan de Pollo',
            id: '001',
            precio: '1500',
            marca: 'sexo',
        },
        {
            nombre: 'maruchan de Carne',
            id: '002',
            precio: '1500',
            marca: 'sexo',
        },
        {
            nombre: 'maruchan Vegano',
            id: '003',
            precio: '1500',
            marca: 'sexo',
        }
    ];
   return (
    <ScrollView>
        <View styles={styles.container}>
          <View style={styles.container} >
               <Text style={{padding:10, justifyContent: 'center'} }>Pedidos Example</Text>
               <FlatList  data= {productosExample}
              keyExtractor = {(item) => item.id}
              renderItem = {({ item, index }) => <ListProd item={item}/>}
             />
          </View> 
        </View>
    </ScrollView>
        
       
   );
}
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