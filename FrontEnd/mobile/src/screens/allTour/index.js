import React, { useState, useContext, useEffect } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View, Alert, ActivityIndicator } from 'react-native';
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
    const [paging, setPaging] = useState(1);
    const [loadingFooter, setLoadingFooter] = useState(false);
    const [numberTour, setNumberTour] = useState(0);

    // const [masterDataSource, setMasterDataSource] = useState(listTour);
    const [filteredDataSource, setFilteredDataSource] = useState(listTour);

    useEffect(() => {
        getNumberTour();
    }, []);

    useEffect(() => {
        getListTour();
    }, [paging]);

    async function getNumberTour() {
        try {
            const res = await request.get(API.numberTour);
            if (res.status === true) {
                setNumberTour(res.data[0].number);
            } else {
                Alert.alert('Thông báo!', res.message + '', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getListTour() {
        try {
            const response = await request.get(API.listTour + '?paging=' + paging, {});
            if (response.status == true) {
                setListTour((preState) => {
                    return [...preState, ...response.data];
                });
                setFilteredDataSource((preState) => {
                    return [...preState, ...response.data];
                });
                setLoadingFooter(false);
            } else {
                Alert.alert('Thông báo!', response.message + '', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
        } catch (error) {
            console.log(err);
        }
    }
    const loadMore = () => {
        if (Math.ceil(Number(numberTour) / 5 - 1) >= paging) {
            setLoadingFooter(true);
            setPaging((preState) => preState + 1);
        }
    };

    const renderFooter = () => {
        if (!loadingFooter) return null;
        return (
            <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator size="large" />
            </View>
        );
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
                masterDataSource={listTour}
                setMasterDataSource={setListTour}
                setFilteredDataSource={setFilteredDataSource}
                isFind={route.params.isFind}
            />

            <FlatList
                numColumns={2}
                data={filteredDataSource}
                renderItem={({ item }) => <MyTourCard props={item} navigation={navigation} />}
                keyExtractor={(item) => item.idTour}
                onMomentumScrollEnd={loadMore}
                // onEndReached={loadMore}
                // onEndReachedThreshold={0.1}
                ListFooterComponent={renderFooter}
            />
        </SafeAreaView>
    );
}

export default AllTourScreen;
