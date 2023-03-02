import React, { useState } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import stylesMyInput from '../../../components/auth/styles';
import MyButton1 from '../../../components/general/actionButton/button1';
import ButtonBack from '../../../components/general/actionButton/buttonBack';
import stylesButton from '../../../components/general/actionButton/styles';
import MyModal from '../../../components/general/form/myModal';
import { styles } from '../../../styles';
import stylesLogin from '../styles';
import Icon from 'react-native-vector-icons/Ionicons';
import * as request from '../../../services/untils/index';
import API from '../../../res/string';

function ForgotPassword({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const refreshPassword = () => {
        if (email.trim().length == 0) {
            Alert.alert('Thông báo!', 'Không được để trống email!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        } else {
            request
                .post(API.forgotpassword, { username: email })
                .then((response) => {
                    console.log(response.data);
                    if (response.status == true) {
                        setEmail('');
                        // setModalVisible(true);

                        Alert.alert(
                            'Đổi mật khẩu thành công!',
                            'Chúng tôi đã gửi link đổi mật khẩu về mail: ' +
                                email +
                                '. Bạn hãy kiểm tra mail của bạn trước khi link hết hiệu lực.',
                            [{ text: 'OK', onPress: () => navigation.replace('Login') }],
                        );
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
    };
    return (
        <SafeAreaView>
            <MyModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                title="Kiểm tra email của bạn"
                content="Chúng tôi đã gửi mật khẩu mới về mail của bạn"
                screen="Login"
                navigation={navigation}
            />

            {/* Button Back */}
            {/* <ButtonBack screen="Login" /> */}
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Login');
                }}
            >
                <View style={stylesButton.btn_back}>
                    <Icon name="chevron-back" size={25} color="#021A5A" />
                </View>
            </TouchableOpacity>
            <View style={stylesLogin.header}>
                <Text style={styles.title1}>QUÊN MẬT KHẨU</Text>
                <Text style={stylesLogin.title}>Nhập email đã đăng ký tài khoản của bạn để làm mới mật khẩu</Text>
            </View>
            <View style={{ marginTop: 30 }}>
                <View>
                    <Text style={styles.title3}>Email </Text>
                    {/* <MyInput placeholder="Nhập email của bạn" /> */}
                    <TextInput
                        value={email}
                        style={stylesMyInput.input}
                        // placeholder={props.placeholder}
                        placeholder="Nhập email của bạn"
                        onChangeText={(newText) => {
                            setEmail(newText);
                        }}
                    />
                </View>
            </View>
            <View style={stylesLogin.footer}>
                <MyButton1 content="Làm mới mật khẩu" refreshPassword={refreshPassword} />
            </View>
        </SafeAreaView>
    );
}

export default ForgotPassword;
