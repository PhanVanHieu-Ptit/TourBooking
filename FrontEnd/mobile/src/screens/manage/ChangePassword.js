import React, { useState } from 'react';
import { SafeAreaView, Image, View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import stylesButton from '../../components/general/actionButton/styles';
import stylesAllTour from '../allTour/style';
import stylesManage from './styles';
import stylesTour from '../tourScreen/styles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

function ChangePassword({ route, navigation }) {
    const staff = route.params?.staff;
    const [imageUrl, setImageUrl] = useState(
        staff != undefined
            ? staff.imageUrl
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgBhcplevwUKGRs1P-Ps8Mwf2wOwnW_R_JIA&usqp=CAU',
    );
    const [name, setName] = useState(staff != undefined ? staff.name : '');
    const [email, setEmail] = useState(staff != undefined ? staff.email : '');
    const [status, setstatus] = useState(staff != undefined ? staff.status : '');
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

    const [seeOldPassWord, setSeeOldPassword] = useState(true);
    const [seeNewPassWord, setSeeNewPassword] = useState(true);
    const [seeConfirmPassWord, setSeeConfirmPassword] = useState(true);

    return (
        <ScrollView>
            <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginLeft: -150,
                    }}
                >
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={stylesButton.btn_back}>
                            <Icon name="chevron-back" size={25} color="#021A5A" />
                        </View>
                    </TouchableOpacity>
                    <Text style={[stylesAllTour.title, { marginLeft: 10 }]}>Đổi mật khẩu</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                    <Image
                        source={{
                            uri: `${imageUrl}`,
                        }}
                        style={stylesManage.img}
                    />

                    <Text style={stylesManage.txt_name}>{name}</Text>

                    <Text style={[stylesManage.txt_name, { fontSize: 16, fontWeight: 'normal' }]}>Khách hàng</Text>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={stylesManage.title}>Mật khẩu cũ</Text>
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
                        <TextInput placeholder="Nhập mật khẩu cũ của bạn" secureTextEntry={seeOldPassWord} />
                        <TouchableOpacity
                            onPress={() => {
                                setSeeOldPassword(!seeOldPassWord);
                            }}
                        >
                            {seeOldPassWord ? (
                                <FontAwesome5 name="eye-slash" size={20} color="#0D6EFD" />
                            ) : (
                                <FontAwesome5 name="eye" size={20} color="#0D6EFD" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={stylesManage.title}>Mật khẩu mới</Text>
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
                        <TextInput placeholder="Nhập mật khẩu mới" secureTextEntry={seeNewPassWord} />
                        <TouchableOpacity
                            onPress={() => {
                                setSeeNewPassword(!seeNewPassWord);
                            }}
                        >
                            {seeNewPassWord ? (
                                <FontAwesome5 name="eye-slash" size={20} color="#0D6EFD" />
                            ) : (
                                <FontAwesome5 name="eye" size={20} color="#0D6EFD" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginTop: 20 }}>
                    <Text style={stylesManage.title}>Xác nhận mật khẩu mới</Text>
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
                        <TextInput placeholder="Nhập lại mật khẩu mới" secureTextEntry={seeConfirmPassWord} />
                        <TouchableOpacity
                            onPress={() => {
                                setSeeConfirmPassword(!seeConfirmPassWord);
                            }}
                        >
                            {seeConfirmPassWord ? (
                                <FontAwesome5 name="eye-slash" size={20} color="#0D6EFD" />
                            ) : (
                                <FontAwesome5 name="eye" size={20} color="#0D6EFD" />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity>
                    <View style={[stylesTour.btn, { width: 320 }]}>
                        <Text style={stylesTour.txt_btn}>Xác nhận</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    );
}

export default ChangePassword;
