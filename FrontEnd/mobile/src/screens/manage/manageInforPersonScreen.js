import React, { useState } from 'react';
import { SafeAreaView, Image, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import stylesButton from '../../components/general/actionButton/styles';
import stylesAllTour from '../allTour/style';
import stylesManage from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import stylesTour from '../tourScreen/styles';

function ManageInforPersonScreen({ route, navigation }) {
    const user = route?.params?.user;
    const [name, setName] = useState(user != undefined ? user.name : '');
    const [email, setEmail] = useState(user != undefined ? user.email : '1');
    const [address, setAddress] = useState(user != undefined ? user.address : '');
    const [phone, setPhone] = useState(user != undefined ? user.phone : '');
    const [imgPath, setImgPath] = useState(
        user != undefined
            ? user.uriImage
            : `https://img.freepik.com/free-photo/smiley-little-boy-isolated-pink_23-2148984798.jpg`,
    );

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
            Alert.alert('Thông báo!', 'Cập nhật thành công!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        }
    };

    const addInfo = () => {
        if (checkValue()) {
            navigation.navigate('Register', { name: name, address: address, phone: phone });
        }
    };

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
                            value={name}
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
                                placeholder="Nhập email của bạn"
                                onChangeText={(newText) => setEmail(newText)}
                                value={email}
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
                        <TextInput
                            placeholder="Nhập địa chỉ của bạn"
                            onChangeText={(newText) => setAddress(newText)}
                            value={address}
                        />
                        <AntDesign name="check" size={20} color="#0D6EFD" />
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
        </ScrollView>
    );
}

export default ManageInforPersonScreen;
