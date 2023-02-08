import React, { useState } from 'react';
import { SafeAreaView, Text, View, Alert, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import stylesMyInput from '../../../components/auth/styles';
import stylesButton from '../../../components/general/actionButton/styles';
import { styles } from '../../../styles';
import stylesLogin from '../styles';

function Login({ navigation }) {
    const User = {
        username: 'PhanVanHieu',
        password: 123,
    };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
    const checkLogin = () => {
        console.log('checkValue(): ', checkValue());
        if (checkValue() == true) {
            if (username == User.username && password == User.password) {
                navigation.navigate('HomeScreen');
            } else {
                Alert.alert('Đăng nhập thất bại!', 'Tên đăng nhập hoặc mật khẩu không đúng!', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
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
                            setUsername(newText);
                        }}
                    />
                </View>
                <View style={stylesLogin.input}>
                    <Text style={styles.title3}>Mật khẩu </Text>
                    {/* <MyInputPassWord placeholder="Nhập mật khẩu của bạn" setPassword={setPassword()} /> */}
                    <TextInput
                        secureTextEntry={true}
                        style={stylesMyInput.input}
                        placeholder="Nhập mật khẩu của bạn"
                        onChangeText={(newText) => {
                            setPassword(newText);
                        }}
                    />
                </View>
            </View>
            <View style={stylesLogin.footer}>
                <TouchableOpacity
                    onPress={() => {
                        checkLogin();
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
                            navigation.navigate('Register');
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
