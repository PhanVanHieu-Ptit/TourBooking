import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Image, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import stylesButton from '../../components/general/actionButton/styles';
import stylesAllTour from '../allTour/style';
import stylesManage from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import stylesTour from '../tourScreen/styles';
import { AppContext } from '../../../App';
import API from '../../res/string';
import * as request from '../../services/untils';
import { SelectList } from 'react-native-dropdown-select-list';
import DropDownPicker from 'react-native-dropdown-picker';

function ManageInforPersonScreen({ route, navigation }) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
    ]);
    const { user, setUser } = useContext(AppContext);
    console.log(user);
    const [listAddress, setListAddress] = useState([]);
    const [name, setName] = useState(user != undefined ? user.name : '');
    const [email, setEmail] = useState(user != undefined ? user.email : '1');
    const [address, setAddress] = useState(user != undefined ? user.address : '');
    const [phone, setPhone] = useState(user != undefined ? user.phoneNumber : '');
    const [imgPath, setImgPath] = useState(
        user != undefined
            ? user.imageUrl
            : `https://img.freepik.com/free-photo/smiley-little-boy-isolated-pink_23-2148984798.jpg`,
    );

    const [selected, setSelected] = useState('');

    const [responseImage, setResponseImage] = useState('');
    const chooseImage = () => {
        let options = {
            title: 'Select Image',
            customButtons: [{ name: 'customOptionKey', title: 'Choose Photo from Custom Option' }],
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
                // console.log('source', response.assets[0].uri);

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
        return true;
    };
    const update = () => {
        if (checkValue()) {
            request
                .postPrivate(
                    API.updateInfoPersonal,
                    { name, address, phoneNumber: phone },
                    { 'Content-Type': 'application/json', authorization: user.accessToken },
                )
                .then((response) => {
                    console.log(response.data);
                    console.log('response.data.data: ' + response.data.data[0]);
                    if (response.data.status == true) {
                        const newUser = {
                            id: response.data.data[0].id,
                            name: response.data.data[0].name,
                            imageUrl: response.data.data[0].imageUrl,
                            role: response.data.data[0].role,
                            phoneNumber: response.data.data[0].phoneNumber,
                            email: response.data.data[0].email,
                            address: response.data.data[0].address,
                            accessToken: response.headers.authorization,
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
        request
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
    }, []);

    return (
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
                    {user != undefined ? 'Sửa thông tin cá nhân' : 'Nhập thông tin cá nhân'}
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
                <TouchableOpacity
                    onPress={() => {
                        chooseImage();
                    }}
                >
                    <Text style={[stylesManage.txt_name, { fontSize: 16, fontWeight: 'normal' }]}>
                        {user != undefined ? 'Đổi ảnh' : 'Chọn ảnh'}
                    </Text>
                </TouchableOpacity>
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
            {user != undefined ? (
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
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={listAddress}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setAddress}
                    />
                </View>
            </View>
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
            <TouchableOpacity
                onPress={() => {
                    if (user != undefined) update();
                    else addInfo();
                }}
            >
                <View style={stylesTour.btn}>
                    <Text style={stylesTour.txt_btn}>{user != undefined ? 'Lưu lại' : 'Tiếp tục'}</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default ManageInforPersonScreen;
