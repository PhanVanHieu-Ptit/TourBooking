import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MyInput, MyInputPassWord } from '../../../components/auth';
import stylesMyInput from '../../../components/auth/styles';
import stylesButton from '../../../components/general/actionButton/styles';
import { styles } from '../../../styles';
import stylesLogin from '../styles';

function Register({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [capcha, setCapcha] = useState('');

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
            Alert.alert('Thông báo!', 'Đăng ký thành công!', [
                {
                    text: 'OK',
                    onPress: () => {
                        navigation.navigate('Login');
                    },
                },
            ]);
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
                    {/* <MyInputPassWord placeholder="Nhập mật khẩu của bạn" /> */}
                    <TextInput
                        secureTextEntry={true}
                        style={stylesMyInput.input}
                        placeholder="Nhập mật khẩu của bạn"
                        // placeholder={props.placeholder}
                        onChangeText={(newText) => {
                            setPassword(newText);
                        }}
                    />
                </View>
                <View style={stylesLogin.input2}>
                    <Text style={styles.title3}>Xác nhận mật khẩu </Text>
                    {/* <MyInputPassWord placeholder="Nhập lại mật khẩu của bạn" /> */}
                    <TextInput
                        secureTextEntry={true}
                        style={stylesMyInput.input}
                        placeholder="Nhập lại mật khẩu của bạn"
                        // placeholder={props.placeholder}
                        onChangeText={(newText) => {
                            setConfirm(newText);
                        }}
                    />
                </View>
                <View style={stylesLogin.input2}>
                    <Text style={styles.title3}>Capcha</Text>
                    <MyInput
                        placeholder="Vui lòng nhập capcha bên dưới"
                        onChangeText={(newText) => {
                            setCapcha(newText);
                        }}
                    />
                    {/* <View style={stylesLogin.capcha}>
                        <Text style={stylesLogin.txt_capcha}>123ESs</Text>
                    </View> */}
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
