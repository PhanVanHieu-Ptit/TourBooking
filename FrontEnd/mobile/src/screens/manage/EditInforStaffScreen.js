import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, Image, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import stylesButton from '../../components/general/actionButton/styles';
import stylesAllTour from '../allTour/style';
import stylesManage from './styles';
import stylesTour from '../tourScreen/styles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { AppContext } from '../../../App';
import * as request from '../../services/untils';
import API from '../../res/string';

function EditInforStaffScreen({ route, navigation }) {
    const { user, setListStaff } = useContext(AppContext);
    const staff = route.params?.staff;
    const type = route.params?.type == 'add';
    const [imageUrl, setImageUrl] = useState(
        staff != undefined
            ? staff.imageUrl
            : 'https://img.freepik.com/free-photo/smiley-little-boy-isolated-pink_23-2148984798.jpg',
    );
    const [name, setName] = useState(staff != undefined ? staff.name : '');
    const [email, setEmail] = useState(staff != undefined ? staff.email : '');
    // const [status, setstatus] = useState(staff != undefined ? staff.status : '');
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

                setImageUrl(response.assets[0].uri);
                setResponseImage(response);
            }
        });
    };

    const addStaff = () => {
        request
            .postPrivate(
                API.addStaff,
                {
                    name,
                    email,
                    imageUrl: '',
                },
                { 'Content-Type': 'application/json', authorization: user.accessToken },
            )
            .then((response) => {
                console.log(response.data);
                setName('');
                setEmail('');
                if (response.data.status == true) {
                    updateListStaff();
                    Alert.alert('Thông báo!', response.data.message, [
                        { text: 'OK', onPress: () => navigation.goBack() },
                    ]);
                } else {
                    Alert.alert('Cập nhật thất bại!', response.data.message, [{ text: 'OK', onPress: () => {} }]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateStaff = () => {
        request
            .postPrivate(
                '/staff/' + staff.idStaff + '/update',
                {
                    id: staff.idStaff,
                    name,
                    imageUrl: '',
                },
                { 'Content-Type': 'application/json', authorization: user.accessToken },
                'PUT',
            )
            .then((response) => {
                console.log(response.data);
                setName('');
                setEmail('');
                if (response.data.status == true) {
                    updateListStaff();
                    Alert.alert('Thông báo!', response.data.message, [
                        { text: 'OK', onPress: () => navigation.goBack() },
                    ]);
                } else {
                    Alert.alert('Cập nhật thất bại!', response.data.message, [{ text: 'OK', onPress: () => {} }]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const changeStateStaff = () => {
        request
            .postPrivate(
                '/staff/' + staff.idStaff + '/toggle-account-status',
                {
                    id: staff.idStaff,
                    name,
                    imageUrl: '',
                },
                { 'Content-Type': 'application/json', authorization: user.accessToken },
                'PATCH',
            )
            .then((response) => {
                console.log(response.data);
                setName('');
                setEmail('');
                if (response.data.status == true) {
                    updateListStaff();
                    Alert.alert('Thông báo!', response.data.message, [
                        { text: 'OK', onPress: () => navigation.goBack() },
                    ]);
                } else {
                    Alert.alert('Cập nhật thất bại!', response.data.message, [{ text: 'OK', onPress: () => {} }]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function updateListStaff() {
        request
            .get(API.listStaff, {
                headers: { 'Content-Type': 'application/json', authorization: user.accessToken },
            })
            .then((response) => {
                console.log(response.data);

                if (response.status == true) {
                    setListStaff(response.data);
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
    return (
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginLeft: -30,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={stylesButton.btn_back}>
                        <Icon name="chevron-back" size={25} color="#021A5A" />
                    </View>
                </TouchableOpacity>
                <Text style={[stylesAllTour.title, { marginLeft: 10 }]}>Cập nhật thông tin nhân viên</Text>
                <TouchableOpacity
                    onPress={() => {
                        if (type) addStaff();
                        else updateStaff();
                    }}
                >
                    <Text style={stylesAllTour.title}>Lưu</Text>
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Image
                    source={{
                        uri: `${imageUrl}`,
                    }}
                    style={stylesManage.img}
                />

                <Text style={stylesManage.txt_name}>{name}</Text>
                <TouchableOpacity
                    onPress={() => {
                        chooseImage();
                    }}
                >
                    <Text style={[stylesManage.txt_name, { fontSize: 16, fontWeight: 'normal' }]}>Đổi ảnh</Text>
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
                        defaultValue={name}
                        onChangeText={(newText) => {
                            setName(newText);
                        }}
                    />
                    <AntDesign name="check" size={20} color="#0D6EFD" />
                </View>
            </View>
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
                        defaultValue={email}
                        editable={type}
                        onChangeText={(newText) => {
                            setEmail(newText);
                        }}
                    />
                    <AntDesign name="check" size={20} color="#0D6EFD" />
                </View>
            </View>
            {!type ? (
                <View style={{ marginTop: 20 }}>
                    <Text style={stylesManage.title}>Trạng thái</Text>
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
                        <TextInput defaultValue={staff?.status} editable={false} />
                        <AntDesign name="check" size={20} color="#0D6EFD" />
                    </View>
                </View>
            ) : (
                ''
            )}

            {!type ? (
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (staff.idStatus == 7) changeStateStaff();
                        }}
                    >
                        <View style={[stylesTour.btn, { width: 150 }]}>
                            <Text style={stylesTour.txt_btn}>Mở khóa</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            if (staff.idStatus == 5) changeStateStaff();
                        }}
                    >
                        <View style={[stylesTour.btn, { width: 150 }]}>
                            <Text style={stylesTour.txt_btn}>Khóa tài khoản</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                ''
            )}
        </SafeAreaView>
    );
}

export default EditInforStaffScreen;
