import React from 'react';
import {Image, Text, View} from 'react-native';
import stylesHeader from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

function Header() {
  return (
    <View style={stylesHeader.header}>
      <Icon name="notifications" size={25} color="#021A5A" />
      <View style={stylesHeader.view_info}>
        <View style={stylesHeader.view_txt}>
          <Text style={stylesHeader.title1}>Chào Bạn,</Text>
          <Text style={stylesHeader.title2}>Chúc bạn có chuyến đi vui vẻ!</Text>
        </View>
        <Image
          source={require('../../../res/svgs/anhcanhan.jpg')}
          style={stylesHeader.img}
        />
      </View>
    </View>
  );
}

export default Header;
