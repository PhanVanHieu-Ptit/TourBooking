import React, { useState, useEffect, useContext } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import stylesButton from '../../components/general/actionButton/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import stylesAllTour from '../allTour/style';
import CardOrder from '../../components/HistoryOrder.js/CardOrder';
import { SelectList } from 'react-native-dropdown-select-list';
import request from '../../services/untils';
import API from '../../res/string';
import { AppContext } from '../../../App';

function HistoryOrderScreen({ navigation }) {
    const { user, historyOrder, setHistoryOrder } = useContext(AppContext);
    const [selected, setSelected] = React.useState('Chờ xác nhận');

    useEffect(() => {
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
    }, []);

    const data = [
        { key: '1', value: 'Chờ xác nhận' },
        { key: '2', value: 'Đã xác nhận' },
        { key: '3', value: 'Đã hủy' },
        { key: '4', value: 'Hoàn thành' },
    ];
    const DATA = [
        {
            id: 1,
            name: 'Biển Ngọc',
            tourDestination: 'Phú Quốc',
            startDate: '25/01/2023',
            totalDay: '2',
            price: '1500',
            imageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
            state: 'Chờ xác nhận',
        },
        {
            id: 2,
            name: 'Biển Ngọc',
            tourDestination: 'Phú Quốc',
            startDate: '25/01/2023',
            totalDay: '2',
            price: '1500',
            imageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
            state: 'Đã xác nhận',
        },
        {
            id: 3,
            name: 'Biển Ngọc',
            tourDestination: 'Phú Quốc',
            startDate: '25/01/2023',
            totalDay: '2',
            price: '1500',
            imageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
            state: 'Đã hủy',
        },
        {
            id: 4,
            name: 'Biển Ngọc',
            tourDestination: 'Phú Quốc',
            startDate: '25/01/2023',
            totalDay: '2',
            price: '1500',
            imageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
            state: 'Hoàn thành',
        },
        {
            id: 5,
            name: 'Biển Ngọc',
            tourDestination: 'Phú Quốc',
            startDate: '25/01/2023',
            totalDay: '2',
            price: '1500',
            imageUrl:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN-5vKEr-jLhY6GMshlfHI2HK4O-iwckHUrZaCbUUI9oehxv3QuVe5LglbSOkx5bSAu8k&usqp=CAU',
            state: 'Đang sử dụng',
        },
    ];
    const tourOrder = {
        idCustomer: 1,
        idTour: 1,
        orderDateTime: '12-12-2023',
        quantity: 3,
        note: '',
        totalMoney: 1500,
        cancelDate: '',
        idStatus: 'Đặt thành công',
    };

    const [masterDataSource, setMasterDataSource] = useState(DATA);
    const [filteredDataSource, setFilteredDataSource] = useState(DATA);
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = masterDataSource.filter(function (item) {
                const itemData = item.idStatus ? item.idStatus.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredDataSource(props.masterDataSource);
        }
    };

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
                <SelectList
                    defaultOption={{ key: '0', value: 'Tất cả' }}
                    setSelected={
                        (val) => {
                            searchFilterFunction(val);
                        }
                        // setSelected(val)
                    }
                    data={data}
                    save="value"
                />
            </View>

            <ScrollView>
                {historyOrder.map((item) => (
                    <CardOrder item={item} tourOrder={tourOrder} key={item.idTourOrder} navigation={navigation} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

export default HistoryOrderScreen;
