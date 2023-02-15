import React from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import stylesButton from '../../components/general/actionButton/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import stylesAllTour from '../allTour/style';
import CardOrder from '../../components/HistoryOrder.js/CardOrder';
import { SelectList } from 'react-native-dropdown-select-list';

function HistoryOrderScreen({ navigation }) {
    const [selected, setSelected] = React.useState('Chờ xác nhận');

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
                    defaultOption={{ key: '1', value: 'Chờ xác nhận' }}
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                />
            </View>

            <ScrollView>
                {DATA.map((item) => (
                    <CardOrder tour={item} tourOrder={tourOrder} key={item.id} navigation={navigation} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

export default HistoryOrderScreen;
