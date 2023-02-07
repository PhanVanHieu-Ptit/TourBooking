import React, { useState } from 'react';
import {
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import stylesButton from '../../components/general/actionButton/styles';
import stylesAllTour from '../allTour/style';
import stylesTour from './styles';
import { SelectList } from 'react-native-dropdown-select-list';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import COLOR from '../../res/color';
import { Checkbox } from 'react-native-paper';
import DatePicker from 'react-native-neat-date-picker';

function TourScreen({ route, navigation }) {
    const tour = route.params?.tour;

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [name, setName] = useState(tour != undefined ? tour.name : '');
    const [tourIntro, setTourIntro] = useState(tour != undefined ? tour.tourIntro : '');
    const [tourDetail, setTourDetail] = useState(tour != undefined ? tour.tourDetail : '');
    const [pickUpPoint, setPickUpPoint] = useState(tour != undefined ? tour.pickUpPoint : '');
    const [totalDay, setTotalDay] = useState(tour != undefined ? tour.totalDay + '' : '');
    const [minQuantity, setMinQuantity] = useState(tour != undefined ? tour.minQuantity + '' : '');
    const [maxQuantity, setMaxQuantity] = useState(tour != undefined ? tour.maxQuantity + '' : '');
    const [normalPenaltyFee, setNormalPenaltyFee] = useState(tour != undefined ? tour.normalPenaltyFee + '' : '');
    const [strictPenaltyFee, setStrictPenaltyFee] = useState(tour != undefined ? tour.strictPenaltyFee + '' : '');
    const [minDate, setMinDate] = useState(tour != undefined ? tour.minDate + '' : '');
    const [tourGuide, setTourGuide] = useState(tour != undefined ? tour.tourGuide : false);
    const [price, setPrice] = useState(tour != undefined ? tour.price + '' : '');
    const [tourDestination, setTourDestination] = useState(tour != undefined ? tour.tourDestination : '');

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

        // The parameter 'date' is a Date object so that you can use any Date prototype method.
        console.log(date.getDate());
    };

    const [selected, setSelected] = useState('');

    // const [checked, setChecked] = React.useState(false);

    const data = [
        { key: '1', value: 'Mobiles', disabled: true },
        { key: '2', value: 'Appliances' },
        { key: '3', value: 'Cameras' },
        { key: '4', value: 'Computers', disabled: true },
        { key: '5', value: 'Vegetables' },
        { key: '6', value: 'Diary Products' },
        { key: '7', value: 'Drinks' },
    ];
    const [imgPath, setImgPath] = useState(`https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png`);

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
                    <Text style={stylesAllTour.title}>Thêm tour</Text>
                </View>

                <View style={{ width: 320, marginTop: 20 }}>
                    <Text style={stylesTour.title}>Tên tour</Text>
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
                        placeholder="Nhập mô tả tour vào đây"
                        style={stylesTour.input}
                        value={tourDetail}
                        onChangeText={(newText) => setTourDetail(newText)}
                    />
                </View>
                <View style={{ width: 320, marginTop: 20 }}>
                    <Text style={stylesTour.title}>Địa điểm đến</Text>
                    <SelectList setSelected={(val) => setSelected(val)} data={data} save="value" />
                    <TextInput
                        placeholder="Nhập quận huyện vào đây"
                        style={[stylesTour.input, { marginTop: 5 }]}
                        value={tourDestination}
                        onChangeText={(newText) => setTourDestination(newText)}
                    />
                </View>
                <View style={{ width: 320, marginTop: 20 }}>
                    <Text style={stylesTour.title}>Địa điểm đón</Text>

                    <SelectList setSelected={(val) => setSelected(val)} data={data} save="value" />

                    <TextInput
                        placeholder="Nhập quận huyện vào đây"
                        style={[stylesTour.input, { marginTop: 5 }]}
                        value={pickUpPoint}
                        onChangeText={(newText) => setPickUpPoint(newText)}
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
                    <Image source={{ uri: `${imgPath}` }} style={{ height: 150, width: 150 }} />
                </View>
                <View style={{ width: 320, marginTop: 20, flexDirection: 'row' }}>
                    <View>
                        <Text style={stylesTour.title}>Ngày khởi hành</Text>
                        <TouchableOpacity onPress={openDatePicker}>
                            <Text style={stylesTour.input}>{date.getDate()}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 50 }}>
                        <Text style={stylesTour.title}>Số ngày </Text>
                        <TextInput
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
                            placeholder="Nhập số người tối thiểu"
                            style={stylesTour.input}
                            value={minQuantity}
                            onChangeText={(newText) => setMinQuantity(newText)}
                        />
                    </View>
                    <View style={{ marginLeft: 30 }}>
                        <Text style={stylesTour.title}>Số người tối đa </Text>
                        <TextInput
                            placeholder="Nhập số người tối đa"
                            style={stylesTour.input}
                            value={maxQuantity}
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
                        placeholder="Nhập mức hủy 1"
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
                    <Checkbox
                        status={tourGuide ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setTourGuide(!tourGuide);
                        }}
                    />
                </View>
                <View style={{ width: 320, marginTop: 20 }}>
                    <Text style={stylesTour.title}>Giá</Text>
                    <TextInput
                        keyboardType="numeric"
                        placeholder="Nhập giá tour vào đây"
                        style={stylesTour.input}
                        value={price}
                        onChangeText={(newText) => setPrice(newText)}
                    />
                </View>
                <TouchableOpacity>
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
                <TouchableOpacity>
                    <View style={stylesTour.btn}>
                        <Text style={stylesTour.txt_btn}>Cập nhật</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
    );
}

export default TourScreen;
