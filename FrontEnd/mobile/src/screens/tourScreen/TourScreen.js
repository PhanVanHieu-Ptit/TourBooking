import React, { useState, useEffect, useContext } from 'react';
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import stylesButton from '../../components/general/actionButton/styles';
import stylesAllTour from '../allTour/style';
import stylesTour from './styles';
import { launchImageLibrary } from 'react-native-image-picker';
import COLOR from '../../res/color';
import DatePicker from 'react-native-neat-date-picker';
import moment from 'moment';
import CheckBox from 'react-native-check-box';
import * as request from '../../services/untils';
import API from '../../res/string';
import SelectDropdown from 'react-native-select-dropdown';
import { NavigationActions } from 'reac';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AppContext } from '../../../App';
import { uploadImage, deleteImage } from '../../services/untils/uploadImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

let nextId = 0;
function TourScreen({ route, navigation }) {
    const { user, setUser, setIsLogin, setListTour, setHistoryOrder, setListOrder, setListStaff } =
        useContext(AppContext);
    const type = route.params?.type;

    const tour = route.params?.tour;

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [name, setName] = useState(tour != undefined ? tour.name : '');
    const [detailPickUpPoint, setDetailPickUpPoint] = useState(tour != undefined ? tour.detailPickUpPoint : '');
    const [detailTourDestination, setDetailTourDestination] = useState(
        tour != undefined ? tour.detailTourDestination : '',
    );
    const [tourIntro, setTourIntro] = useState(tour != undefined ? tour.tourIntro : '');
    const [tourDetail, setTourDetail] = useState(tour != undefined ? tour.tourDetail : '');
    const [pickUpPoint, setPickUpPoint] = useState(tour != undefined ? tour.pickUpPoint : '');
    const [totalDay, setTotalDay] = useState(tour != undefined ? tour.totalDay + '' : '');
    const [minQuantity, setMinQuantity] = useState(tour != undefined ? tour.minQuantity + '' : '');
    const [maxQuantity, setMaxQuantity] = useState(tour != undefined ? tour.maxQuantity + '' : '');
    const [normalPenaltyFee, setNormalPenaltyFee] = useState(tour != undefined ? tour.normalPenaltyFee + '' : '');
    const [strictPenaltyFee, setStrictPenaltyFee] = useState(tour != undefined ? tour.strictPenaltyFee + '' : '');
    const [minDate, setMinDate] = useState(tour != undefined ? tour.minDate + '' : '');
    const [tourGuide, setTourGuide] = useState(tour != undefined ? (tour.tourGuide == '1' ? true : false) : false);
    const [price, setPrice] = useState(tour != undefined ? tour.price + '' : '');
    const [tourDestination, setTourDestination] = useState(tour != undefined ? tour.tourDestination : '');
    const [featured, setFeatured] = useState(tour != undefined ? (tour.featured == '1' ? true : false) : false);

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
                    setIsLogin(false);
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

    // const checkData = () => {
    //     if (name.trim().length == 0) {
    //         Alert.alert('Thông báo!', 'Không được để trống tên tour!', [
    //             { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         ]);
    //         return false;
    //     }
    //     if (tourIntro.trim().length == 0) {
    //         Alert.alert('Thông báo!', 'Không được để trống giới thiệu tour!', [
    //             { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         ]);
    //         return false;
    //     }
    //     if (tourDetail.trim().length == 0) {
    //         Alert.alert('Thông báo!', 'Không được để trống chi tiết tour!', [
    //             { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         ]);
    //         return false;
    //     }
    //     if (pickUpPoint.trim().length == 0) {
    //         Alert.alert('Thông báo!', 'Không được để trống điểm đón!', [
    //             { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         ]);
    //         return false;
    //     }
    //     if (tourDestination.trim().length == 0) {
    //         Alert.alert('Thông báo!', 'Không được để trống điểm đến!', [
    //             { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         ]);
    //         return false;
    //     }
    //     if (Number(totalDay) <= 0) {
    //         Alert.alert('Thông báo!', 'Số ngày phải lớn hơn 0!', [
    //             { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         ]);
    //         return false;
    //     }
    //     if (Number(minQuantity) <= 0) {
    //         Alert.alert('Thông báo!', 'Số người tối thiểu phải lớn hơn 0!', [
    //             { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         ]);
    //         return false;
    //     }
    //     if (Number(maxQuantity) <= 0) {
    //         Alert.alert('Thông báo!', 'Số người tối đa ngày phải lớn hơn 0!', [
    //             { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         ]);
    //         return false;
    //     }
    //     if (Number(maxQuantity) < Number(minQuantity)) {
    //         Alert.alert('Thông báo!', 'Số người tối đa  phải lớn hơn hoặc bằng số  người tối thiểu!', [
    //             { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         ]);
    //         return false;
    //     }
    //     if (Number(normalPenaltyFee) <= 0) {
    //         Alert.alert('Thông báo!', 'Mức hủy 1 phải lớn hơn 0!', [
    //             { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         ]);
    //         return false;
    //     }
    //     if (Number(strictPenaltyFee) <= 0) {
    //         Alert.alert('Thông báo!', 'Mức hủy 2 phải lớn hơn 0!', [
    //             { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         ]);
    //         return false;
    //     }
    //     if (Number(strictPenaltyFee) < Number(strictPenaltyFee)) {
    //         Alert.alert('Thông báo!', 'Mức hủy 2 phải lớn hơn 0!', [
    //             { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         ]);
    //         return false;
    //     }
    //     if (Number(minDate) <= 0) {
    //         Alert.alert('Thông báo!', 'Thời điểm áp dụng mức hủy 2 phải lớn hơn 0!', [
    //             { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         ]);
    //         return false;
    //     }
    //     if (Number(price) <= 0) {
    //         Alert.alert('Thông báo!', 'Giá phải lớn hơn 0!', [
    //             { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         ]);
    //         return false;
    //     }
    //     return true;
    // };

    const openDatePicker = () => {
        setShowDatePicker(true);
    };

    const onCancel = () => {
        // You should close the modal in here
        setShowDatePicker(false);
    };

    const onConfirm = (date) => {
        // You should close the modal in here
        setShowDatePicker(false);
        setDate(date);
        console.log('date: ', date);
    };

    // const [imgPath, setImgPath] = useState(`https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png`);

    // const [responseImage, setResponseImage] = useState('');

    const [listImage, setListImage] = useState([]);

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

                // setImgPath(response.assets[0].uri);
                // setListImage(listTemp);
                setListImage(
                    // Replace the state
                    [
                        // with a new array
                        ...listImage, // that contains all the old items
                        { id: nextId++, uri: response.assets[0].uri }, // and one new item at the end
                    ],
                );

                // console.log('listImage: ', listImage);
                // setResponseImage(response);
            }
        });
    };

    const [listAddress, setListAddress] = useState([]);

    useEffect(() => {
        function loadProvinces() {
            request
                .get(API.listAddress)
                .then((response) => {
                    console.log(response);

                    if (response.status == true) {
                        setListAddress(response.data);
                        updateListImage();
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
        const updateListImage = () => {
            if (tour != undefined) {
                let list = [];
                for (const img in tour.imageUrl) {
                    list.push({ id: nextId++, uri: tour.imageUrl[img] });
                }
                setListImage([...list]);
            }
        };
        loadProvinces();
        // updateListImage();
    }, []);

    const addImage = async () => {
        var images = [];
        for (let i in listImage) {
            const url = await uploadImage(listImage[i].uri);
            images.push(url);
        }
        return images;
    };

    const addTour = async () => {
        const listUrlImages = await addImage();
        request
            .postPrivate(
                API.addTour,
                {
                    name: name,
                    startDate: moment(date).format('yyyy-MM-DD HH:mm:ss'),
                    totalDay: totalDay,
                    minQuantity: minQuantity,
                    maxQuantity: maxQuantity,
                    normalPenaltyFee: normalPenaltyFee,
                    strictPenaltyFee: strictPenaltyFee,
                    minDate: minDate,
                    tourGuide: tourGuide,
                    tourIntro: tourIntro,
                    tourDetail: tourDetail,
                    pickUpPoint: pickUpPoint,
                    tourDestination: tourDestination,
                    detailPickUpPoint: detailPickUpPoint,
                    detailTourDestination: detailTourDestination,
                    price: price,
                    featured: featured,
                    tourPictures: listUrlImages,
                    // role: 'staff',
                },
                { 'Content-Type': 'application/json', authorization: user.accessToken },
            )
            .then((response) => {
                console.log(response.data);
                updateListTour();

                if (response.data.status == true) {
                    Alert.alert('Thông báo!', 'Thêm thành công!', [{ text: 'OK', onPress: () => {} }]);
                } else {
                    if (response.data.message == 'Token đã hết hạn') {
                        getRefreshToken();
                    } else Alert.alert('Thêm thất bại!', response.data.message, [{ text: 'OK', onPress: () => {} }]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateTour = async () => {
        const listUrlImages = await addImage();
        request
            .postPrivate(
                '/tour/' + tour.idTour + '/update',
                {
                    idTour: tour.idTour,
                    name: name,
                    startDate: moment(date).format('yyyy-MM-DD HH:mm:ss'),
                    totalDay: totalDay,
                    minQuantity: minQuantity,
                    maxQuantity: maxQuantity,
                    normalPenaltyFee: normalPenaltyFee,
                    strictPenaltyFee: strictPenaltyFee,
                    minDate: minDate,
                    tourGuide: tourGuide,
                    tourIntro: tourIntro,
                    tourDetail: tourDetail,
                    pickUpPoint: pickUpPoint,
                    tourDestination: tourDestination,
                    detailPickUpPoint: pickUpPoint,
                    detailTourDestination: tourDestination,
                    price: price,
                    featured: featured,
                    tourPictures: listUrlImages,
                    // role: 'staff',
                },
                { 'Content-Type': 'application/json', authorization: user.accessToken },
                'PUT',
            )
            .then((response) => {
                console.log(response.data);

                if (response.data.status == true) {
                    Alert.alert('Thông báo!', 'Cập nhật thành công!', [{ text: 'OK', onPress: () => {} }]);
                } else {
                    if (response.data.message == 'Token đã hết hạn') {
                        getRefreshToken();
                    } else
                        Alert.alert('Cập nhật thất bại!', response.data.message, [{ text: 'OK', onPress: () => {} }]);
                }
                updateListTour();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const alertDelete = () => {
        Alert.alert(
            'Cảnh báo',
            'Bạn có chắc chắn muốn xóa tour này?',
            [
                {
                    text: 'Xóa',
                    onPress: () => deleteTour(),
                },
                {
                    text: 'Không',
                    onPress: () => console.log('delete'),
                },
            ],
            {
                cancelable: true,
            },
        );
    };

    const deleteTour = async () => {
        // const listUrlImages = await addImage();
        request
            .postPrivate(
                '/tour/' + tour.idTour + '/delete',
                {
                    idTour: tour.idTour,
                },
                { 'Content-Type': 'application/json', authorization: user.accessToken },
                'DELETE',
            )
            .then((response) => {
                console.log(response.data);
                navigation.goBack();
                updateListTour();

                if (response.data.status == true) {
                    Alert.alert('Thông báo!', 'Xóa thành công!', [{ text: 'OK', onPress: () => {} }]);
                } else {
                    if (response.data.message == 'Token đã hết hạn') {
                        getRefreshToken();
                    } else Alert.alert('Xóa thất bại!', response.data.message, [{ text: 'OK', onPress: () => {} }]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    function updateListTour() {
        request
            .get(API.listTour, {
                headers: { 'Content-Type': 'application/json', authorization: user.accessToken },
            })
            .then((response) => {
                console.log(response.data);

                if (response.status == true) {
                    setListTour(response.data);
                } else {
                    if (response.message == 'Token đã hết hạn') {
                        getRefreshToken();
                    } else
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
        <ScrollView>
            <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center' }}>
                <DatePicker isVisible={showDatePicker} mode={'single'} onCancel={onCancel} onConfirm={onConfirm} />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginLeft: -150,
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
                    <Text style={stylesAllTour.title}>{type == 'edit' ? 'Cập nhật tour' : 'Thêm tour'}</Text>
                </View>

                <View style={{ width: 320, marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={stylesTour.title}>Tên tour</Text>
                        <Text style={{}}>#{tour?.idTour}</Text>
                    </View>
                    <TextInput
                        placeholder="Nhập tên tour vào đây"
                        style={stylesTour.input}
                        value={name}
                        onChangeText={(newText) => setName(newText)}
                    />
                </View>

                <View style={{ width: 320, marginTop: 20 }}>
                    <Text style={stylesTour.title}>Giới thiệu</Text>
                    <TextInput
                        placeholder="Nhập nội dung giới thiệu vào đây"
                        style={stylesTour.input}
                        value={tourIntro}
                        onChangeText={(newText) => setTourIntro(newText)}
                    />
                </View>
                <View style={{ width: 320, marginTop: 20 }}>
                    <Text style={stylesTour.title}>Mô tả lịch trình</Text>
                    <TextInput
                        multiline
                        numberOfLines={20}
                        placeholder="Nhập mô tả tour vào đây"
                        style={[stylesTour.input, { height: 200 }]}
                        value={tourDetail}
                        onChangeText={(newText) => setTourDetail(newText)}
                    />
                </View>
                <View style={{ width: 320, marginTop: 20 }}>
                    <Text style={stylesTour.title}>Địa điểm đến</Text>
                    {/* <SelectList setSelected={(val) => setSelected(val)} data={data} save="value" /> */}
                    <SelectDropdown
                        data={listAddress}
                        // defaultValueByIndex={1}
                        // defaultValue={address}
                        onSelect={(selectedItem, index) => {
                            setTourDestination(selectedItem);
                            console.log(selectedItem, index);
                        }}
                        defaultButtonText={'Chọn tỉnh/thành phố'}
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
                                <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={14} />
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
                    <TextInput
                        placeholder="Nhập quận huyện vào đây"
                        style={[stylesTour.input, { marginTop: 5 }]}
                        value={detailTourDestination}
                        onChangeText={(newText) => setDetailTourDestination(newText)}
                    />
                </View>
                <View style={{ width: 320, marginTop: 20 }}>
                    <Text style={stylesTour.title}>Địa điểm đón</Text>

                    {/* <SelectList setSelected={(val) => setSelected(val)} data={data} save="value" /> */}
                    <SelectDropdown
                        data={listAddress}
                        // defaultValueByIndex={1}
                        // defaultValue={address}
                        onSelect={(selectedItem, index) => {
                            setPickUpPoint(selectedItem);
                            console.log(selectedItem, index);
                        }}
                        defaultButtonText={'Chọn tỉnh/thành phố'}
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
                                <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={14} />
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

                    <TextInput
                        placeholder="Nhập quận huyện vào đây"
                        style={[stylesTour.input, { marginTop: 5 }]}
                        value={detailPickUpPoint}
                        onChangeText={(newText) => setDetailPickUpPoint(newText)}
                    />
                </View>
                <View style={{ width: 320, marginTop: 20 }}>
                    <Text style={stylesTour.title}>Ảnh minh họa</Text>

                    <TouchableOpacity
                        onPress={() => {
                            chooseImage();
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: COLOR.primary,
                                width: 100,
                                borderRadius: 5,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                            }}
                        >
                            <Text style={{ color: '#FFFFFF' }}>Thêm ảnh </Text>
                        </View>
                    </TouchableOpacity>

                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            flex: 1,
                        }}
                    >
                        {listImage.map((item) => (
                            // console.log('item: ', item),
                            <View
                                key={item.id}
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 40,
                                    marginRight: 8,
                                }}
                            >
                                <Image
                                    source={{ uri: `${item.uri}` }}
                                    style={{ height: 85, width: 85, borderRadius: 6 }}
                                />
                                <TouchableOpacity
                                    hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
                                    onPress={() => {
                                        setListImage(listImage.filter((a) => a.id !== item.id));
                                    }}
                                >
                                    <FontAwesome5
                                        name="times"
                                        size={15}
                                        color="#021A5A"
                                        style={{ marginLeft: 3, marginTop: -5 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={{ width: 320, marginTop: 20, flexDirection: 'row' }}>
                    <View>
                        <Text style={stylesTour.title}>Ngày khởi hành</Text>
                        <TouchableOpacity onPress={openDatePicker}>
                            <Text style={stylesTour.input}>{moment(date.date).format('DD/MM/YYYY')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 50 }}>
                        <Text style={stylesTour.title}>Số ngày </Text>
                        <TextInput
                            keyboardType="numeric"
                            placeholder="Nhập số ngày"
                            style={stylesTour.input}
                            value={totalDay}
                            onChangeText={(newText) => setTotalDay(newText)}
                        />
                    </View>
                </View>
                <View style={{ width: 320, marginTop: 20, flexDirection: 'row' }}>
                    <View>
                        <Text style={stylesTour.title}>Số người tối thiểu</Text>
                        <TextInput
                            keyboardType="numeric"
                            placeholder="Nhập số người tối thiểu"
                            style={stylesTour.input}
                            defaultValue={minQuantity}
                            onChangeText={(newText) => setMinQuantity(newText)}
                        />
                    </View>
                    <View style={{ marginLeft: 30 }}>
                        <Text style={stylesTour.title}>Số người tối đa </Text>
                        <TextInput
                            keyboardType="numeric"
                            placeholder="Nhập số người tối đa"
                            style={stylesTour.input}
                            defaultValue={maxQuantity}
                            onChangeText={(newText) => setMaxQuantity(newText)}
                        />
                    </View>
                </View>
                <View
                    style={{
                        width: 320,
                        marginTop: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text style={stylesTour.title}>Mức hủy 1 (%)</Text>
                    <TextInput
                        keyboardType="numeric"
                        placeholder="Nhập mức hủy 1"
                        style={[stylesTour.input, { marginLeft: 80 }]}
                        value={normalPenaltyFee}
                        onChangeText={(newText) => setNormalPenaltyFee(newText)}
                    />
                </View>
                <View
                    style={{
                        width: 320,
                        marginTop: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text style={stylesTour.title}>Mức hủy 2 (%)</Text>
                    <TextInput
                        keyboardType="numeric"
                        placeholder="Nhập mức hủy 2"
                        style={[stylesTour.input, { marginLeft: 80 }]}
                        value={strictPenaltyFee}
                        onChangeText={(newText) => setStrictPenaltyFee(newText)}
                    />
                </View>
                <View
                    style={{
                        width: 320,
                        marginTop: 20,
                    }}
                >
                    <Text style={stylesTour.title}>Thời điểm áp dụng mức hủy 2</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TextInput
                            keyboardType="numeric"
                            placeholder="Nhập số ngày"
                            style={[stylesTour.input, { marginLeft: 80 }]}
                            value={minDate}
                            onChangeText={(newText) => setMinDate(newText)}
                        />
                        <Text style={stylesTour.txt}>ngày trước khởi hành</Text>
                    </View>
                </View>
                <View
                    style={{
                        width: 320,
                        marginTop: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text style={stylesTour.title}>Hướng dẫn viên du lịch</Text>

                    <CheckBox
                        style={{ flex: 1, padding: 10 }}
                        onClick={() => {
                            setTourGuide(!tourGuide);
                        }}
                        isChecked={tourGuide}
                    />
                </View>
                <View
                    style={{
                        width: 320,
                        marginTop: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <Text style={stylesTour.title}>Đánh dấu tour nổi bật</Text>

                    <CheckBox
                        style={{ flex: 1, padding: 10 }}
                        onClick={() => {
                            setFeatured(!featured);
                        }}
                        isChecked={featured}
                    />
                </View>
                <View style={{ width: 320, marginTop: 20 }}>
                    <Text style={stylesTour.title}>Giá</Text>
                    <MaskInput
                        style={[stylesTour.input]}
                        placeholder="Nhập giá tour"
                        value={price}
                        mask={createNumberMask({
                            prefix: ['đ', '', ''],
                            delimiter: '.',
                            separator: ',',
                            precision: 3,
                        })}
                        onChangeText={(masked, unmasked) => {
                            setPrice(unmasked);
                        }}
                    />
                </View>
                {type == 'edit' ? (
                    <TouchableOpacity
                        onPress={() => {
                            alertDelete();
                        }}
                    >
                        <View
                            style={[
                                stylesTour.btn,
                                {
                                    backgroundColor: '#FFFFFF',
                                    borderWidth: 1,
                                    borderColor: COLOR.primary,
                                },
                            ]}
                        >
                            <Text style={[stylesTour.txt_btn, { color: COLOR.primary }]}>Xóa tour</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                    ''
                )}

                <TouchableOpacity
                    onPress={() => {
                        if (type == 'add') {
                            addTour();
                        } else if (type == 'edit') {
                            updateTour();
                        }
                    }}
                >
                    <View style={stylesTour.btn}>
                        <Text style={stylesTour.txt_btn}>{type == 'edit' ? 'Cập nhật' : 'Thêm tour'}</Text>
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

export default TourScreen;
