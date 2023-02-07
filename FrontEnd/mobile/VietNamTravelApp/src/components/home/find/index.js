import React from 'react';
import {TextInput, View, Text} from 'react-native';
import stylesFind from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

function Find() {
  return (
    <View style={stylesFind.view}>
      <View style={stylesFind.first_component}>
        <Icon name="search" size={25} color="#021A5A" />
        <TextInput
          style={stylesFind.input}
          placeholder="Bạn đang muốn đi đâu ..."
        />
      </View>
      {/* <Icon name="filter" size={25} color="#021A5A" /> */}
    </View>
  );
}

export default Find;
