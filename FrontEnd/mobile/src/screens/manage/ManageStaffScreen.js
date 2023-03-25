import React,{ useContext,useState,useEffect } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Alert,
    ActivityIndicator,
    RefreshControl,
    Image
} from 'react-native';
import Find from '../../components/home/find';
import Icon from 'react-native-vector-icons/Ionicons';
import stylesButton from '../../components/general/actionButton/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import stylesAllTour from '../allTour/style';
import CardStaff from '../../components/mange/CardStaff';
import { AppContext } from '../../../App';
import * as request from '../../services/untils';
import API from '../../res/string';
import COLOR from '../../res/color';

function ManageStaffScreen({ navigation }) {
    const { user,listStaff,setListStaff }=useContext(AppContext);
    const [isLoading,setIsLoading]=useState(true);
    const [loadingFooter,setLoadingFooter]=useState(false);
    const [refresh,setFresh]=useState(false);
    const [paging,setPaging]=useState(1);
    const [numberStaff,setNumberStaff]=useState(0);

    let isEmpty=false;

    useEffect(() => {
        getNumberStaff();
    },[]);

    useEffect(() => {
        // if (paging==1) setIsLoading(true);
        loadStaffOutStanding();
        console.log('Load');
    },[paging]);

    const loadMore=() => {
        if (Math.ceil(Number(numberStaff)/5-1)>=paging) {
            setLoadingFooter(true);
            setPaging((preState) => preState+1);
        }
    };

    const handleScroll=(event) => {
        const { layoutMeasurement,contentOffset,contentSize }=event.nativeEvent;
        const paddingToBottom=20;
        if (layoutMeasurement.height+contentOffset.y>=contentSize.height-paddingToBottom) {
            loadMore();
        }
    };

    async function loadStaffOutStanding() {
        try {
            const res=await request.get(API.listStaff,{
                headers: { 'Content-Type': 'application/json',authorization: user.accessToken },
            });
            console.log('API');
            if (res.status===true) {
                setIsLoading(false);
                setListStaff((preState) => {
                    return [...preState,...res.data];
                });
                setLoadingFooter(false);
            } else {
                isEmpty=true;
                Alert.alert('Thông báo!',res.message+'',[
                    { text: 'OK',onPress: () => console.log('OK Pressed') },
                ]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getNumberStaff() {
        try {
            const res=await request.get(API.numberStaff);
            if (res.status===true) {
                setNumberStaff(res.data[0].number);
            } else {
                Alert.alert('Thông báo!',res.message+'',[{ text: 'OK',onPress: () => console.log('OK Pressed') }]);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <SafeAreaView style={{ justifyContent: 'center',alignItems: 'center',flex: 1 }}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginLeft: -20,
                }}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={stylesButton.btn_back}>
                        <Icon name="chevron-back" size={25} color="#021A5A" />
                    </View>
                </TouchableOpacity>
                <Text style={[stylesAllTour.title,{ marginLeft: 10 }]}>Quản lý nhân viên</Text>
                <TouchableOpacity
                    style={[stylesAllTour.title,{ marginLeft: 130 }]}
                    onPress={() => {
                        navigation.navigate('EditStaff',{ type: 'add' });
                    }}
                >
                    <Icon name="add" size={25} color="#021A5A" />
                </TouchableOpacity>
            </View>
            <Find />
            <ScrollView
                style={{ height: 200 }}
                onScroll={handleScroll}
                refreshControl={
                    <RefreshControl
                        enabled={true}
                        refreshing={refresh}
                        onRefresh={() => {
                            setFresh(true);
                            setListStaff([]);
                            setIsLoading(true);
                            loadStaffOutStanding();
                            setFresh(false);
                        }}
                    />
                }
            // refreshControl={<RefreshControl refreshing={refresh} />}
            >
                {isEmpty? (
                    <View>
                        <Image
                            source={require('../manageTour/No-data-cuate.png')}
                            style={{ height: 300,width: 200,marginTop: 100,marginBottom: 0 }}
                        />
                        <Text style={{ text: 5,textAlign: 'center',marginTop: 0 }}>Chưa có dữ liệu</Text>
                    </View>
                ):(
                    isLoading? (
                        <ActivityIndicator size="small" color={COLOR.primary} />
                    ):(
                        <View>
                            {listStaff.map((item) => (
                                <CardStaff staff={item} key={item.idStaff} navigation={navigation} />
                            ))
                            }
                            {loadingFooter? <ActivityIndicator size="small" color={COLOR.primary} />:''}
                        </View>
                    )
                )}

            </ScrollView>

        </SafeAreaView>
    );
}

export default ManageStaffScreen;