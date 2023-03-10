import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import stylesButton from '../../components/general/actionButton/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import stylesAllTour from '../allTour/style';
import SelectDropdown from 'react-native-select-dropdown';
import CardOrder from '../../components/mange/CardOrder';
import { AppContext } from '../../../App';
import * as request from '../../services/untils';
import API from '../../res/string';
import Find from '../../components/home/find';

function ManageOrderFollowStatus({ navigation }) {
    const { user, listOrder, setListOrder } = useContext(AppContext);
    const [selected, setSelected] = useState('Tất cả');
    const [listStatus, setListStatus] = useState(['Tất cả']);

    useEffect(() => {
        request
            .get(API.historyOrder, {
                headers: { 'Content-Type': 'application/json', authorization: user.accessToken },
            })
            .then((response) => {
                console.log(response.data);

                if (response.status == true) {
                    setListOrder(response.data);
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

        getStatus();
    }, []);

    async function getStatus() {
        await request
            .get(API.listStatus + '?type=tourorder')
            .then((response) => {
                console.log(response.data);

                if (response.status == true) {
                    setListStatus(listStatus.concat(response.data));
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

    useEffect(() => {
        if (!(user == '' || user == undefined || user == null)) {
            filterData();
            console.log('listStatus: ', listStatus);
        }
    }, [selected]);

    function filterData() {
        request
            .get(API.historyOrder + '?status=' + selected, {
                headers: { 'Content-Type': 'application/json', authorization: user.accessToken },
            })
            .then((response) => {
                console.log(response.data);

                if (response.status == true) {
                    setListOrder(response.data);
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
    const [masterDataSource, setMasterDataSource] = useState(listOrder);
    const [filteredDataSource, setFilteredDataSource] = useState(listOrder);

    return (
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginLeft: -50,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={stylesButton.btn_back}>
                        <Icon name="chevron-back" size={25} color="#021A5A" />
                    </View>
                </TouchableOpacity>
                <Text style={[stylesAllTour.title, { marginLeft: 10 }]}>Quản lý đơn đặt theo trạng thái</Text>
            </View>
            <Find
                masterDataSource={masterDataSource}
                setMasterDataSource={setMasterDataSource}
                setFilteredDataSource={setFilteredDataSource}
            />
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
                {filteredDataSource.map((item) => (
                    <CardOrder props={item} key={item.idTourOrder} />
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

export default ManageOrderFollowStatus;
