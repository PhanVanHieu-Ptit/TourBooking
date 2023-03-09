import React, { useState, useEffect, useContext } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import stylesCard from '../home/card/style';
import { ScrollView } from 'react-native-gesture-handler';
import COLOR from '../../res/color';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { formatDate, formatMoney } from '../../res/untils';
import { AppContext } from '../../../App';
import * as request from '../../services/untils';
import API from '../../res/string';

function CardOrder(props) {
    const { user, setHistoryOrder } = useContext(AppContext);
    const tour = props.item.tour;

    const tourOrder = props.item;

    const [isExpanded, setIsExpanded] = useState(true);
    const [colorState, setColorState] = useState('#FFD336');

    useEffect(() => {
        if (tourOrder.status.name === 'Đặt thành công') setColorState('#32DB61');
        else if (tourOrder.status.name === 'Đã hủy' || tourOrder.status.name === 'Chờ xã nhận hủy')
            setColorState('#E70303');
        else if (tourOrder.status.name === 'Hoàn thành' || tourOrder.status.name === 'Đang sử dụng')
            setColorState('#32DB61');
    }, []);

    function cancel(comand) {
        request
            .postPrivate(
                API.tourOrder + tourOrder.idTourOrder + comand,
                { id: tourOrder.idTourOrder },
                { 'Content-Type': 'application/json', authorization: user.accessToken },
                'PATCH',
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

    return (
        <View>
            <Text style={styles.title}>Ngày {formatDate(tourOrder.orderDateTime)}</Text>
            <View style={[stylesCard.card2, { height: 140 }]}>
                <Image source={{ uri: `${tour.tourpictures[0].imageUrl}` }} style={stylesCard.img2} />

                <View>
                    <View style={{ flexDirection: 'row', margin: 5 }}>
                        <Text style={stylesCard.txt3}>{tour.name}</Text>
                        <View style={stylesCard.viewStar}>
                            <Text style={{ color: '#FFFF' }}>5</Text>
                            <Icon name="star" size={15} color="#FFD336" style={{ marginTop: 2 }} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', margin: 5 }}>
                        <AntDesign name="calendar" size={20} color="#FFFF" style={{ marginLeft: 10 }} />
                        <Text style={stylesCard.txt1}>
                            {formatDate(tour.startDate)} -- {tour.totalDay} ngày
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', margin: 5 }}>
                        <FontAwesome name="dollar" size={20} color="#FFFF" style={{ marginLeft: 10 }} />
                        <Text style={stylesCard.txt1}>{formatMoney(tour.price)}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name="place" size={20} color="#FFFF" style={{ marginLeft: 10 }} />
                            <Text style={stylesCard.txt1}>{tour.tourDestination}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor: colorState,
                            borderRadius: 20,
                            width: 100,
                            height: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 10,
                        }}
                    >
                        <Text style={{ color: '#FFFFFF', fontSize: 12 }}>{tourOrder.status.name}</Text>
                    </View>
                </View>
            </View>

            <Collapse>
                <CollapseHeader
                    style={{ alignItems: 'center' }}
                    onPress={() => {
                        setIsExpanded(!isExpanded);
                        console.log('click!');
                    }}
                >
                    {isExpanded == true ? (
                        <MaterialIcons name="expand-more" size={25} color={COLOR.primary} style={{ marginLeft: 10 }} />
                    ) : (
                        <MaterialIcons name="expand-less" size={25} color={COLOR.primary} style={{ marginLeft: 10 }} />
                    )}
                </CollapseHeader>
                <CollapseBody>
                    <Text style={styles.title}>Thông tin đơn đặt</Text>
                    <Text style={styles.content}>Số lượng: {tourOrder?.quantity}</Text>
                    <Text style={styles.content}>Tổng tiền: {formatMoney(tourOrder?.totalMoney)}</Text>
                    <Text style={styles.content}>Ghi chú: {tourOrder?.note}</Text>

                    {tourOrder.status.name == 'Chờ xác nhận đặt' ? (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLOR.primary, //'#FFD336',
                                    borderRadius: 10,
                                    width: 80,
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 10,
                                }}
                                onPress={() =>
                                    props.navigation.navigate('DetailHistoryOrder', {
                                        tour: tour,
                                        tourOrder: tourOrder,
                                        status: 'update',
                                    })
                                }
                            >
                                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Cập nhật</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'red',
                                    borderRadius: 10,
                                    width: 80,
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 10,
                                }}
                                onPress={() => {
                                    Alert.alert('Thông báo!', 'Bạn có chắc chắn muốn hủy không?', [
                                        {
                                            text: 'Có',
                                            onPress: () => {
                                                cancel('/customer-cancel');
                                            },
                                        },
                                        { text: 'Không', onPress: () => {} },
                                    ]);
                                }}
                            >
                                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        ''
                    )}

                    {tourOrder.status.name == 'Đặt thành công' ? (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: 'red',
                                    borderRadius: 10,
                                    width: 80,
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 10,
                                }}
                                onPress={() => {
                                    Alert.alert(
                                        'Thông báo!',
                                        'Bạn sẽ mất phí để hủy. Bạn có chắc chắn muốn yêu cầu hủy không?',
                                        [
                                            {
                                                text: 'Có',
                                                onPress: () => {
                                                    cancel('/customer-need-cancel');
                                                },
                                            },
                                            { text: 'Không', onPress: () => {} },
                                        ],
                                    );
                                }}
                            >
                                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Yêu cầu hủy</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        ''
                    )}

                    {tourOrder.status.name == 'Đã hủy' ? (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLOR.primary, //'#FFD336',
                                    borderRadius: 10,
                                    width: 80,
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 10,
                                }}
                                onPress={() =>
                                    props.navigation.navigate('DetailHistoryOrder', {
                                        tour: tour,
                                        tourOrder: tourOrder,
                                        status: 'order',
                                    })
                                }
                            >
                                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Đặt lại</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        ''
                    )}
                </CollapseBody>
            </Collapse>
            <View style={{ borderBottomWidth: 2, borderBottomColor: COLOR.primary }} />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Ubuntu',
        fontSize: 16,
        fontWeight: 'bold',
        color: COLOR.primary,
        marginLeft: 20,
    },
    content: {
        fontFamily: 'Ubuntu',
        fontSize: 14,
        color: COLOR.primary,
        marginLeft: 20,
    },
});

export default CardOrder;
