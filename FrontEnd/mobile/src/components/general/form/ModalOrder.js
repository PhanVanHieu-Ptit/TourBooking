import React, { useState, useContext, useEffect } from 'react';
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
    ScrollView,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stylesModal from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import stylesButton from '../actionButton/styles';
import stylesCard from '../../home/card/style';
import COLOR from '../../../res/color';
import { formatDate, formatMoney } from '../../../res/untils';
import { AppContext } from '../../../../App';
import * as request from '../../../services/untils';
import API from '../../../res/string';

function ModalOrder(props) {
    const { user, setUser, setHistoryOrder, setToursOutStanding, setToursComming } = useContext(AppContext);
    const [inforCustomer, setInforCustomer] = useState({});
    const imageUrl = props.DATA.imageUrl[0];
    const [number, setNumber] = useState('');
    const [note, setNote] = useState('');

    useEffect(() => {
        console.log('getInforUser');
        getInforUser();
    }, [user]);

    function clearOldData() {
        setHistoryOrder([]);
        // setToursOutStanding([]);
        // setToursComming([]);
    }

    async function getRefreshToken() {
        try {
            const res2 = await request.post(API.refeshToken, { token: user.refreshToken });
            console.log('res2: ', res2);
            if (res2.data.status == true) {
                const newUser = {
                    id: user.id,
                    name: user.name,
                    imageUrl: user.imageUrl,
                    role: user.role,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    address: user.address,
                    accessToken: res2.data.data[0].token,
                    refreshToken: user.refreshToken,
                };
                //update user in side client
                setUser(newUser);

                //delete old user
                AsyncStorage.removeItem('user')
                    .then(() => {
                        console.log('user removed from AsyncStorage');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                console.log('user: ', newUser);
                AsyncStorage.setItem('user', JSON.stringify(newUser))
                    .then(() => console.log('Object stored successfully'))
                    .catch((error) => console.log('Error storing object: ', error));
                return true;
            } else {
                // Alert.alert('Thông báo!', res2.message + '', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
                console.log('res2.message: ', res2.data.message);
                if (res2.data.message == 'Refesh token không hợp lệ!') {
                    if (props.modalVisible) {
                        props.setModalVisible(!props.modalVisible);
                        setUser(null);
                        clearOldData();
                        //delete old user
                        AsyncStorage.removeItem('user')
                            .then(() => {
                                console.log('user removed from AsyncStorage');
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                        props.navigation.replace('Login');
                    }
                    props.setIsLogin(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
        return false;
    }

    async function getInforUser() {
        try {
            const res = await request.get(API.getInfor, { headers: { authorization: user.accessToken } });
            if (res.status === true) {
                setInforCustomer(res.data[0]);
            } else {
                if (res.message == 'Token đã hết hạn') {
                    getRefreshToken();
                } else {
                    Alert.alert('Thông báo!', res.message + '', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                    props.setModalVisible(!props.modalVisible);
                }}
            >
                <ScrollView>
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
                            <View style={{ width: 350 }}>
                                <Text style={[stylesModal.title, { fontSize: 18 }]}>Thời gian, địa điểm:</Text>
                                <Text style={[stylesModal.title, { fontWeight: 'normal' }]}>
                                    Ngày khởi hành: {formatDate(props.DATA.startDate)}
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[stylesModal.title]}>Địa điểm đón:</Text>
                                    <Text style={[stylesModal.title, { fontWeight: 'normal' }]}>
                                        {props.DATA.detailPickUpPoint}, {props.DATA.pickUpPoint}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[stylesModal.title]}>Địa điểm đến:</Text>
                                    <Text style={[stylesModal.title, { fontWeight: 'normal' }]}>
                                        {props.DATA.detailTourDestination}, {props.DATA.tourDestination}
                                    </Text>
                                </View>
                            </View>
                            <Text style={[stylesModal.title, { fontSize: 18 }]}>Thông tin khách hàng:</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    width: 350,
                                    alignItems: 'center',
                                }}
                            >
                                <Image
                                    source={{ uri: `${inforCustomer.imageUrl}` }}
                                    style={{ height: 50, width: 50, borderRadius: 50, marginLeft: 20 }}
                                />
                                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={[stylesModal.title]}>{inforCustomer.name}</Text>
                                        <Text style={[stylesModal.title, { fontWeight: 'normal' }]}>
                                            {'   ' + inforCustomer.phoneNumber}
                                        </Text>
                                    </View>
                                    <Text style={[stylesModal.title, { fontWeight: 'normal' }]}>
                                        {inforCustomer.address}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        props.setModalVisible(!props.modalVisible);
                                        props.navigation.navigate('Profile');
                                    }}
                                >
                                    <AntDesign
                                        name="edit"
                                        size={20}
                                        color={COLOR.primary}
                                        style={{ marginRight: 10 }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={[stylesModal.title, { marginLeft: -260, marginTop: 20 }]}>Số lượng</Text>
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
                                defaultValue={number}
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
                                defaultValue={note}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 350 }}>
                                <Text style={[stylesModal.title, { marginTop: 20 }]}>
                                    Đơn giá: {formatMoney(Number(props.DATA.price))}
                                </Text>
                                <Text style={[stylesModal.title, { marginTop: 20 }]}>
                                    {' '}
                                    Số lượng: x {Number(number)}
                                </Text>
                            </View>
                            <Text style={[stylesModal.title, { marginTop: 5 }]}>
                                Tạm tính: {formatMoney(Number(number) * Number(props.DATA.price))}
                            </Text>
                            <Text style={[stylesModal.title]}>Phí: {formatMoney(0)}</Text>
                            <Text style={[stylesModal.title, { marginTop: 5 }]}>
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
                </ScrollView>
            </Modal>
        </View>
    );
}

export default ModalOrder;
