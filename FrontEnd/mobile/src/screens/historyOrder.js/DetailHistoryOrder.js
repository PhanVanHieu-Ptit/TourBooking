import React, { useState, useContext } from 'react';
import { SafeAreaView, Text, View, ImageBackground, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import stylesButton from '../../components/general/actionButton/styles';
import stylesAllTour from '../allTour/style';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import stylesCard from '../../components/home/card/style';
import stylesModal from '../../components/general/form/styles';
import COLOR from '../../res/color';
import { formatDate, formatMoney } from '../../res/untils';
import * as request from '../../services/untils';
import API from '../../res/string';
import { AppContext } from '../../../App';

function DetailHistoryOrder({ route, navigation }) {
    const { user, setHistoryOrder } = useContext(AppContext);
    const DATA = route.params.tour;
    const status = route.params.status;
    const [number, setNumber] = useState(route.params.tourOrder.quantity + '');
    const [note, setNote] = useState(route.params.tourOrder.note);

    function updateOrderTour() {
        request
            .postPrivate(
                API.tourOrder + route.params.tourOrder.idTourOrder + '/update',
                {
                    idTourOrder: route.params.tourOrder.idTourOrder,
                    idCustomer: user.id,
                    idTour: route.params.tour.idTour,
                    quantity: number,
                    note: note,
                    totalMoney: Number(number) * Number(DATA.price),
                },
                { 'Content-Type': 'application/json', authorization: user.accessToken },
                'PUT',
            )
            .then((response) => {
                console.log(response.data);

                if (response.data.status == true) {
                    updateListTourOrder();
                    Alert.alert('Thông báo!', 'Cập nhật thành công!', [{ text: 'OK', onPress: () => {} }]);
                } else {
                    Alert.alert('Cập nhật thất bại!', response.data.message, [{ text: 'OK', onPress: () => {} }]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

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
    const order = () => {
        if (number.length == 0) {
            Alert.alert('Thông báo!', 'Không được để trống số lượng!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        } else {
            request
                .postPrivate(
                    API.order,
                    {
                        idCustomer: user.id,
                        idTour: DATA.idTour,
                        quantity: number,
                        note: note,
                        totalMoney: Number(number) * Number(DATA.price),
                    },
                    { 'Content-Type': 'application/json', authorization: user.accessToken },
                )
                .then((response) => {
                    console.log('response.data: ', response.data);

                    // setNumber('');
                    // setNote('');
                    if (response.data.status == true) {
                        updateListTourOrder();
                        Alert.alert('Thông báo!', 'Đặt thành công!', [{ text: 'OK', onPress: () => {} }]);
                    } else {
                        Alert.alert('Đặt thất bại!', response.data.message, [{ text: 'OK', onPress: () => {} }]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    return (
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginLeft: -150,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={stylesButton.btn_back}>
                        <Icon name="chevron-back" size={25} color="#021A5A" />
                    </View>
                </TouchableOpacity>
                <Text style={stylesAllTour.title}>Chi tiết đơn đặt</Text>
            </View>
            <ImageBackground
                source={{ uri: `${DATA.imageUrl[0]}` }}
                style={{
                    borderRadius: 20,
                    height: 200,
                    width: 350,
                    margin: 10,
                    overflow: 'hidden',
                    // marginTop: -20,
                }}
            >
                <View style={{ marginTop: 120 }}>
                    <Text style={[stylesCard.txt1, { fontSize: 24 }]}>{DATA.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name="place" size={18} color="#FFFF" style={{ marginLeft: 10, marginTop: 3 }} />
                        <Text style={[stylesCard.txt2, { fontSize: 18 }]}>{DATA.tourDestination}</Text>
                    </View>
                </View>
            </ImageBackground>
            <Text style={stylesModal.title}>Ngày khởi hành: {formatDate(DATA.startDate)}</Text>
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
                Tổng tiền: {formatMoney(Number(number) * Number(DATA.price))}
            </Text>

            <TouchableOpacity
                style={{
                    width: 350,
                    height: 50,
                    justifyContent: 'center',
                    backgroundColor: COLOR.primary,
                    borderRadius: 20,
                }}
                onPress={() => {
                    if (status == 'update') updateOrderTour();
                    else if (status == 'order') order();
                }}
            >
                <Text style={stylesModal.textStyle}>Xác nhận</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default DetailHistoryOrder;
