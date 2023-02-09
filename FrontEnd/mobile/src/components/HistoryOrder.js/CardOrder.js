import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import stylesCard from '../home/card/style';
import { ScrollView } from 'react-native-gesture-handler';
import COLOR from '../../res/color';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';

function CardOrder(props) {
    const tour = props.tour;
    const tourOrder = props.tourOrder;

    const [isExpanded, setIsExpanded] = useState(true);
    return (
        <View>
            <Text style={styles.title}>Ngày {tourOrder.orderDateTime}</Text>
            <View style={[stylesCard.card2, { height: 140 }]}>
                <Image source={{ uri: `${tour.imageUrl}` }} style={stylesCard.img2} />

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
                            {tour.startDate} -- {tour.totalDay} ngày
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', margin: 5 }}>
                        <FontAwesome name="dollar" size={20} color="#FFFF" style={{ marginLeft: 10 }} />
                        <Text style={stylesCard.txt1}>{tour.price} VND</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons name="place" size={20} color="#FFFF" style={{ marginLeft: 10 }} />
                            <Text style={stylesCard.txt1}>{tour.tourDestination}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#FFD336',
                            borderRadius: 20,
                            width: 80,
                            height: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 10,
                        }}
                    >
                        <Text style={{ color: '#FFFFFF', fontSize: 12 }}>{tour.state}</Text>
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
                    <Text style={styles.content}>Tổng tiền: {tourOrder?.totalMoney}</Text>
                    <Text style={styles.content}>Ghi chú: {tourOrder?.note}</Text>
                    <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Cập nhật</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLOR.primary, //'#FFD336',
                                borderRadius: 20,
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
                                })
                            }
                        >
                            <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Cập nhật</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'red',
                                borderRadius: 20,
                                width: 80,
                                height: 30,
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 10,
                            }}
                        >
                            <Text style={{ color: '#FFFFFF', fontSize: 12 }}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
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
