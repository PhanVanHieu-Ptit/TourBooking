import React, { useState, useContext } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Pressable,
    View,
    ImageBackground,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import stylesModal from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import stylesButton from '../actionButton/styles';
import stylesCard from '../../home/card/style';
import COLOR from '../../../res/color';
import { formatDate, formatMoney } from '../../../res/untils';
import { AppContext } from '../../../../App';
import * as request from '../../../services/untils';
import API from '../../../res/string';

function ModalOrder(props) {
    const { user, setHistoryOrder } = useContext(AppContext);
    const imageUrl = props.DATA.imageUrl[0];
    const [number, setNumber] = useState('');
    const [note, setNote] = useState('');

    async function checkExistOrderBefore() {
        try {
            const response = await request.get(
                API.numberOrderOfCustomer + '?idCustomer=' + user.id + '&idTour=' + props.DATA.idTour,
                {
                    // params: { idCustomer: user.id, idTour: props.DATA.idTour },
                    headers: { 'Content-Type': 'application/json', authorization: user.accessToken },
                },
            );
            console.log('response: ', response);
            if (response.status == true) {
                if (Number(response.data[0].currentNumber) > 0) {
                    Alert.alert(
                        'Thông báo!',
                        'Bạn đã có một đơn đặt cho tour này, bạn có chắc chắn muốn đặt thêm không!',
                        [
                            { text: 'Có', onPress: () => order() },
                            { text: 'Không', onPress: () => {} },
                        ],
                    );
                } else {
                    order();
                }
            } else {
                Alert.alert('Đặt thất bại!', response.message, [{ text: 'OK', onPress: () => {} }]);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const order = () => {
        request
            .postPrivate(
                API.order,
                {
                    // idCustomer: user.id,
                    idTour: props.DATA.idTour,
                    quantity: number,
                    note: note,
                    // totalMoney: Number(number) * Number(props.DATA.price),
                },
                { 'Content-Type': 'application/json', authorization: user.accessToken },
            )
            .then((response) => {
                console.log(response.data);

                if (response.data.status == true) {
                    setNumber('');
                    setNote('');
                    updateListTourOrder();
                    Alert.alert('Thông báo!', 'Đặt thành công!', [
                        { text: 'OK', onPress: () => props.setModalVisible(!props.modalVisible) },
                    ]);
                } else {
                    Alert.alert('Đặt thất bại!', response.data.message, [{ text: 'OK', onPress: () => {} }]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    function updateListTourOrder() {
        request
            .get(API.historyOrder + '?id=' + user.id, {
                headers: { 'Content-Type': 'application/json', authorization: user.accessToken },
            })
            .then((response) => {
                console.log('response.data:', response.data);

                if (response.status == true) {
                    setHistoryOrder(response.data);
                } else {
                    Alert.alert('Thông báo!', response.message + '', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <View style={stylesModal.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    // setModalVisible(!modalVisible);
                }}
            >
                <View style={stylesModal.centeredView}>
                    <View style={stylesModal.modalView}>
                        <ImageBackground
                            source={{ uri: `${imageUrl}` }}
                            style={{
                                borderRadius: 20,
                                height: 200,
                                width: 350,
                                margin: 10,
                                overflow: 'hidden',
                                marginTop: -20,
                            }}
                        >
                            <View style={{ marginTop: 120 }}>
                                <Text style={[stylesCard.txt1, { fontSize: 24 }]}>{props.DATA.name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <MaterialIcons
                                        name="place"
                                        size={18}
                                        color="#FFFF"
                                        style={{ marginLeft: 10, marginTop: 3 }}
                                    />
                                    <Text style={[stylesCard.txt2, { fontSize: 18 }]}>
                                        {props.DATA.tourDestination}
                                    </Text>
                                </View>
                            </View>
                        </ImageBackground>
                        <Text style={stylesModal.title}>Ngày khởi hành: {formatDate(props.DATA.startDate)}</Text>
                        <Text style={[stylesModal.title, { marginLeft: -260 }]}>Số lượng</Text>
                        <TextInput
                            placeholder="Nhập số lượng ở đây ..."
                            keyboardType="numeric"
                            style={{
                                borderWidth: 2,
                                borderColor: COLOR.primary,
                                borderRadius: 10,
                                width: 340,
                                height: 60,
                            }}
                            onChangeText={(newText) => {
                                setNumber(newText);
                            }}
                            value={number}
                        />
                        <Text style={[stylesModal.title, { marginLeft: -260, marginTop: 20 }]}>Ghi chú</Text>
                        <TextInput
                            placeholder="Nhập nội dung cần ghi chú ..."
                            style={{
                                borderWidth: 2,
                                borderColor: COLOR.primary,
                                borderRadius: 10,
                                width: 340,
                                height: 100,
                            }}
                            onChangeText={(newText) => {
                                setNote(newText);
                            }}
                            value={note}
                        />
                        <Text style={[stylesModal.title, { marginTop: 20 }]}>
                            Tổng tiền: {formatMoney(Number(number) * Number(props.DATA.price))}
                        </Text>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <Pressable
                                style={[stylesModal.button, stylesModal.buttonClose, { backgroundColor: 'red' }]}
                                onPress={() => props.setModalVisible(!props.modalVisible)}
                            >
                                <Text style={stylesModal.textStyle}>Hủy bỏ</Text>
                            </Pressable>
                            <Pressable
                                style={[stylesModal.button, stylesModal.buttonClose, { marginLeft: 10 }]}
                                onPress={() => {
                                    checkExistOrderBefore();
                                }}
                            >
                                <Text style={stylesModal.textStyle}>Xác nhận</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default ModalOrder;