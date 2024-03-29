import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MyInput, MyInputPassWord } from '../../../components/auth';
import stylesMyInput from '../../../components/auth/styles';
import stylesButton from '../../../components/general/actionButton/styles';
import { styles } from '../../../styles';
import stylesLogin from '../styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as request from '../../../services/untils/index';
import API from '../../../res/string';

function Register({ navigation, route }) {
    console.log(route);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    // const [capcha, setCapcha] = useState('');
    const [seePassword, setSeePassword] = useState(true);
    const [seeConfirmPassword, setSeeConfirmPassword] = useState(true);

    const checkValue = () => {
        if (username.trim().length == 0) {
            Alert.alert('Thông báo!', 'Không được để trống tên đăng nhập!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return false;
        }
        if (password.trim().length == 0) {
            Alert.alert('Thông báo!', 'Không được để trống mật khẩu!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return false;
        }
        if (confirm.trim().length == 0) {
            Alert.alert('Thông báo!', 'Không được để trống xác nhận mật khẩu!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return false;
        }
        if (confirm.trim() != password.trim()) {
            Alert.alert('Thông báo!', 'Mật khẩu và xác nhận mật khẩu chưa khớp!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return false;
        }

        return true;
    };
    const register = () => {
        if (checkValue()) {
            request
                .post(API.register, {
                    username: username,
                    password: password,
                    name: route.params.name,
                    email: username,
                    phoneNumber: route.params.phone,
                    imageUrl: route.params.responseImage,
                    address: route.params.address,
                })
                .then((response) => {
                    console.log(response.data);
                    if (response.data.status == true) {
                        setUsername('');
                        setPassword('');
                        setConfirm('');
                        Alert.alert('Thông báo!', 'Đăng ký thành công!', [
                            {
                                text: 'OK',
                                onPress: () => navigation.replace('Login'),
                            },
                        ]);
                    } else {
                        Alert.alert('Thông báo!', response.data.message, [
                            {
                                text: 'OK',
                                onPress: () => {},
                            },
                        ]);
                    }
                })
                .catch((err) =>
                    Alert.alert('Thông báo!', 'Đăng ký thất bại!', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]),
                );
        }
    };

    return (
        <SafeAreaView>
            <View style={stylesLogin.header2}>
                <Text style={styles.title1}>ĐĂNG KÝ</Text>
            </View>
            <View style={stylesLogin.body2}>
                <View>
                    <Text style={styles.title3}>Tên đăng nhập </Text>
                    {/* <MyInput placeholder="Nhập tên đăng nhập hoặc email" /> */}
                    <TextInput
                        style={stylesMyInput.input}
                        placeholder="Nhập tên đăng nhập hoặc email"
                        // placeholder={props.placeholder}
                        onChangeText={(newText) => {
                            setUsername(newText);
                        }}
                    />
                </View>
                <View style={stylesLogin.input2}>
                    <Text style={styles.title3}>Mật khẩu </Text>

                    <View
                        style={[
                            stylesMyInput.input,
                            { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
                        ]}
                    >
                        <TextInput
                            secureTextEntry={seePassword}
                            placeholder="Nhập mật khẩu của bạn"
                            onChangeText={(newText) => {
                                setPassword(newText);
                            }}
                            maxLength={12}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setSeePassword(!seePassword);
                            }}
                            style={{ marginRight: 10 }}
                        >
                            {seePassword ? (
                                <FontAwesome5 name="eye-slash" size={20} color="#0D6EFD" />
                            ) : (
                                <FontAwesome5 name="eye" size={20} color="#0D6EFD" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={stylesLogin.input2}>
                    <Text style={styles.title3}>Xác nhận mật khẩu </Text>

                    <View
                        style={[
                            stylesMyInput.input,
                            { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
                        ]}
                    >
                        <TextInput
                            secureTextEntry={seeConfirmPassword}
                            placeholder="Nhập lại mật khẩu của bạn"
                            onChangeText={(newText) => {
                                setConfirm(newText);
                            }}
                            maxLength={12}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setSeeConfirmPassword(!seeConfirmPassword);
                            }}
                            style={{ marginRight: 10 }}
                        >
                            {seeConfirmPassword ? (
                                <FontAwesome5 name="eye-slash" size={20} color="#0D6EFD" />
                            ) : (
                                <FontAwesome5 name="eye" size={20} color="#0D6EFD" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={stylesLogin.footer2}>
                {/* <MyButton1 content="Đăng ký" /> */}
                <TouchableOpacity
                    onPress={() => {
                        register();
                    }}
                >
                    <View style={stylesButton.btn}>
                        <Text style={stylesButton.btn_txt}>Đăng ký</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                >
                    <Text style={[stylesLogin.txt, { marginTop: 10 }]}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Register;
