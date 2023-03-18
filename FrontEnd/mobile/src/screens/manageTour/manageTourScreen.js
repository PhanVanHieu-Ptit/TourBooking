import React, { useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View, ActivityIndicator } from 'react-native';
import Find from '../../components/home/find';
import Icon from 'react-native-vector-icons/Ionicons';
import stylesButton from '../../components/general/actionButton/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import stylesAllTour from '../allTour/style';
import { CardCommingTour } from '../../components/home/card';
import { AppContext } from '../../../App';
import API from '../../res/string';
import * as request from '../../services/untils';

function ManageTourScreen({ navigation }) {
    const { user, listTour, setListTour } = useContext(AppContext);

    // const [masterDataSource, setMasterDataSource] = useState(listTour);
    const [filteredDataSource, setFilteredDataSource] = useState(listTour);
    const [isLoading, setLoading] = useState(true);
    const [paging, setPaging] = useState(1);

    const loader = () => {
        if(isLoading){
            return <ActivityIndicator size={"small"} color={"#021A5A"}/>
        }
    }

    useEffect(() => {
        getListTour();
    }, []);

    useEffect(() => {
        setFilteredDataSource(listTour);
    }, [listTour]);

    async function getListTour() {
        try {
            const response = await request.get(API.listTour + '?paging=' + paging, {});
            if (response.status == true) {
                setLoading(false);
                setListTour((preState) => {
                    return [...preState, ...response.data];
                });
                setLoading(false);
                // setMasterDataSource(response.data);
                setFilteredDataSource((preState) => {
                    return [...preState, ...response.data];
                });
            } else {
                setLoading(false);
                Alert.alert('Thông báo!', response.message + '', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginLeft: -20,
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
                <Text style={stylesAllTour.title}>Quản lý tour</Text>
                <TouchableOpacity
                    style={[stylesAllTour.title, { marginLeft: 130 }]}
                    onPress={() => {
                        navigation.navigate('EditTour', { type: 'add' });
                    }}
                >
                    <Icon name="add" size={25} color="#021A5A" />
                </TouchableOpacity>
            </View>
            <Find
                masterDataSource={listTour}
                // setMasterDataSource={setMasterDataSource}
                setFilteredDataSource={setFilteredDataSource}
            />
            {loader()}
            <ScrollView>
                {filteredDataSource.map((item) => (
                    <CardCommingTour tour={item} key={item.idTour} navigation={navigation} screen="EditTour" />
                ))}
            </ScrollView>
            <View/>
        </SafeAreaView>
    );
}

export default ManageTourScreen;
