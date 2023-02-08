import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import stylesCard from '../../components/home/card/style';
import stylesButton from '../../components/general/actionButton/styles';
import COLOR from '../../res/color';
import stylesDetailTour from './styles';
import ModalOrder from '../../components/general/form/ModalOrder';

function DetailTourScreen({ route, navigation }) {
    const tour = route.params.tour;
    // const DATA = {
    //   id: 1,
    //   name: 'Biển Ngọc',
    //   tourDestination: 'Phú Quốc',
    //   startDate: '25/01/2023',
    //   totalDay: '2',
    //   price: '15000000',
    //   descript: 'Chuyến đi thú vị',
    //   imageUrl:
    //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
    // };
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ScrollView>
            <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
                <ModalOrder modalVisible={modalVisible} setModalVisible={setModalVisible} DATA={tour} />
                <ImageBackground
                    source={{ uri: `${tour.imageUrl}` }}
                    style={{
                        borderRadius: 20,
                        height: 320,
                        width: 350,
                        margin: 10,
                        overflow: 'hidden',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <View style={stylesButton.btn_back}>
                            <Icon name="chevron-back" size={25} color="#021A5A" />
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginTop: 150 }}>
                        <Text style={[stylesCard.txt1, { fontSize: 24 }]}>{tour.name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <MaterialIcons
                                name="place"
                                size={18}
                                color="#FFFF"
                                style={{ marginLeft: 10, marginTop: 3 }}
                            />
                            <Text style={[stylesCard.txt2, { fontSize: 18 }]}>{tour.tourDestination}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View
                    style={{
                        width: 320,
                    }}
                >
                    <Text style={stylesDetailTour.title}>Tóm tắt chuyến đi</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Fontisto name="clock" size={25} color={COLOR.primary} />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={stylesDetailTour.title2}>Thời gian</Text>
                                <Text style={stylesDetailTour.txt}>{tour.totalDay} ngày</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="star" size={30} color="#FFD336" style={{ marginTop: 2 }} />
                            <View style={{ marginLeft: 5 }}>
                                <Text style={stylesDetailTour.title2}>Đánh giá</Text>
                                <Text style={stylesDetailTour.txt}>5.0</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <Text style={[stylesDetailTour.title, { marginTop: 30 }]}>Mô tả</Text>
                        <Text>{tour.descript}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: 150,
                            justifyContent: 'space-between',
                        }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[stylesDetailTour.txt, { fontSize: 24 }]}>{tour.price} VNĐ</Text>
                            <Text style={{ marginTop: 10 }}>/ chuyến</Text>
                        </View>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <View style={stylesDetailTour.btn}>
                                <Text style={stylesDetailTour.txt_btn}>Đặt ngay</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default DetailTourScreen;
