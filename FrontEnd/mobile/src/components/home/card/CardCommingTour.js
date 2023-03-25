import React, { useContext, useState, useEffect } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import stylesCard from './style';
import { formatDate, formatDateWithHour, formatMoney } from '../../../res/untils';
import { AppContext } from '../../../../App';
import { Collapse, CollapseHeader, CollapseBody, AccordionList } from 'accordion-collapse-react-native';
import COLOR from '../../../res/color';

function CardCommingTour(props) {
    const { user, isLogin } = useContext(AppContext);
    const [colorState, setColorState] = useState('#FFD336');
    const tour = props.tour;
    // const imageUrl = tour.image_list.split(',')[0];
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        if (tour.status.name === 'Đã hủy') setColorState('#E70303');
        else if (tour.status.name === 'Đã hoàn thành') setColorState('#32DB61');
    }, [tour.status.name]);

    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate(props.screen, { tour: tour, type: 'edit' });
                }}
            >
                <View style={[stylesCard.card2, { elevation: 10 }]}>
                    <Image source={{ uri: `${tour.imageUrl[0]}` }} style={stylesCard.img2} />

                    <View>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <Text style={stylesCard.txt3} numberOfLines={2}>
                                {tour.name}
                            </Text>
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
                        {isLogin && user?.role != 'customer' ? (
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
                                <Text style={{ color: '#FFFFFF', fontSize: 12 }}>{tour.status.name}</Text>
                            </View>
                        ) : (
                            ''
                        )}
                    </View>
                </View>
            </TouchableOpacity>
            {isLogin && user?.role == 'admin' ? (
                <View>
                    <Collapse>
                        <CollapseHeader
                            style={{ alignItems: 'center' }}
                            onPress={() => {
                                setIsExpanded((preState) => {
                                    return !preState;
                                });
                                console.log('click!');
                            }}
                        >
                            {isExpanded == true ? (
                                <MaterialIcons
                                    name="expand-more"
                                    size={25}
                                    color={COLOR.primary}
                                    style={{ marginLeft: 10 }}
                                />
                            ) : (
                                <MaterialIcons
                                    name="expand-less"
                                    size={25}
                                    color={COLOR.primary}
                                    style={{ marginLeft: 10 }}
                                />
                            )}
                        </CollapseHeader>
                        <CollapseBody>
                            <Text style={styles.title}>Thông tin chi tiết</Text>

                            <Text style={[styles.content, { fontWeight: 'bold' }]}>Nhân viên tạo</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    // borderWidth: 1,
                                    // borderRadius: 5,
                                    width: 350,
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    marginBottom: 10,
                                }}
                            >
                                <View>
                                    <Text style={styles.content}>Tên: {tour?.staffCreate?.name}</Text>
                                    <Text style={styles.content}>Email: {tour?.staffCreate?.email}</Text>
                                    <Text style={styles.content}>
                                        Thời gian tạo: {formatDateWithHour(tour?.dateCreate)}
                                    </Text>
                                </View>
                                <Image
                                    source={{ uri: `${tour?.staffCreate?.imageUrl}` }}
                                    style={{ height: 50, width: 50, borderRadius: 50, marginLeft: 20 }}
                                />
                            </View>

                            {tour.idStatus == 2 ? (
                                <View>
                                    <Text style={[styles.content, { fontWeight: 'bold' }]}>Nhân viên hủy</Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            // borderWidth: 1,
                                            // borderRadius: 5,
                                            width: 350,
                                            alignItems: 'center',
                                            justifyContent: 'space-around',
                                            marginBottom: 10,
                                        }}
                                    >
                                        <View>
                                            <Text style={styles.content}>Tên: {tour?.staffCancel?.name}</Text>
                                            <Text style={styles.content}>Email: {tour?.staffCancel?.email}</Text>
                                            <Text style={styles.content}>
                                                Thời gian hủy: {formatDateWithHour(tour?.dateCancel)}
                                            </Text>
                                        </View>
                                        <Image
                                            source={{ uri: `${tour?.staffCancel?.imageUrl}` }}
                                            style={{ height: 50, width: 50, borderRadius: 50, marginLeft: 20 }}
                                        />
                                    </View>
                                </View>
                            ) : (
                                ''
                            )}
                        </CollapseBody>
                    </Collapse>
                    <View style={{ borderBottomWidth: 2, borderBottomColor: COLOR.primary }} />
                </View>
            ) : (
                ''
            )}
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

export default CardCommingTour;
