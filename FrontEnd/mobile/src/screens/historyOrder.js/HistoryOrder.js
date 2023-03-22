import React, { useState, useEffect, useContext } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Alert,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import stylesButton from '../../components/general/actionButton/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import stylesAllTour from '../allTour/style';
import CardOrder from '../../components/HistoryOrder.js/CardOrder';
import * as request from '../../services/untils';
import API from '../../res/string';
import { AppContext } from '../../../App';
import SelectDropdown from 'react-native-select-dropdown';
import COLOR from '../../res/color';

function HistoryOrderScreen({ navigation }) {
    const { user, historyOrder, setHistoryOrder } = useContext(AppContext);
    const [selected, setSelected] = useState('Tất cả');
    const [listStatus, setListStatus] = useState(['Tất cả']);
    const [paging, setPaging] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [loadingFooter, setLoadingFooter] = useState(false);
    const [numberOrderTour, setNumberOrderTour] = useState(0);

    useEffect(() => {
        getStatus();
        getNumberOrderTour();
    }, []);

    useEffect(() => {
        if (user == '' || user == undefined || user == null) {
            Alert.alert('Bạn chưa đăng nhập!', 'Bạn hãy đăng nhập ngay để xem lịch sử đặt của bạn.', [
                { text: 'OK', onPress: () => navigation.replace('Login') },
            ]);
        } else if (user?.role == 'customer') {
            getNumberOrderTour();
            getListHistoryOrder(true, 1);
        }
    }, [selected]);

    async function getListHistoryOrder(changeStatus = false, page = paging) {
        try {
            if (changeStatus == true) {
                setPaging(1);
                setHistoryOrder([]);
            }
            const response = await request.get(
                API.historyOrder + '?id=' + user.id + '&status=' + selected + '&paging=' + page,
                {
                    headers: { 'Content-Type': 'application/json', authorization: user.accessToken },
                },
            );
            console.log('reponse: ', response);
            if (response.status == true) {
                setHistoryOrder((preState) => {
                    return [...preState, ...response.data];
                });
            } else {
                Alert.alert('Thông báo!', response.message + '', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const loadMore = () => {
        if (Math.ceil(Number(numberOrderTour) / 5 - 1) >= paging) {
            setLoadingFooter(true);
            getListHistoryOrder(false, paging + 1);
            setPaging((preState) => preState + 1);
        }
    };

    async function getNumberOrderTour() {
        try {
            const res = await request.get(
                API.numberOrderOfCustomer + '?idCustomer=' + user.id + '&status=' + selected,
                {
                    headers: { 'Content-Type': 'application/json', authorization: user.accessToken },
                },
            );
            if (res.status === true) {
                setNumberOrderTour(res.data[0].currentNumber);
            } else {
                Alert.alert('Thông báo!', res.message + '', [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getStatus() {
        try {
            const response = await request.get(API.listStatus + '?type=tourorder&paging=' + paging);
            if (response.status == true) {
                setListStatus([...listStatus, ...response.data]);
            } else {
                Alert.alert('Thông báo!', response.message + '', [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
            }
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

    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setIsLoading(true);
        getListHistoryOrder(true, 1);

        setIsRefreshing(false);
    };

    return (
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginLeft: -100,
                }}
            >
                {/* <TouchableOpacity>
                    <View style={stylesButton.btn_back}>
                        <Icon name="chevron-back" size={25} color="#021A5A" />
                    </View>
                </TouchableOpacity> */}
                <Text style={stylesAllTour.title}>Lịch sử đặt</Text>
            </View>
            <View style={{ marginLeft: 200 }}>
                <SelectDropdown
                    data={listStatus}
                    // defaultValueByIndex={1}
                    defaultValue={'Tất cả'}
                    onSelect={(selectedItem, index) => {
                        setSelected(selectedItem);
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
                    {historyOrder.map((item) => (
                        <CardOrder item={item} key={item.idTourOrder} navigation={navigation} />
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

export default HistoryOrderScreen;
