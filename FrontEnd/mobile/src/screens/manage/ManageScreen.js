import React, { useState, useContext } from 'react';
import { SafeAreaView, Image, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
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

function ManageScreen({ navigation }) {
    const { user, setUser } = useContext(AppContext);
    // const user = {
    //     id: 1,
    //     name: 'Phan Văn Hiểu',
    //     email: 'phanvanhieu@gmail.com',
    //     address: 'Thu Duc',
    //     phone: '012345678',
    //     uriImage: 'https://img.freepik.com/free-photo/smiley-little-boy-isolated-pink_23-2148984798.jpg',

    //     role: 'Admin',
    // };
    const [isLogin, setIsLogin] = useState(user != '');

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
                        <Text style={[stylesManage.txt_name, { fontSize: 16, fontWeight: 'normal' }]}>
                            {user?.role}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile', { user: user })}>
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
                    {user.role === 'Admin' ? (
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

                            <TouchableOpacity onPress={() => navigation.navigate('ManageOrder')}>
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
                    {user.role === 'Nhân viên' ? (
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

                            <TouchableOpacity onPress={() => navigation.navigate('ManageOrder')}>
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

                    <TouchableOpacity onPress={() => setIsLogin(false)}>
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
                            setIsLogin(true);
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
