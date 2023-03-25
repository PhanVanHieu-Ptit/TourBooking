import React, { useContext, useState, useEffect } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Alert,
    ActivityIndicator,
    RefreshControl,
    Image,
} from 'react-native';
import Find from '../../components/home/find';
import Icon from 'react-native-vector-icons/Ionicons';
import stylesButton from '../../components/general/actionButton/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import stylesAllTour from '../allTour/style';
import CardStaff from '../../components/mange/CardStaff';
import { AppContext } from '../../../App';
import * as request from '../../services/untils';
import API from '../../res/string';
import COLOR from '../../res/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ManageStaffScreen({ navigation }) {
    const { user, setUser, setIsLogin, setHistoryOrder, setListTour, setListOrder, listStaff, setListStaff } =
        useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingFooter, setLoadingFooter] = useState(false);
    const [refresh, setFresh] = useState(false);
    let isEmpty = false;

    useEffect(() => {
        loadStaffOutStanding();
        console.log('Load');
    }, []);

    function clearOldData() {
        setHistoryOrder([]);
        setListTour([]);
        setListOrder([]);
        setListStaff([]);
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
                    setUser(null);
                    setIsLogin(false);
                    clearOldData();
                    //delete old user
                    AsyncStorage.removeItem('user')
                        .then(() => {
                            console.log('user removed from AsyncStorage');
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                    navigation.replace('Login');
                }
            }
        } catch (error) {
            console.log(error);
        }
        return false;
    }

    async function loadStaffOutStanding() {
        try {
            const res = await request.get(API.listStaff, {
                headers: { 'Content-Type': 'application/json', authorization: user.accessToken },
            });
            console.log('API');
            if (res.status === true) {
                setIsLoading(false);
                setListStaff(res.data);
                setLoadingFooter(false);
            } else {
                isEmpty = true;
                if (res.message == 'Token đã hết hạn') {
                    getRefreshToken();
                } else
                    Alert.alert('Thông báo!', res.message + '', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
            }
        } catch (error) {
            console.log(error);
        }
    }
    // useEffect(() => {
    //     request
    //         .get(API.listStaff, {
    //             headers: { 'Content-Type': 'application/json', authorization: user.accessToken },
    //         })
    //         .then((response) => {
    //             console.log(response.data);

    //             if (response.status == true) {
    //                 setListStaff(response.data);
    //             } else {
    //                 Alert.alert('Thông báo!', response.message + '', [
    //                     { text: 'OK', onPress: () => console.log('OK Pressed') },
    //                 ]);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);
    return (
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View
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
                        navigation.navigate('EditStaff', { type: 'add' });
                    }}
                >
                    <Icon name="add" size={25} color="#021A5A" />
                </TouchableOpacity>
            </View>
            <Find />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        enabled={true}
                        refreshing={refresh}
                        onRefresh={() => {
                            setFresh(true);
                            setListStaff([]);
                            setIsLoading(true);
                            loadStaffOutStanding();
                            setFresh(false);
                        }}
                    />
                }
                // refreshControl={<RefreshControl refreshing={refresh} />}
            >
                {isEmpty ? (
                    <View>
                        <Image
                            source={require('../manageTour/No-data-cuate.png')}
                            style={{ height: 300, width: 200, marginTop: 100, marginBottom: 0 }}
                        />
                        <Text style={{ text: 5, textAlign: 'center', marginTop: 0 }}>Chưa có dữ liệu</Text>
                    </View>
                ) : isLoading ? (
                    <ActivityIndicator size="small" color={COLOR.primary} />
                ) : (
                    listStaff.map((item) => <CardStaff staff={item} key={item.idStaff} navigation={navigation} />)
                )}

                {loadingFooter ? <ActivityIndicator size="small" color={COLOR.primary} /> : ''}
            </ScrollView>
        </SafeAreaView>
    );
}

export default ManageStaffScreen;
