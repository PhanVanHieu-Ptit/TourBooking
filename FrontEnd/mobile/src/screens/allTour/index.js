import React, { useState, useContext, useEffect } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View, Alert } from 'react-native';
import MyTourCard from '../../components/allTour/Card';
import Find from '../../components/home/find';
import stylesAllTour from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import stylesButton from '../../components/general/actionButton/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AppContext } from '../../../App';
import * as request from '../../services/untils';
import API from '../../res/string';

function AllTourScreen({ route, navigation }) {
    const { listTour, setListTour } = useContext(AppContext);
    useEffect(() => {
        async function getListTour() {
            await request
                .get(API.listTour, {})
                .then((response) => {
                    console.log(response.data);

                    if (response.status == true) {
                        setListTour(response.data);
                        setMasterDataSource(response.data);
                        setFilteredDataSource(response.data);
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
        getListTour();
    }, []);

    const [masterDataSource, setMasterDataSource] = useState(listTour);
    const [filteredDataSource, setFilteredDataSource] = useState(listTour);
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
            <Find
                masterDataSource={masterDataSource}
                setMasterDataSource={setMasterDataSource}
                setFilteredDataSource={setFilteredDataSource}
                isFind={route.params.isFind}
            />
            <FlatList
                numColumns={2}
                data={filteredDataSource}
                renderItem={({ item }) => <MyTourCard props={item} navigation={navigation} />}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );
}

export default AllTourScreen;
