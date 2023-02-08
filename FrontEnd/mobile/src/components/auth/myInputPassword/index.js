import React from 'react';
import { TextInput } from 'react-native';
import stylesMyInput from '../styles';

function MyInputPassWord(props) {
    console.log(props);
    return (
        <TextInput
            secureTextEntry={true}
            style={stylesMyInput.input}
            placeholder={props.placeholder}
            onChangeText={(newText) => {
                props?.setPassword(newText);
            }}
        />
    );
}

export default MyInputPassWord;
