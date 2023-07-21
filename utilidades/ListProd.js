
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

 const ListProd = ({item}) =>{
    
    const {nombre , precio, marca }= item

    return (
         <View style={styles.container}>
            <TouchableOpacity style={styles.Textimput}> marca:{nombre} 
             valor:{precio} 
             precio:{ marca}</TouchableOpacity>
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

