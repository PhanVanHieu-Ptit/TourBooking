import React from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';
import MyTourCard from '../../components/allTour/Card';
import Find from '../../components/home/find';
import stylesAllTour from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import stylesButton from '../../components/general/actionButton/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

function AllTourScreen({ navigation }) {
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
        },
    ];
    return (
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
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
                <Text style={stylesAllTour.title}>Tất cả các tour</Text>
            </View>
            <Find />
            <FlatList
                numColumns={2}
                data={DATA}
                renderItem={({ item }) => <MyTourCard props={item} navigation={navigation} />}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
}

export default AllTourScreen;
