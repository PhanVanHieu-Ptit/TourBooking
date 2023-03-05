import React, { useState, useEffect, useContext } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View, Alert, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import stylesButton from '../../components/general/actionButton/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import stylesAllTour from '../allTour/style';
import CardOrder from '../../components/HistoryOrder.js/CardOrder';
import request from '../../services/untils';
import API from '../../res/string';
import { AppContext } from '../../../App';
import SelectDropdown from 'react-native-select-dropdown';

function HistoryOrderScreen({ navigation }) {
    const { user, historyOrder, setHistoryOrder } = useContext(AppContext);
    const [selected, setSelected] = useState('Tất cả');
    const [listStatus, setListStatus] = useState(['Tất cả']);

    useEffect(() => {
        if (user == '' || user == undefined || user == null) {
            Alert.alert('Bạn chưa đăng nhập!', 'Bạn hãy đăng nhập ngay để xem lịch sử đặt của bạn.', [
                { text: 'OK', onPress: () => navigation.replace('Login') },
            ]);
        } else {
            request
                .get(API.historyOrder, {
                    id: user.id,
                })
                .then((response) => {
                    console.log(response.data);

                    if (response.data.status == true) {
                        setHistoryOrder(response.data.data);
                    } else {
                        Alert.alert('Thông báo!', response.data.message + '', [
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        getStatus();
    }, []);

    async function getStatus() {
        await request
            .get(API.listStatus + '?type=tourorder')
            .then((response) => {
                console.log(response.data);

                if (response.data.status == true) {
                    setListStatus(listStatus.concat(response.data.data));
                } else {
                    Alert.alert('Thông báo!', response.data.message + '', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        filterData();
        console.log('historyOrder: ', historyOrder);
    }, [selected]);

    function filterData() {
        request
            .get(API.historyOrder + '?id=' + user.id + '&status=' + selected)
            .then((response) => {
                console.log(response.data);

                if (response.data.status == true) {
                    setHistoryOrder(response.data.data);
                } else {
                    Alert.alert('Thông báo!', response.data.message + '', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // const DATA = [
    //     {
    //         id: 1,
    //         name: 'Biển Ngọc',
    //         tourDestination: 'Phú Quốc',
    //         startDate: '25/01/2023',
    //         totalDay: '2',
    //         price: '1500',
    //         imageUrl:
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
    //         state: 'Chờ xác nhận',
    //     },
    //     {
    //         id: 2,
    //         name: 'Biển Ngọc',
    //         tourDestination: 'Phú Quốc',
    //         startDate: '25/01/2023',
    //         totalDay: '2',
    //         price: '1500',
    //         imageUrl:
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
    //         state: 'Đã xác nhận',
    //     },
    //     {
    //         id: 3,
    //         name: 'Biển Ngọc',
    //         tourDestination: 'Phú Quốc',
    //         startDate: '25/01/2023',
    //         totalDay: '2',
    //         price: '1500',
    //         imageUrl:
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
    //         state: 'Đã hủy',
    //     },
    //     {
    //         id: 4,
    //         name: 'Biển Ngọc',
    //         tourDestination: 'Phú Quốc',
    //         startDate: '25/01/2023',
    //         totalDay: '2',
    //         price: '1500',
    //         imageUrl:
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
    //         state: 'Hoàn thành',
    //     },
    //     {
    //         id: 5,
    //         name: 'Biển Ngọc',
    //         tourDestination: 'Phú Quốc',
    //         startDate: '25/01/2023',
    //         totalDay: '2',
    //         price: '1500',
    //         imageUrl:
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
    //         state: 'Đang sử dụng',
    //     },
    // ];
    // const tourOrder = {
    //     idCustomer: 1,
    //     idTour: 1,
    //     orderDateTime: '12-12-2023',
    //     quantity: 3,
    //     note: '',
    //     totalMoney: 1500,
    //     cancelDate: '',
    //     idStatus: 'Đặt thành công',
    // };

    // const [masterDataSource, setMasterDataSource] = useState(DATA);
    // const [filteredDataSource, setFilteredDataSource] = useState(DATA);
    // const searchFilterFunction = (text) => {
    //     // Check if searched text is not blank
    //     if (text) {
    //         // Inserted text is not blank
    //         // Filter the masterDataSource
    //         // Update FilteredDataSource
    //         const newData = masterDataSource.filter(function (item) {
    //             const itemData = item.idStatus ? item.idStatus.toUpperCase() : ''.toUpperCase();
    //             const textData = text.toUpperCase();
    //             return itemData.indexOf(textData) > -1;
    //         });
    //         setFilteredDataSource(newData);
    //     } else {
    //         // Inserted text is blank
    //         // Update FilteredDataSource with masterDataSource
    //         setFilteredDataSource(props.masterDataSource);
    //     }
    // };

    return (
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginLeft: -150,
                }}
            >
                <TouchableOpacity>
                    <View style={stylesButton.btn_back}>
                        <Icon name="chevron-back" size={25} color="#021A5A" />
                    </View>
                </TouchableOpacity>
                <Text style={stylesAllTour.title}>Lịch sử đặt</Text>
            </View>
            <View style={{ marginLeft: 200 }}>
                <SelectDropdown
                    data={listStatus}
                    // defaultValueByIndex={1}
                    defaultValue={'Tất cả'}
                    onSelect={(selectedItem, index) => {
                        setSelected(selectedItem);
                        console.log(selectedItem, index);
                    }}
                    defaultButtonText={'Chọn trạng thái '}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={styles.dropdown1BtnStyle}
                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={(isOpened) => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={14} />;
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

            <ScrollView>
                {historyOrder.map((item) => (
                    <CardOrder item={item} key={item.idTourOrder} navigation={navigation} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        width: 160,
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

export default HistoryOrderScreen;
