import { useState } from 'react';
import { FlatList, View, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
import React from 'react';

const listagod = () => {
    const [data, setData] = useState([
      { id: '1', label: 'Elemento 1', checked: false, textInputValue: '' },
      { id: '2', label: 'Elemento 2', checked: false, textInputValue: '' },
      { id: '3', label: 'Elemento 3', checked: false, textInputValue: '' },
    ]);
  
    const handleCheckBoxToggle = (itemId) => {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === itemId ? { ...item, checked: !item.checked } : item
        )
      );
    };
  
    const handleTextInputChange = (itemId, text) => {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === itemId ? { ...item, textInputValue: text } : item
        )
      );
    };
  
    const renderItem = ({ item }) => (
      <View style={{ flexDirection: 'row', alignItems: 'center',}}>
        <CheckBox
          title={item.label}
          checked={item.checked}
          onPress={() => handleCheckBoxToggle(item.id)}
        />
        <TextInput
          style={{ flex: 1, marginLeft: 10, borderWidth: 1, padding: 5 }}
          placeholder=" "
          value={item.textInputValue}
          onChangeText={(text) => handleTextInputChange(item.id, text)}
        />
      </View>
    );
  
    return (
      <View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.label}
        />
      </View>
    );
  };
  
  export default listagod;
  