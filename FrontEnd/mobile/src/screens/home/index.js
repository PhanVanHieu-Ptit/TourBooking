import React, { useEffect, useState, useContext } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import Find from '../../components/home/find';
import Header from '../../components/home/header';
import stylesHome from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import COLOR from '../../res/color';
import { CardCommingTour, CardNewTour } from '../../components/home/card';
import stylesFind from '../../components/home/find/styles';
import { AppContext } from '../../../App';
import request from '../../services/untils';
import API from '../../res/string';

function Home({ navigation }) {
    const { toursOutStanding, setToursOutStanding, toursComing, setToursComming } = useContext(AppContext);
    useEffect(() => {
        request
            .get(API.toursOutStanding)
            .then((response) => {
                console.log(response.data);

                if (response.data.status == true) {
                    setToursOutStanding(response.data.data);
                } else {
                    Alert.alert('Thông báo!', response.data.message + '', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        request
            .get(API.toursComing)
            .then((response) => {
                console.log(response.data);

                if (response.data.status == true) {
                    setToursComming(response.data.data);
                } else {
                    Alert.alert('Thông báo!', response.data.message + '', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    // const DATA = [
    //     {
    //         id: 1,
    //         name: 'Biển Ngọc',
    //         tourDestination: 'Phú Quốc',
    //         startDate: '25/01/2023',
    //         totalDay: '2',
    //         price: '1500',
    //         imageUrl:
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
    //         descript: 'Chuyen di thu vi',
    //         pickUpPoint: 'TP. Hồ Chí Minh',
    //         quantity: '10',
    //         listImage: [
    //             {
    //                 id: 1,
    //                 imageUrl: 'https://file1.dangcongsan.vn/data/0/images/2021/11/10/anhdv/tien-giang-10-11.jpg',
    //             },
    //             {
    //                 id: 2,
    //                 imageUrl: 'https://cdn3.ivivu.com/2022/06/ti%E1%BB%81n-giang.jpg',
    //             },
    //         ],
    //     },
    //     {
    //         id: 2,
    //         name: 'Biển Den',
    //         tourDestination: 'Phú Quốc',
    //         startDate: '25/01/2023',
    //         totalDay: '2',
    //         price: '1500',
    //         imageUrl:
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
    //     },
    //     {
    //         id: 3,
    //         name: 'Biển Do',
    //         tourDestination: 'Phú Quốc',
    //         startDate: '25/01/2023',
    //         totalDay: '2',
    //         price: '1500',
    //         imageUrl:
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
    //     },
    // ];

    return (
        <ScrollView>
            <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <StatusBar translucent={false} backgroundColor={COLOR.primary} />
                <Header />
                {/* find */}
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AllTour', { isFind: true });
                    }}
                >
                    <View style={stylesFind.view}>
                        <View style={stylesFind.first_component}>
                            <Icon name="search" size={25} color="#021A5A" />
                            <Text>Bạn đang muốn đi đâu ...</Text>
                        </View>
                        {/* <Icon name="filter" size={25} color="#021A5A" /> */}
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('AllTour', { isFind: false });
                        }}
                    >
                        <View style={stylesHome.txt1}>
                            <Text style={{ color: COLOR.primary }}>Xem tất cả </Text>
                            <Icon name="chevron-forward" size={15} color={COLOR.primary} style={{ marginTop: 2 }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={stylesHome.txt2}>Các tour nổi bật</Text>
                    </View>
                    <FlatList
                        horizontal
                        // style={{flex: 1}}
                        data={toursOutStanding}
                        renderItem={({ item }) => <CardNewTour props={item} navigation={navigation} />}
                        keyExtractor={(item) => item.idTour}
                    />
                    <View style={{ marginTop: 50 }}>
                        <Text style={stylesHome.txt2}>Các tour sắp diễn ra</Text>
                    </View>
                    {toursComing.map((item) => (
                        <CardCommingTour tour={item} key={item.idTour} navigation={navigation} screen="DetailTour" />
                    ))}
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default Home;
