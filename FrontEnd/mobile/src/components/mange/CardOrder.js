import React, { useEffect, useState, useContext } from 'react';
import { Image, Text, TouchableOpacity, View, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import stylesCard from '../home/card/style';
import { useLinkProps } from '@react-navigation/native';
import COLOR from '../../res/color';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import { formatDate, formatMoney, formatDateWithHour } from '../../res/untils';
import * as request from '../../services/untils';
import API from '../../res/string';
import { AppContext } from '../../../App';
import moment from 'moment';

function CardOrder({ props }) {
    const { user, listOrder, setListOrder } = useContext(AppContext);
    const [isExpanded, setIsExpanded] = useState(true);
    const [colorState, setColorState] = useState('#FFD336');
    const [fee, setFee] = useState(props.tour?.normalPenaltyFee);

    useEffect(() => {
        if (props.status.name === 'Đặt thành công') setColorState('#32DB61');
        else if (props.status.name === 'Đã hủy' || props.status.name === 'Chờ xã nhận hủy') setColorState('#E70303');
        else if (props.status.name === 'Hoàn thành' || props.status.name === 'Đang sử dụng') setColorState('#32DB61');

        if (props.status.name == 'Yêu cầu hủy') {
            const date1 = moment(props.tour.startDate); // ngày đầu tiên
            const date2 = moment(props.cancelDate); // ngày thứ hai

            const diffInDays = date1.diff(date2, 'days');
            console.log('diffInDays: ' + diffInDays);
            if (diffInDays < props.tour.minDate) setFee(props.tour.strictPenaltyFee);
            else setFee(props.tour.normalPenaltyFee);
        }
    }, [listOrder]);

    function updateStatusOrder(comand) {
        request
            .postPrivate(
                API.tourOrder + props.idTourOrder + comand,
                { id: props.idTourOrder },
                { 'Content-Type': 'application/json', authorization: user.accessToken },
                'PATCH',
            )
            .then((response) => {
                console.log(response.data);

                if (response.data.status == true) {
                    updateListOrder();
                    Alert.alert('Thông báo!', 'Cập nhật thành công!', [{ text: 'OK', onPress: () => {} }]);
                } else {
                    Alert.alert('Cập nhật thất bại!', response.data.message, [{ text: 'OK', onPress: () => {} }]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function updateListOrder() {
        request
            .get(API.historyOrder, {
                headers: { 'Content-Type': 'application/json', authorization: user.accessToken },
            })
            .then((response) => {
                console.log(response.data);

                if (response.status == true) {
                    setListOrder(response.data);
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
            <Text style={styles.title}>Ngày {formatDateWithHour(props.orderDateTime)}</Text>
            <TouchableOpacity>
                <View style={[stylesCard.card2, { height: 140 }]}>
                    <Image source={{ uri: `${props.tour.imageUrl[0]}` }} style={stylesCard.img2} />

                    <View>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <Text style={stylesCard.txt3}>{props.tour.name}</Text>
                            <View style={stylesCard.viewStar}>
                                <Text style={{ color: '#FFFF' }}>5</Text>
                                <Icon name="star" size={15} color="#FFD336" style={{ marginTop: 2 }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <AntDesign name="calendar" size={20} color="#FFFF" style={{ marginLeft: 10 }} />
                            <Text style={stylesCard.txt1}>
                                {formatDate(props.tour.startDate)} -- {props.tour.totalDay} ngày
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <FontAwesome name="dollar" size={20} color="#FFFF" style={{ marginLeft: 10 }} />
                            <Text style={stylesCard.txt1}>{formatMoney(props.tour.price)}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <MaterialIcons name="place" size={20} color="#FFFF" style={{ marginLeft: 10 }} />
                                <Text style={stylesCard.txt1}>{props.tour.tourDestination}</Text>
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
                            <Text style={{ color: '#FFFFFF', fontSize: 12 }}>{props.status.name}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

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
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Text style={styles.title}>Thông tin đơn đặt</Text>
                            <Text style={styles.content}>Họ tên: {props?.customer.name}</Text>
                            <Text style={styles.content}>Số điện thoại: {props?.customer.phoneNumber}</Text>
                            <Text style={styles.content}>Email: {props?.customer.email}</Text>
                            <Text style={styles.content}>Số lượng: {props?.quantity}</Text>
                            <Text style={styles.content}>
                                Tổng tiền: {formatMoney(props?.quantity * props?.tour.price)}
                            </Text>
                            <Text style={styles.content}>Ghi chú: {props?.note}</Text>
                        </View>
                        <Image source={{ uri: `${props?.customer.imageUrl}` }} style={stylesCard.img2} />
                    </View>

                    {props.status.name == 'Yêu cầu hủy' ? (
                        <View>
                            <View style={{ borderTopWidth: 1, borderTopColor: '#CBE4DE' }} />
                            <Text style={styles.content}>Thời gian yêu cầu: {formatDate(props.cancelDate)} </Text>
                            <Text style={styles.content}>Phí hủy: {fee} %</Text>
                            <Text style={styles.content}>
                                Mức hủy:
                                {formatMoney((fee * props?.quantity * props?.tour.price) / 100.0)}
                            </Text>
                        </View>
                    ) : (
                        ''
                    )}

                    {props.status.name == 'Chờ xác nhận đặt' ? (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLOR.primary,
                                    borderRadius: 10,
                                    width: 80,
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 10,
                                }}
                                onPress={() => {
                                    updateStatusOrder('/confirm');
                                }}
                            >
                                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Xác nhận</Text>
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
                                    Alert.alert(
                                        'Thông báo!',
                                        'Hành động này không thể hoàn tác. Bạn có thật sự muốn hủy không?',
                                        [
                                            {
                                                text: 'OK',
                                                onPress: () => {
                                                    updateStatusOrder('/cancel');
                                                },
                                            },
                                        ],
                                    );
                                }}
                            >
                                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        ''
                    )}

                    {props.status.name == 'Đặt thành công' ? (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLOR.primary,
                                    borderRadius: 10,
                                    width: 80,
                                    height: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    margin: 10,
                                }}
                                onPress={() => {
                                    updateStatusOrder('/confirm-using');
                                }}
                            >
                                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Đã đến điểm đón</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        ''
                    )}

                    {props.status.name == 'Yêu cầu hủy' ? (
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: COLOR.primary,
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
                                        'Hành động này không thể hoàn tác. Bạn có thật sự muốn xác nhận hủy không?',
                                        [
                                            {
                                                text: 'OK',
                                                onPress: () => {
                                                    updateStatusOrder('/confirm-cancel');
                                                },
                                            },
                                        ],
                                    );
                                }}
                            >
                                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Xác nhận hủy</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        ''
                    )}
                </CollapseBody>
            </Collapse>
            <View
                style={{
                    borderBottomWidth: 2,
                    borderBottomColor: COLOR.primary,
                    borderBottomLeftRadius: 20,
                    borderBottomEndRadius: 20,
                }}
            />
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
