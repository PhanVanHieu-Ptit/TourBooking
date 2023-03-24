import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, Image, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import stylesButton from '../../components/general/actionButton/styles';
import stylesAllTour from '../allTour/style';
import stylesManage from './styles';
import stylesTour from '../tourScreen/styles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { AppContext } from '../../../App';
import * as request from '../../services/untils';
import API from '../../res/string';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ChangePassword({ route, navigation }) {
    const { user, setUser, setHistoryOrder, setListTour, setListOrder, setListStaff } = useContext(AppContext);

    const [imageUrl, setImageUrl] = useState(
        user != undefined
            ? user.imageUrl
            : 'https://img.freepik.com/free-photo/smiley-little-boy-isolated-pink_23-2148984798.jpg',
    );
    const [name, setName] = useState(user != undefined ? user.name : '');
    const [seeOldPassWord, setSeeOldPassword] = useState(true);
    const [seeNewPassWord, setSeeNewPassword] = useState(true);
    const [seeConfirmPassWord, setSeeConfirmPassword] = useState(true);

    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');

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

    function checkValue() {
        if (oldPass.trim().length == 0) {
            Alert.alert('Thông báo!', 'Không được bỏ trống mật khẩu cũ!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return false;
        }
        if (newPass.trim().length == 0) {
            Alert.alert('Thông báo!', 'Không được bỏ trống mật khẩu mới!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return false;
        }
        if (confirmNewPass.trim().length == 0) {
            Alert.alert('Thông báo!', 'Không được bỏ trống xác nhận mật khẩu mới!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return false;
        }
        if (confirmNewPass.trim() != newPass.trim()) {
            Alert.alert('Thông báo!', 'Mật khẩu mới và xác nhận mật khẩu mới không khớp!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return false;
        }
        return true;
    }

    function changePass() {
        if (checkValue()) {
            request
                .postPrivate(
                    API.changPassword,
                    { username: user.email, newPassword: newPass, oldPassword: oldPass },
                    { 'Content-Type': 'application/json', authorization: user.accessToken },
                    'PATCH',
                )
                .then((response) => {
                    console.log(response.data);
                    console.log('response.data.data: ' + response.data.data[0]);
                    if (response.data.status == true) {
                        Alert.alert('Thông báo!', 'Cập nhật thành công!', [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                    } else {
                        if (response.data.message == 'Token đã hết hạn') {
                            getRefreshToken();
                        } else
                            Alert.alert('Cập nhật thất bại!', response.data.message + '', [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    const [role, setRole] = useState(user.role);
    function setRoleUser() {
        if (user.role == 'customer') {
            setRole('Khách hàng');
        } else if (user.role == 'staff') {
            setRole('Nhân viên');
        }
    }
    useEffect(() => {
        setRoleUser();
    }, []);
    return (
        <ScrollView>
            <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginLeft: -180,
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={stylesButton.btn_back}>
                            <Icon name="chevron-back" size={25} color="#021A5A" />
                        </View>
                    </TouchableOpacity>
                    <Text style={[stylesAllTour.title, { marginLeft: 20 }]}>Đổi mật khẩu</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Image
                        source={{
                            uri: `${imageUrl}`,
                        }}
                        style={stylesManage.img}
                    />

                    <Text style={stylesManage.txt_name}>{name}</Text>

                    <Text style={[stylesManage.txt_name, { fontSize: 16, fontWeight: 'normal' }]}>{role}</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={stylesManage.title}>Mật khẩu cũ</Text>
                    <View
                        style={[
                            stylesManage.input,
                            {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 5,
                            },
                        ]}
                    >
                        <TextInput
                            placeholder="Nhập mật khẩu cũ của bạn"
                            secureTextEntry={seeOldPassWord}
                            onChangeText={(newText) => setOldPass(newText)}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setSeeOldPassword(!seeOldPassWord);
                            }}
                        >
                            {seeOldPassWord ? (
                                <FontAwesome5 name="eye-slash" size={20} color="#0D6EFD" />
                            ) : (
                                <FontAwesome5 name="eye" size={20} color="#0D6EFD" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={stylesManage.title}>Mật khẩu mới</Text>
                    <View
                        style={[
                            stylesManage.input,
                            {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 5,
                            },
                        ]}
                    >
                        <TextInput
                            placeholder="Nhập mật khẩu mới"
                            secureTextEntry={seeNewPassWord}
                            onChangeText={(newText) => setNewPass(newText)}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setSeeNewPassword(!seeNewPassWord);
                            }}
                        >
                            {seeNewPassWord ? (
                                <FontAwesome5 name="eye-slash" size={20} color="#0D6EFD" />
                            ) : (
                                <FontAwesome5 name="eye" size={20} color="#0D6EFD" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={stylesManage.title}>Xác nhận mật khẩu mới</Text>
                    <View
                        style={[
                            stylesManage.input,
                            {
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 5,
                            },
                        ]}
                    >
                        <TextInput
                            placeholder="Nhập lại mật khẩu mới"
                            secureTextEntry={seeConfirmPassWord}
                            onChangeText={(newText) => setConfirmNewPass(newText)}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setSeeConfirmPassword(!seeConfirmPassWord);
                            }}
                        >
                            {seeConfirmPassWord ? (
                                <FontAwesome5 name="eye-slash" size={20} color="#0D6EFD" />
                            ) : (
                                <FontAwesome5 name="eye" size={20} color="#0D6EFD" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={() => changePass()}>
                    <View style={[stylesTour.btn, { width: 320 }]}>
                        <Text style={stylesTour.txt_btn}>Xác nhận</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    );
}

export default ChangePassword;
