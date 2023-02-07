import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import stylesButton from './styles';

function MyButton1(props) {
    return (
        <TouchableOpacity
            onPress={() => {
                props?.refreshPassword();
            }}
        >
            <View style={stylesButton.btn}>
                <Text style={stylesButton.btn_txt}>{props.content}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default MyButton1;
