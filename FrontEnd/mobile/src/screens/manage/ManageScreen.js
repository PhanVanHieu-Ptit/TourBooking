import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Image, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import stylesButton from '../../components/general/actionButton/styles';
import stylesAllTour from '../allTour/style';
import stylesManage from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import COLOR from '../../res/color';
import stylesTour from '../tourScreen/styles';
import { AppContext } from '../../../App';
// import { clearOldData } from '../../res/untils';

function ManageScreen({ navigation }) {
    const {
        user,
        setUser,
        setHistoryOrder,
        setToursOutStanding,
        setToursComming,
        setListTour,
        setListOrder,
        setListStaff,
    } = useContext(AppContext);

    const [isLogin, setIsLogin] = useState(user != '' && user != undefined && user != null);
    const [role, setRole] = useState(user?.role);
    const [navigateInforPerson, setNavigateInforPerson] = useState('Profile');

    function clearOldData() {
        setHistoryOrder([]);
        setToursOutStanding([]);
        setToursComming([]);
        setListTour([]);
        setListOrder([]);
        setListStaff([]);
    }

    function setRoleUser() {
        if (user?.role == 'customer') {
            setRole('Khách hàng');
            // setNavigateInforPerson('Profile');
        } else if (user?.role == 'staff') {
            setRole('Nhân viên');
            // setNavigateInforPerson('EditStaff');
        } else if (user?.role == 'admin') {
            setRole('admin');
            // setNavigateInforPerson('EditStaff');
        }
    }
    useEffect(() => {
        setRoleUser();
    }, []);

    return (
        <ScrollView>
            {isLogin ? (
                <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Image
                            source={{
                                uri:
                                    user?.imageUrl != undefined
                                        ? user.imageUrl
                                        : `https://freesvg.org/img/abstract-user-flat-4.png`,
                            }}
                            style={stylesManage.img}
                        />
                        <Text style={stylesManage.txt_name}>{user?.name}</Text>
                        <Text style={[stylesManage.txt_name, { fontSize: 16, fontWeight: 'normal' }]}>{role}</Text>
                    </View>

                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate(navigateInforPerson, { user: user })}>
                            <View style={stylesManage.btn}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="information-circle-outline" size={20} color={COLOR.primary} />
                                    <Text style={[stylesTour.txt_btn, { color: COLOR.primary, marginLeft: 5 }]}>
                                        Thông tin cá nhân
                                    </Text>
                                </View>
                                <AntDesign name="right" size={20} color={COLOR.primary} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Changepassword')}>
                            <View style={stylesManage.btn}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Icon name="information-circle-outline" size={20} color={COLOR.primary} />
                                    <Text style={[stylesTour.txt_btn, { color: COLOR.primary, marginLeft: 5 }]}>
                                        Đổi mật khẩu
                                    </Text>
                                </View>
                                <AntDesign name="right" size={20} color={COLOR.primary} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {user?.role === 'admin' ? (
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('ManageTour')}>
                                <View style={stylesManage.btn}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <MaterialIcons name="tour" size={20} color={COLOR.primary} />
                                        <Text style={[stylesTour.txt_btn, { color: COLOR.primary, marginLeft: 5 }]}>
                                            Quản lý tour
                                        </Text>
                                    </View>
                                    <AntDesign name="right" size={20} color={COLOR.primary} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('ManageOrderFollowStatus')}>
                                <View style={stylesManage.btn}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name="ticket" size={20} color={COLOR.primary} />
                                        <Text style={[stylesTour.txt_btn, { color: COLOR.primary, marginLeft: 5 }]}>
                                            Quản lý đơn đặt
                                        </Text>
                                    </View>
                                    <AntDesign name="right" size={20} color={COLOR.primary} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('ManageStaff')}>
                                <View style={stylesManage.btn}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon name="people-outline" size={20} color={COLOR.primary} />
                                        <Text style={[stylesTour.txt_btn, { color: COLOR.primary, marginLeft: 5 }]}>
                                            Quản lý nhân viên
                                        </Text>
                                    </View>
                                    <AntDesign name="right" size={20} color={COLOR.primary} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        ''
                    )}
                    {user?.role === 'staff' ? (
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('ManageTour')}>
                                <View style={stylesManage.btn}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <MaterialIcons name="tour" size={20} color={COLOR.primary} />
                                        <Text style={[stylesTour.txt_btn, { color: COLOR.primary, marginLeft: 5 }]}>
                                            Quản lý tour
                                        </Text>
                                    </View>
                                    <AntDesign name="right" size={20} color={COLOR.primary} />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('ManageOrderFollowStatus')}>
                                <View style={stylesManage.btn}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Entypo name="ticket" size={20} color={COLOR.primary} />
                                        <Text style={[stylesTour.txt_btn, { color: COLOR.primary, marginLeft: 5 }]}>
                                            Quản lý đơn đặt
                                        </Text>
                                    </View>
                                    <AntDesign name="right" size={20} color={COLOR.primary} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        ''
                    )}

                    <TouchableOpacity
                        onPress={() => {
                            setIsLogin(false);
                            //delete old user
                            AsyncStorage.removeItem('user')
                                .then(() => {
                                    console.log('user removed from AsyncStorage');
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                            setUser(null);
                            // setHistoryOrder([]);
                            // setToursOutStanding([]);
                            // setToursComming([]);
                            // setListTour([]);
                            clearOldData();
                            navigation.replace('HomeScreen');
                        }}
                    >
                        <View style={[stylesManage.btn, { justifyContent: 'center' }]}>
                            <AntDesign name="logout" size={20} color={COLOR.primary} />
                            <Text style={[stylesTour.txt_btn, { color: COLOR.primary, marginLeft: 5 }]}>Đăng xuất</Text>
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            ) : (
                <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Image
                            source={{
                                uri: `https://freesvg.org/img/abstract-user-flat-4.png`,
                            }}
                            style={stylesManage.img}
                        />
                        <Text style={stylesManage.txt_name}>Khách</Text>
                        <Text style={[stylesManage.txt_name, { fontSize: 16, fontWeight: 'normal' }]}>
                            Chưa đăng nhập
                        </Text>
                    </View>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Login');
                        }}
                    >
                        <View style={[stylesManage.btn, { justifyContent: 'center' }]}>
                            <AntDesign name="login" size={20} color={COLOR.primary} />
                            <Text style={[stylesTour.txt_btn, { color: COLOR.primary, marginLeft: 5 }]}>Đăng nhập</Text>
                        </View>
                    </TouchableOpacity>
                </SafeAreaView>
            )}
        </ScrollView>
    );
}

export default ManageScreen;
