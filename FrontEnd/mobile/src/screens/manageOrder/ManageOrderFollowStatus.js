import React, { useState, useEffect, useContext } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    Alert,
    RefreshControl,
} from 'react-native';
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
import COLOR from '../../res/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ManageOrderFollowStatus({ navigation }) {
    const { user, setUser, setHistoryOrder, setListTour, listOrder, setListOrder, setListStaff } =
        useContext(AppContext);
    const [selected, setSelected] = useState('Tất cả');
    const [listStatus, setListStatus] = useState(['Tất cả']);
    const [paging, setPaging] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingFooter, setLoadingFooter] = useState(false);
    const [numberOrderTour, setNumberOrderTour] = useState(0);

    const [filteredDataSource, setFilteredDataSource] = useState(listOrder);
    useEffect(() => {
        getStatus();
        getNumberOrderTour();
        // getListOrder();
    }, []);

    useEffect(() => {
        if (!(user == '' || user == undefined || user == null)) {
            filterData(true, 1);
            getNumberOrderTour();
        }
    }, [selected]);

    // useEffect(() => {
    //     if (!(user == '' || user == undefined || user == null)) {
    //         filterData();
    //     }
    // }, [paging]);

    function clearOldData() {
        setHistoryOrder([]);
        setListTour([]);
        setListOrder([]);
        setListStaff([]);
    }

    async function getRefreshToken() {
        try {
            const res2 = await request.post(API.refeshToken, { token: user.refreshToken });
            console.log('res2: ', res2);
            if (res2.data.status == true) {
                const newUser = {
                    id: user.id,
                    name: user.name,
                    imageUrl: user.imageUrl,
                    role: user.role,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    address: user.address,
                    accessToken: res2.data.data[0].token,
                    refreshToken: user.refreshToken,
                };
                //update user in side client
                setUser(newUser);

                //delete old user
                AsyncStorage.removeItem('user')
                    .then(() => {
                        console.log('user removed from AsyncStorage');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                console.log('user: ', newUser);
                AsyncStorage.setItem('user', JSON.stringify(newUser))
                    .then(() => console.log('Object stored successfully'))
                    .catch((error) => console.log('Error storing object: ', error));
                return true;
            } else {
                // Alert.alert('Thông báo!', res2.message + '', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
                console.log('res2.message: ', res2.data.message);
                if (res2.data.message == 'Refesh token không hợp lệ!') {
                    setUser(null);
                    clearOldData();
                    //delete old user
                    AsyncStorage.removeItem('user')
                        .then(() => {
                            console.log('user removed from AsyncStorage');
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                    navigation.replace('Login');
                }
            }
        } catch (error) {
            console.log(error);
        }
        return false;
    }

    async function getNumberOrderTour() {
        try {
            const res = await request.get(API.numberOrderOfCustomer + '?status=' + selected, {
                headers: { 'Content-Type': 'application/json', authorization: user.accessToken },
            });
            if (res.status === true) {
                setNumberOrderTour(res.data[0].number);
            } else {
                if (res.message == 'Token đã hết hạn') {
                    getRefreshToken();
                } else
                    Alert.alert('Thông báo!', res.message + '', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getStatus() {
        try {
            const response = await await request.get(API.listStatus + '?type=tourorder');
            if (response.status == true) {
                setListStatus(listStatus.concat(response.data));
            } else {
                Alert.alert('Thông báo!', response.message + '', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const loadMore = () => {
        if (Math.ceil(Number(numberOrderTour) / 5 - 1) >= paging) {
            setLoadingFooter(true);
            filterData(false, paging + 1);
            setPaging((preState) => preState + 1);
        }
    };

    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setIsLoading(true);
        filterData(true, 1);

        setIsRefreshing(false);
    };

    // async function getListOrder() {
    //     try {
    //         const response = request.get(API.historyOrder + '?paging=' + paging, {
    //             headers: { 'Content-Type': 'application/json', authorization: user.accessToken },
    //         });
    //         if (response.status == true) {
    //             setListOrder((preState) => {
    //                 return [...preState, ...response.data];
    //             });
    //             // setMasterDataSource(response.data);
    //             setFilteredDataSource((preState) => {
    //                 return [...preState, ...response.data];
    //             });
    //         } else {
    //             Alert.alert('Thông báo!', response.message + '', [
    //                 { text: 'OK', onPress: () => console.log('OK Pressed') },
    //             ]);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    async function filterData(changeStatus = false, page = paging) {
        try {
            if (changeStatus) {
                setPaging(1);
                setListOrder([]);
                setFilteredDataSource([]);
            }
            const response = await request.get(API.historyOrder + '?status=' + selected + '&paging=' + page, {
                headers: { 'Content-Type': 'application/json', authorization: user.accessToken },
            });

            if (response.status == true) {
                setListOrder((preState) => {
                    return [...preState, ...response.data];
                });
                // setMasterDataSource(response.data);
                setFilteredDataSource((preState) => {
                    return [...preState, ...response.data];
                });
            } else {
                if (response.message == 'Token đã hết hạn') {
                    getRefreshToken();
                } else
                    Alert.alert('Thông báo!', response.message + '', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
            }
            setIsLoading(false);
            setLoadingFooter(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        const paddingToBottom = 20;
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            loadMore();
        }
    };
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
                masterDataSource={listOrder}
                setMasterDataSource={setListOrder}
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

            {isLoading ? (
                <View style={{ flex: 1 }}>
                    <ActivityIndicator size="small" color={COLOR.primary} />
                </View>
            ) : (
                <ScrollView
                    onScroll={handleScroll}
                    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
                >
                    {filteredDataSource.map((item) => (
                        <CardOrder props={item} key={item.idTourOrder} />
                    ))}
                    {loadingFooter ? <ActivityIndicator size="small" color={COLOR.primary} /> : ''}
                </ScrollView>
            )}
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
