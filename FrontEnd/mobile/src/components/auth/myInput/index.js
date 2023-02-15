import React from 'react';
import { TextInput } from 'react-native';
import stylesMyInput from '../styles';

function MyInput(props) {
    return (
        <TextInput
            style={stylesMyInput.input}
            placeholder={props.placeholder}
            onChangeText={(newText) => {
                props?.setUsername(newText);
            }}
        />
    );
}

export default MyInput;
