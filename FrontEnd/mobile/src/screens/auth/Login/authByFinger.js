import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Text, View, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';
import stylesMyInput from '../../../components/auth/styles';
import stylesButton from '../../../components/general/actionButton/styles';
import { styles } from '../../../styles';
import stylesLogin from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as request from '../../../services/untils/index';
import API from '../../../res/string';
import COLOR from '../../../res/color';
import TouchID from 'react-native-touch-id';
import { AppContext } from '../../../../App';
// import { clearOldData } from '../../../res/untils';

function AuthByFinger({ navigation }) {
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

    let errorCount = 0;
    const maxErrorCount = 3;
    const [name, setName] = useState();

    function clearOldData() {
        setHistoryOrder([]);
        setToursOutStanding([]);
        setToursComming([]);
        setListTour([]);
        setListOrder([]);
        setListStaff([]);
    }

    const handleTouchID = () => {
        TouchID.authenticate('Xác thực bằng vân tay')
            .then((success) => {
                console.log('Xác thực thành công!');
                navigation.replace('HomeScreen');
            })
            .catch((error) => {
                if (error.name === 'LAErrorAuthenticationFailed') {
                    errorCount++;
                    console.log(`Bạn đã nhập sai ${errorCount} lần.`);
                    if (errorCount >= maxErrorCount) {
                        console.log('Bạn đã nhập sai quá nhiều lần.');
                        navigation.replace('Login');
                        // Xử lý khi nhập sai quá nhiều lần ở đây
                    }
                } else if (error.name === 'LAErrorUserCancel') {
                    console.log('Người dùng đã hủy xác thực.');
                } else {
                    console.log('Lỗi xác thực: ', error);
                }
            });
    };

    function formatString(currentString) {
        console.log('currentString: ', currentString);
        return currentString.slice(0, 3) + '***@***.com';
    }
    useEffect(() => {
        async function checkLogin() {
            let temp = await AsyncStorage.getItem('user');

            console.log('temp: ', temp);

            if (temp != '' && temp != undefined && temp != null) {
                setUser(JSON.parse(temp));
                setName(formatString(JSON.parse(temp).email));
                handleTouchID();
            } else {
                navigation.replace('HomeScreen');
            }
        }

        checkLogin();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            {user == '' ? (
                <ActivityIndicator size="large" color={COLOR.primary} />
            ) : (
                <View style={{ flex: 1 }}>
                    <View style={[stylesLogin.header, { alignItems: 'flex-start', marginLeft: 20 }]}>
                        <Text style={[styles.title1, { fontSize: 22, color: '#000000' }]}>
                            Chào mừng bạn đã quay trở lại!
                        </Text>
                        <Text style={[styles.title2, { color: '#000000' }]}>{name}</Text>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <TouchableOpacity onPress={() => handleTouchID()}>
                            <Ionicons name="finger-print" color={COLOR.primary} size={50} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleTouchID()}>
                            <Text style={[styles.title2, { color: '#000000', fontWeight: 'normal' }]}>
                                Bấm vào đây để bắt đầu xác thực bằng vân tay
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={stylesLogin.footer}>
                        <View
                            style={{
                                marginTop: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    //delete old user
                                    AsyncStorage.removeItem('user')
                                        .then(() => {
                                            console.log('user removed from AsyncStorage');
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                        });
                                    setUser(null);
                                    clearOldData();
                                    navigation.replace('Login');
                                }}
                            >
                                <Text style={styles.title2}>Đăng nhập với mật khẩu</Text>
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
                                    //delete old user
                                    AsyncStorage.removeItem('user')
                                        .then(() => {
                                            console.log('user removed from AsyncStorage');
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                        });
                                    setUser(null);
                                    clearOldData();
                                    navigation.replace('HomeScreen');
                                }}
                            >
                                <Text style={styles.title2}>Sử dụng chế độ khách</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

export default AuthByFinger;
