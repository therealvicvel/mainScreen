
 import React from "react";
 import { View, Text, StyleSheet } from "react-native";


 const ListProd = ({item}) =>{
    const {id, nombre, precio, fecha,direccion,estado}= item;

    return (
        <View style={{padding: 10}}> 
            <View style={styles.Textimput}>
                <Text>id:{id}</Text>
                <Text>Cliente:{nombre}</Text>
                <Text>valor:{precio}</Text>
                <Text>fecha:{fecha}</Text>
                <Text>Direccion:{direccion}</Text>
                <Text>Estado: {estado}</Text>
            </View>
        </View>
         
        
    );
}



export default ListProd; 

 const styles = StyleSheet.create({
     container: {
         backgroundColor: 'a2f7fa',
         borderRadius: 10,
         padding: 10
     },
     Textimput: {
         borderColor: '#A3C669',
         borderWidth: 1,
         padding: 10,
         borderRadius: 10
     },
 })




