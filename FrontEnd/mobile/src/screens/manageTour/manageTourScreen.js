import React,{ useContext,useEffect,useState } from 'react';
import { Image,SafeAreaView,ScrollView,Text,View,ActivityIndicator,RefreshControl } from 'react-native';
import Find from '../../components/home/find';
import stylesManage from '../manage/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import stylesButton from '../../components/general/actionButton/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import stylesAllTour from '../allTour/style';
import { CardCommingTour } from '../../components/home/card';
import { AppContext } from '../../../App';
import COLOR from '../../res/color';
import API from '../../res/string';
import * as request from '../../services/untils';

function ManageTourScreen({ navigation }) {
    const { user,listTour,setListTour }=useContext(AppContext);

    // const [masterDataSource, setMasterDataSource] = useState(listTour);

    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [numberTour, setNumberTour] = useState(0);
    const [isLoadingFooter, setLoadingFooter] = useState(false);
    const [refresh, setFresh] = useState(false);
    const [paging, setPaging] = useState(1);
    let isEmpty = false;


    const loader=() => {
        if (isLoading) {
            return <ActivityIndicator size={'small'} color={COLOR.primary} />;
        }
    };

    const loadMoreTour = () => {
        if (Math.ceil(Number(numberTour) / 5 - 1) >= paging) {
            setLoadingFooter(true);
            setPaging((preState) => preState + 1);
        }
    };

    const handleScroll = (event) => {
        const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
        // console.log(layoutMeasurement, contentOffset, contentSize);
        const paddingToBottom = 20;
        if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
            loadMoreTour();
        }
    };

    useEffect(() => {
        getNumberTour();
    }, []);

    useEffect(() => {
        setListTour([]);
        // setPaging(1);
        // if (paging == 1) setLoading(true);
        getListTour();
    }, [paging]);


    async function getListTour() {
        try {

            const response = await request.get(API.listTour + '?paging=' + paging, {});
            if (response.status == true) {
                isEmpty = false;

                setLoading(false);
                setListTour((preState) => {
                    return [...preState,...response.data];
                });
                // setMasterDataSource(response.data);
                setFilteredDataSource((preState) => {
                    return [...preState,...response.data];
                });
                setLoadingFooter(false);
            } else {
                setLoading(false);
                isEmpty=true;
                Alert.alert('Thông báo!',response.message+'',[
                    { text: 'OK',onPress: () => console.log('OK Pressed') },
                ]);
            }
        } catch (error) {
            console.log(error);
        }
    }

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

    return (

        <ScrollView
            refreshControl={
                <RefreshControl
                    enabled={true}
                    refreshing={refresh}
                    onRefresh={() => {
                        setFresh(true);
                        // setPaging(1);
                        // setFilteredDataSource([]);
                        // setListTour([]);
                        // getListTour();
                        if (paging != 1) setListTour([]);
                        if (paging != 1) setFilteredDataSource([]);
                        setPaging(1);
                        setFresh(false);
                    }}
                />
            }
        >
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

                {isEmpty ? (
                    <View>
                        <Image
                            source={require('./No-data-cuate.png')}
                            style={{ height: 300, width: 200, marginTop: 100, marginBottom: 0 }}
                        />
                        <Text style={{ text: 5, textAlign: 'center', marginTop: 0 }}>Chưa có dữ liệu</Text>
                    </View>
                ) : (
                    // <View></View>
                    <ScrollView onScroll={handleScroll} style={{marginTop: 10, height: 600}}>
                        {filteredDataSource.map((item) => (
                            <CardCommingTour tour={item} key={item.idTour} navigation={navigation} screen="EditTour" />
                        ))}
                    </ScrollView>
                )}
                {isLoadingFooter ? <ActivityIndicator size="small" color={COLOR.primary} /> : ''}
            </SafeAreaView>
        </ScrollView>
    );
}

export default ManageTourScreen;
