import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import stylesButton from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

function ButtonBack({ navigation, props }) {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(`${props?.screen}`);
            }}
        >
            <View style={stylesButton.btn_back}>
                <Icon name="chevron-back" size={25} color="#021A5A" />
            </View>
        </TouchableOpacity>
    );
}

export default ButtonBack;
