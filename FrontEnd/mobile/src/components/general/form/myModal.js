import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import stylesModal from './styles';

function MyModal(props) {
    //   const [modalVisible, setModalVisible] = useState(props.modalVisible);
    return (
        <View style={stylesModal.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={stylesModal.centeredView}>
                    <View style={stylesModal.modalView}>
                        <Text style={stylesModal.modalText}>{props.title}</Text>
                        <Text>{props.content}</Text>
                        <Pressable
                            style={[stylesModal.button, stylesModal.buttonClose]}
                            onPress={() => {
                                props.setModalVisible(!props.modalVisible);
                                props.navigation.navigate('Login');
                            }}
                        >
                            <Text style={stylesModal.textStyle}>Đồng ý</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default MyModal;
