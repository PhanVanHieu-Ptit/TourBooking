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
    let isEmpty=false;

    useEffect(() => {
        loadStaffOutStanding();
        console.log('Load');
    },[]);

    async function loadStaffOutStanding() {
        try {
            const res=await request.get(API.listStaff,{
                headers: { 'Content-Type': 'application/json',authorization: user.accessToken },
            });
            console.log('API');
            if (res.status===true) {
                setIsLoading(false);
                setListStaff(res.data);
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
    // useEffect(() => {
    //     request
    //         .get(API.listStaff, {
    //             headers: { 'Content-Type': 'application/json', authorization: user.accessToken },
    //         })
    //         .then((response) => {
    //             console.log(response.data);

    //             if (response.status == true) {
    //                 setListStaff(response.data);
    //             } else {
    //                 Alert.alert('Thông báo!', response.message + '', [
    //                     { text: 'OK', onPress: () => console.log('OK Pressed') },
    //                 ]);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);
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
                        listStaff.map((item) => (
                            <CardStaff staff={item} key={item.idStaff} navigation={navigation} />
                        ))
                    )
                )}

                {loadingFooter? <ActivityIndicator size="small" color={COLOR.primary} />:''}
            </ScrollView>

        </SafeAreaView>
    );
}

export default ManageStaffScreen;