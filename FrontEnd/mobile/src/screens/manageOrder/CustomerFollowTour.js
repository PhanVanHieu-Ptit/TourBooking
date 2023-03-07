import React, { useEffect, useContext, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';
import MyTourCard from '../../components/allTour/Card';
import Find from '../../components/home/find';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import stylesButton from '../../components/general/actionButton/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import stylesAllTour from '../allTour/style';
import CardStaff from '../../components/mange/CardStaff';
import SelectDropdown from 'react-native-select-dropdown';
import { AppContext } from '../../../App';
import * as request from '../../services/untils';
import API from '../../res/string';

function CustomerFollowTour({ navigation }) {
    const { user, listOrder, setListOrder } = useContext(AppContext);
    const [selected, setSelected] = useState('Tất cả');
    const [listStatus, setListStatus] = useState(['Tất cả']);

    useEffect(() => {
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

        getStatus();
    }, []);

    async function getStatus() {
        await request
            .get(API.listStatus + '?type=tourorder')
            .then((response) => {
                console.log(response.data);

                if (response.status == true) {
                    setListStatus(listStatus.concat(response.data));
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

    useEffect(() => {
        if (!(user == '' || user == undefined || user == null)) {
            filterData();
            console.log('listStatus: ', listStatus);
        }
    }, [selected]);

    function filterData() {
        request
            .get(API.historyOrder + '?status=' + selected, {
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
    const DATA = [
        {
            id: 1,
            name: 'Phan Văn Hiểu',
            imageUrl: 'https://img.freepik.com/free-photo/smiley-little-boy-isolated-pink_23-2148984798.jpg',
            email: '123@gmail.com',
            status: 'Đang hoạt động',
        },
        {
            id: 2,
            name: 'Nguyễn Văn A',
            imageUrl: 'https://img.freepik.com/free-photo/smiley-little-boy-isolated-pink_23-2148984798.jpg',
            email: '123@gmail.com',
            status: 'Khóa tài khoản',
        },
    ];
    return (
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            {/* <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginLeft: -20,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={stylesButton.btn_back}>
                        <Icon name="chevron-back" size={25} color="#021A5A" />
                    </View>
                </TouchableOpacity>
                <Text style={[stylesAllTour.title, { marginLeft: 10 }]}>Quản lý nhân viên</Text>
                <TouchableOpacity
                    style={[stylesAllTour.title, { marginLeft: 130 }]}
                    onPress={() => {
                        navigation.navigate('EditStaff');
                    }}
                >
                    <Icon name="add" size={25} color="#021A5A" />
                </TouchableOpacity>
            </View> */}
            <Find />
            <ScrollView>
                {DATA.map((item) => (
                    <CardStaff staff={item} key={item.id} navigation={navigation} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

export default CustomerFollowTour;
