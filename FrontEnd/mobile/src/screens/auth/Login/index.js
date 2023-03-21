import React, { useState, useContext } from 'react';
import { SafeAreaView, Text, View, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import stylesMyInput from '../../../components/auth/styles';
import stylesButton from '../../../components/general/actionButton/styles';
import { styles } from '../../../styles';
import stylesLogin from '../styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import * as request from '../../../services/untils/index';
import API from '../../../res/string';
import { AppContext } from '../../../../App';
// import { clearOldData } from '../../../res/untils';

function Login({ navigation }) {
    const { setHistoryOrder, setToursOutStanding, setToursComming, setListTour, setListOrder, setListStaff } =
        useContext(AppContext);
    const [seePassword, setSeePassword] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function clearOldData() {
        setHistoryOrder([]);
        setToursOutStanding([]);
        setToursComming([]);
        setListTour([]);
        setListOrder([]);
        setListStaff([]);
    }

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
        return true;
    };
    const login = () => {
        console.log('checkValue(): ', checkValue());
        if (checkValue() == true) {
            request
                .post(API.login, { username, password })
                .then((response) => {
                    console.log(response.data);
                    console.log('response.data.data: ' + response.data.data[0]);
                    if (response.data.status == true) {
                        setUsername('');
                        setPassword('');

                        //delete data old from context
                        clearOldData();
                        // setToken(response.header);
                        // AsyncStorage.setItem('AccessToken', response.headers.authorization);
                        const user = {
                            id: response.data.data[0].id,
                            name: response.data.data[0].name,
                            imageUrl: response.data.data[0].imageUrl,
                            role: response.data.data[0].role,
                            phoneNumber: response.data.data[0].phoneNumber,
                            email: response.data.data[0].email,
                            address: response.data.data[0].address,
                            accessToken: response.headers.authorization,
                        };
                        console.log('user: ', user);
                        AsyncStorage.setItem('user', JSON.stringify(user))
                            .then(() => console.log('Object stored successfully'))
                            .catch((error) => console.log('Error storing object: ', error));
                        Alert.alert('Thông báo!', 'Đăng nhập thành công!', [
                            { text: 'OK', onPress: () => navigation.replace('HomeScreen') },
                        ]);
                    } else {
                        Alert.alert('Đăng nhập thất bại!', response.data.message + '', [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    return (
        <SafeAreaView>
            <View style={stylesLogin.header}>
                <Text style={styles.title1}>TOURBOOKING.COM</Text>
                <Text style={styles.title2}>Du lịch muôn nơi</Text>
            </View>
            <View style={stylesLogin.body}>
                <View>
                    <Text style={styles.title3}>Tên đăng nhập </Text>
                    {/* <MyInput placeholder="Nhập tên đăng nhập hoặc email" setUsername={setUsername()} /> */}
                    <TextInput
                        style={stylesMyInput.input}
                        // placeholder={props.placeholder}
                        placeholder="Nhập tên đăng nhập hoặc email"
                        onChangeText={(newText) => {
                            setUsername(newText.trim());
                        }}
                    />
                </View>
                <View style={stylesLogin.input}>
                    <Text style={styles.title3}>Mật khẩu </Text>
                    {/* <MyInputPassWord placeholder="Nhập mật khẩu của bạn" setPassword={setPassword()} /> */}
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
            </View>
            <View style={stylesLogin.footer}>
                <TouchableOpacity
                    onPress={() => {
                        login();
                    }}
                >
                    <View style={stylesButton.btn}>
                        <Text style={stylesButton.btn_txt}>Đăng nhập</Text>
                    </View>
                </TouchableOpacity>
                <View
                    style={{
                        borderBottomWidth: 2,
                        borderColor: '#021A5A',
                        width: 168,
                        marginTop: 50,
                    }}
                />
                <View
                    style={{
                        marginTop: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Forgotpassword');
                        }}
                    >
                        <Text style={stylesLogin.txt}>Quên mật khẩu?</Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            borderBottomWidth: 1,
                            borderColor: '#021A5A',
                            width: 54,
                            marginTop: 5,
                            marginBottom: 5,
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('Profile', { type: 'register' });
                        }}
                    >
                        <Text style={stylesLogin.txt}>Tạo tài khoản mới</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Login;
