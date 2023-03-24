import React, { useState, useEffect, useContext } from 'react';
import {
    SafeAreaView,
    Image,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
    StyleSheet,
    PermissionsAndroid,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import stylesButton from '../../components/general/actionButton/styles';
import stylesAllTour from '../allTour/style';
import stylesManage from './styles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import stylesTour from '../tourScreen/styles';
import { AppContext } from '../../../App';
import API from '../../res/string';
import * as request from '../../services/untils';
import SelectDropdown from 'react-native-select-dropdown';
import { uploadImage, deleteImage } from '../../services/untils/uploadImage';
import COLOR from '../../res/color';

function ManageInforPersonScreen({ route, navigation }) {
    const { user, setUser, setHistoryOrder, setListTour, setListOrder, setListStaff } = useContext(AppContext);
    const type = route?.params?.type;
    const [listAddress, setListAddress] = useState([]);
    const [isLogin, setIsLogin] = useState(user != null && user != undefined && user != '');
    const [name, setName] = useState(isLogin ? user?.name : '');
    const [email, setEmail] = useState(isLogin ? user?.email : type == 'register' ? '' : '1');
    const [address, setAddress] = useState(isLogin ? user?.address : '');
    const [phone, setPhone] = useState(isLogin ? user?.phoneNumber : '');
    const [imgPath, setImgPath] = useState(
        isLogin ? user?.imageUrl : `https://freesvg.org/img/abstract-user-flat-4.png`,
    );

    // const [selected, setSelected] = useState('');

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

    const [responseImage, setResponseImage] = useState('');
    const chooseImage = () => {
        let options = {
            title: 'Chọn ảnh',
            customButtons: [{ name: 'customOptionKey', title: 'Chọn ảnh từ' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                Alert.alert(response.customButton);
            } else {
                // console.log('source', response);

                setImgPath(response.assets[0].uri);
                setResponseImage(response);
            }
        });
    };

    async function requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
                title: 'Cấp quyền sử dụng',
                message: 'Ứng dụng cần quyền truy cập vào máy ảnh của bạn.',
                buttonNeutral: 'Hỏi lại sau',
                buttonNegative: 'Hủy bỏ',
                buttonPositive: 'Đồng ý',
            });
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Camera permission granted');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const takePicture = () => {
        requestCameraPermission();
        const options = {
            title: 'Chọn ảnh',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                Alert.alert(response.customButton);
            } else {
                // console.log('source', response);

                setImgPath(response.assets[0].uri);
                setResponseImage(response);
            }
        });
    };

    const checkValue = () => {
        if (name.trim().length == 0) {
            Alert.alert('Thông báo!', 'Không được để trống họ tên!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return false;
        }
        if (email.trim().length == 0) {
            Alert.alert('Thông báo!', 'Không được để trống email!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return false;
        }
        if (isLogin && user?.role == 'customer') {
            if (address.trim().length == 0) {
                Alert.alert('Thông báo!', 'Không được để trống địa chỉ!', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
                return false;
            }
            if (phone.trim().length == 0) {
                Alert.alert('Thông báo!', 'Không được để trống số điện thoại!', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
                return false;
            }
        }
        return true;
    };
    const update = async () => {
        if (checkValue()) {
            const url = await uploadImage(imgPath);
            console.log('url: ', url);
            // await deleteImage('nM0hvJF');

            request
                .postPrivate(
                    API.updateInfoPersonal,
                    { name, address, phoneNumber: phone, imageUrl: url },
                    { 'Content-Type': 'application/json', authorization: user.accessToken },
                    'PATCH',
                )
                .then((response) => {
                    console.log(response.data);
                    console.log('response.data.data: ' + response.data.data[0]);
                    if (response.data.status == true) {
                        const newUser = {
                            id: user.id,
                            name: response.data.data[0].name,
                            imageUrl: response.data.data[0].imageUrl,
                            role: user.role,
                            phoneNumber: response.data.data[0].phoneNumber,
                            email: response.data.data[0].email,
                            address: response.data.data[0].address,
                            accessToken: user.accessToken,
                        };
                        console.log('user: ', newUser);

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
                        AsyncStorage.setItem('user', JSON.stringify(newUser))
                            .then(() => console.log('Object stored successfully'))
                            .catch((error) => console.log('Error storing object: ', error));
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
    };

    const updateStaff = async () => {
        if (checkValue()) {
            const url = await uploadImage(imgPath);
            console.log('url: ', url);
            request
                .postPrivate(
                    '/staff/' + user.id + '/update',
                    { name, imageUrl: url },
                    { 'Content-Type': 'application/json', authorization: user.accessToken },
                    'PUT',
                )
                .then((response) => {
                    console.log(response.data);

                    if (response.data.status == true) {
                        const newUser = {
                            id: user.id,
                            name: name,
                            imageUrl: url,
                            role: user.role,
                            email: user.email,
                            accessToken: user.accessToken,
                        };
                        console.log('user: ', newUser);

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
                        AsyncStorage.setItem('user', JSON.stringify(newUser))
                            .then(() => console.log('Object stored successfully'))
                            .catch((error) => console.log('Error storing object: ', error));
                        Alert.alert('Thông báo!', response.data.message, [
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
    };

    const addInfo = () => {
        if (checkValue()) {
            navigation.navigate('Register', { name: name, address: address, phone: phone });
        }
    };

    useEffect(() => {
        async function loadProvinces() {
            await request
                .get(API.listAddress)
                .then((response) => {
                    console.log(response);

                    if (response.status == true) {
                        setListAddress(response.data);
                    } else {
                        Alert.alert('Thất bại!', response.message + '', [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        if (user?.role != 'staff') {
            loadProvinces();
        }
    }, []);

    return (
        <ScrollView>
            <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginLeft: -90,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <View style={stylesButton.btn_back}>
                            <Icon name="chevron-back" size={25} color="#021A5A" />
                        </View>
                    </TouchableOpacity>
                    <Text style={stylesAllTour.title}>
                        {isLogin ? 'Sửa thông tin cá nhân' : 'Nhập thông tin cá nhân'}
                    </Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Image
                        source={{
                            uri: `${imgPath}`,
                        }}
                        style={stylesManage.img}
                    />

                    <Text style={stylesManage.txt_name}>{name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => {
                                takePicture();
                            }}
                            style={{ marginRight: 10 }}
                        >
                            <AntDesign name="camera" size={20} color={COLOR.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                chooseImage();
                            }}
                        >
                            <Text style={[stylesManage.txt_name, { fontSize: 16, fontWeight: 'normal' }]}>
                                {isLogin ? 'Đổi ảnh' : 'Chọn ảnh'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={stylesManage.title}>Họ tên</Text>
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
                            placeholder="Nhập họ tên của bạn"
                            onChangeText={(newText) => setName(newText)}
                            defaultValue={name}
                        />
                        <AntDesign name="check" size={20} color="#0D6EFD" />
                    </View>
                </View>
                {isLogin || type == 'register' ? (
                    <View style={{ marginTop: 20 }}>
                        <Text style={stylesManage.title}>Email</Text>
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
                                editable={false}
                                placeholder="Nhập email của bạn"
                                onChangeText={(newText) => setEmail(newText)}
                                defaultValue={email}
                            />
                            <AntDesign name="check" size={20} color="#0D6EFD" />
                        </View>
                    </View>
                ) : (
                    ''
                )}
                {(isLogin && user?.role == 'customer') || type == 'register' ? (
                    <View style={{ marginTop: 20 }}>
                        <Text style={stylesManage.title}>Địa chỉ</Text>
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
                            {/* <TextInput
                            placeholder="Nhập địa chỉ của bạn"
                            onChangeText={(newText) => setAddress(newText)}
                            defaultValue={address}
                        />
                        <AntDesign name="check" size={20} color="#0D6EFD" /> */}
                            <SelectDropdown
                                data={listAddress}
                                // defaultValueByIndex={1}
                                defaultValue={address}
                                onSelect={(selectedItem, index) => {
                                    setAddress(selectedItem);
                                    console.log(selectedItem, index);
                                }}
                                defaultButtonText={type == 'register' ? 'Chọn tỉnh / thành phố' : address}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem;
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item;
                                }}
                                buttonStyle={styles.dropdown1BtnStyle}
                                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                renderDropdownIcon={(isOpened) => {
                                    return (
                                        <FontAwesome
                                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                                            color={'#444'}
                                            size={14}
                                        />
                                    );
                                }}
                                dropdownIconPosition={'right'}
                                dropdownStyle={styles.dropdown1DropdownStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                                selectedRowStyle={styles.dropdown1SelectedRowStyle}
                                search
                                searchInputStyle={styles.dropdown1searchInputStyleStyle}
                                searchPlaceHolder={'Tìm kiếm ở đây'}
                                searchPlaceHolderColor={'darkgrey'}
                                renderSearchInputLeftIcon={() => {
                                    return <FontAwesome name={'search'} color={'#444'} size={14} />;
                                }}
                            />
                        </View>
                    </View>
                ) : (
                    ''
                )}
                {(isLogin && user?.role == 'customer') || type == 'register' ? (
                    <View style={{ marginTop: 20 }}>
                        <Text style={stylesManage.title}>Số điện thoại</Text>
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
                                placeholder="Nhập số điện thoại của bạn"
                                onChangeText={(newText) => setPhone(newText)}
                                value={phone}
                                keyboardType={'numeric'}
                                maxLength={10}
                            />
                            <AntDesign name="check" size={20} color="#0D6EFD" />
                        </View>
                    </View>
                ) : (
                    ''
                )}
                <TouchableOpacity
                    onPress={() => {
                        if (isLogin) {
                            if (user.role == 'customer') update();
                            else updateStaff();
                        } else addInfo();
                    }}
                >
                    <View style={stylesTour.btn}>
                        <Text style={stylesTour.txt_btn}>{isLogin ? 'Lưu lại' : 'Tiếp tục'}</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        width: 330,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left', fontSize: 14 },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left', fontSize: 14 },
    dropdown1SelectedRowStyle: { backgroundColor: 'rgba(0,0,0,0.1)' },
    dropdown1searchInputStyleStyle: {
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
});

export default ManageInforPersonScreen;
