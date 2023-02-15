import React, { useState } from 'react';
import { SafeAreaView, Image, View, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import stylesButton from '../../components/general/actionButton/styles';
import stylesAllTour from '../allTour/style';
import stylesManage from './styles';
import stylesTour from '../tourScreen/styles';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

function EditInforStaffScreen({ route, navigation }) {
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
                <TouchableOpacity>
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
                    <TextInput placeholder="Nhập họ tên của bạn" value={name} />
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
                    <TextInput placeholder="Nhập email của bạn" value={email} />
                    <AntDesign name="check" size={20} color="#0D6EFD" />
                </View>
            </View>
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
                    <TextInput placeholder="Chọn trạng thái" value={status} editable={false} />
                    <AntDesign name="check" size={20} color="#0D6EFD" />
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <TouchableOpacity>
                    <View style={[stylesTour.btn, { width: 150 }]}>
                        <Text style={stylesTour.txt_btn}>Cấp tài khoản</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[stylesTour.btn, { width: 150 }]}>
                        <Text style={stylesTour.txt_btn}>Khóa tài khoản</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default EditInforStaffScreen;
