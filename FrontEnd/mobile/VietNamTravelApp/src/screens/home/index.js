import React from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import Find from '../../components/home/find';
import Header from '../../components/home/header';
import stylesHome from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import COLOR from '../../res/color';
import { CardCommingTour, CardNewTour } from '../../components/home/card';

function Home({ navigation }) {
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
            descript: 'Chuyen di thu vi',
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
    ];
    return (
        <ScrollView>
            <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Header />
                <Find />
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('AllTour');
                        }}
                    >
                        <View style={stylesHome.txt1}>
                            <Text style={{ color: COLOR.primary }}>Xem tất cả </Text>
                            <Icon name="chevron-forward" size={15} color={COLOR.primary} style={{ marginTop: 2 }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={stylesHome.txt2}>Các tour mới nhất</Text>
                    </View>
                    <FlatList
                        horizontal
                        // style={{flex: 1}}
                        data={DATA}
                        renderItem={({ item }) => <CardNewTour props={item} navigation={navigation} />}
                        keyExtractor={(item) => item.id}
                    />
                    <View style={{ marginTop: 50 }}>
                        <Text style={stylesHome.txt2}>Các tour sắp diễn ra</Text>
                    </View>
                    {DATA.map((item) => (
                        <CardCommingTour tour={item} key={item.id} navigation={navigation} screen="DetailTour" />
                    ))}
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default Home;
