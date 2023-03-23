import React,{ useEffect,useState,useContext } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    Alert,
    ActivityIndicator,
    RefreshControl,
} from 'react-native';
import Find from '../../components/home/find';
import Header from '../../components/home/header';
import stylesHome from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import COLOR from '../../res/color';
import { CardCommingTour,CardNewTour } from '../../components/home/card';
import stylesFind from '../../components/home/find/styles';
import { AppContext } from '../../../App';
import * as request from '../../services/untils';
import API from '../../res/string';

function Home({ navigation }) {
    const { toursOutStanding,setToursOutStanding,toursComing,setToursComming }=useContext(AppContext);
    const [numberTourFeatured,setNumberTourFeatured]=useState(0);
    const [numberTour,setNumberTour]=useState(0);
    const [isLoading1,setIsLoading1]=useState(true);
    const [isLoading2,setIsLoading2]=useState(true);
    const [loadingFooter,setLoadingFooter]=useState(false);
    const [loadingFooter2,setLoadingFooter2]=useState(false);
    const [paging1,setPaging1]=useState(1);
    const [paging2,setPaging2]=useState(1);
    useEffect(() => {
        getNumberTour();
        getNumberTourFeatured();
    },[]);

    useEffect(() => {
        if (paging1==1) setIsLoading1(true);
        console.log();
        loadToursOutStanding('toursOutStanding: ',toursOutStanding);
    },[paging1]);

    useEffect(() => {
        if (paging2==1) setIsLoading2(true);
        loadCommingTour();
    },[paging2]);
    // useEffect(() => {
    //     loadToursOutStanding();
    //     loadCommingTour();
    // }, [isRefreshing]);

    async function getNumberTourFeatured() {
        try {
            const res=await request.get(API.numberTour+'?type=featured');
            if (res.status===true) {
                setNumberTourFeatured(res.data[0].number);
            } else {
                Alert.alert('Thông báo!',res.message+'',[{ text: 'OK',onPress: () => console.log('OK Pressed') }]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getNumberTour() {
        try {
            const res=await request.get(API.numberTour);
            if (res.status===true) {
                setNumberTour(res.data[0].number);
            } else {
                Alert.alert('Thông báo!',res.message+'',[{ text: 'OK',onPress: () => console.log('OK Pressed') }]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function loadToursOutStanding() {
        try {
            const res=await request.get(API.toursOutStanding+'?key=featured&paging='+paging1);
            setIsLoading1(false);
            if (res.status==true) {
                setToursOutStanding((preState) => {
                    return [...preState,...res.data];
                });
                setLoadingFooter(false);
            } else {
                Alert.alert('Thông báo!',res.message+'',[{ text: 'OK',onPress: () => console.log('OK Pressed') }]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const loadMore1=() => {
        if (Math.ceil(Number(numberTourFeatured)/5-1)>=paging1) {
            setLoadingFooter(true);
            setPaging1((preState) => preState+1);
        }
    };

    const loadMore2=() => {
        if (Math.ceil(Number(numberTour)/5-1)>=paging2) {
            setLoadingFooter2(true);
            setPaging2((preState) => preState+1);
        }
    };

    // const refeshData = () => {
    //     console.log('vao nha');
    //     setIsLoading1(true);
    //     setIsLoading2(true);
    //     setPaging1(1);
    //     setPaging2(1);
    //     setIsLoading1(false);
    //     setIsLoading2(false);
    // };

    const [isRefreshing,setIsRefreshing]=useState(false);


    const handleRefresh = () => {

        setIsRefreshing(true);
        if (paging1!=1) setToursOutStanding([]);
        if (paging2!=1) setToursComming([]);
        setPaging1(1);
        setPaging2(1);
        setIsRefreshing(false);
    };

    async function loadCommingTour() {
        try {
            const res=await request.get(API.toursOutStanding+'?paging='+paging2);
            setIsLoading2(false);
            if (res.status==true) {
                // setToursComming(res.data);
                setToursComming((preState) => {
                    return [...preState,...res.data];
                });
                setLoadingFooter2(false);
            } else {
                Alert.alert('Thông báo!',res.message+'',[{ text: 'OK',onPress: () => console.log('OK Pressed') }]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const renderFooter=() => {
        if (!loadingFooter) return null;
        return (
            <View style={{ paddingVertical: 20 }}>
                <ActivityIndicator size="large" />
            </View>
        );
    };

    const handleScroll=(event) => {
        const { layoutMeasurement,contentOffset,contentSize }=event.nativeEvent;
        const paddingToBottom=20;
        if (layoutMeasurement.height+contentOffset.y>=contentSize.height-paddingToBottom) {
            loadMore2();
        }
    };
    return (
        <ScrollView
            onScroll={handleScroll}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        >
            <SafeAreaView style={{ justifyContent: 'center',alignItems: 'center',flex: 1 }}>
                <StatusBar translucent={false} backgroundColor={COLOR.primary} />
                <Header />
                {/* find */}
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AllTour',{ isFind: true });
                    }}
                >
                    <View style={stylesFind.view}>
                        <View style={stylesFind.first_component}>
                            <Icon name="search" size={25} color="#021A5A" />
                            <Text>Bạn đang muốn đi đâu ...</Text>
                        </View>
                        {/* <Icon name="filter" size={25} color="#021A5A" /> */}
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('AllTour',{ isFind: false });
                        }}
                    >
                        <View style={stylesHome.txt1}>
                            <Text style={{ color: COLOR.primary }}>Xem tất cả </Text>
                            <Icon name="chevron-forward" size={15} color={COLOR.primary} style={{ marginTop: 2 }} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={stylesHome.txt2}>Các tour nổi bật</Text>
                    </View>
                    {isLoading1? (
                        <ActivityIndicator size="small" color={COLOR.primary} />
                    ):(
                        <FlatList
                            horizontal
                            style={{ flex: 1 }}
                            data={toursOutStanding}
                            renderItem={({ item }) => <CardNewTour props={item} navigation={navigation} />}
                            keyExtractor={(item) => item.idTour}
                            // onMomentumScrollEnd={loadMore1}
                            onEndReached={loadMore1}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={renderFooter}
                        />
                    )}

                    <View style={{ marginTop: 50 }}>
                        <Text style={stylesHome.txt2}>Các tour sắp diễn ra</Text>
                    </View>
                    {isLoading2? (
                        <ActivityIndicator size="small" color={COLOR.primary} />
                    ):(
                        <View>
                            {toursComing.map((item) => (
                                <CardCommingTour
                                    tour={item}
                                    key={item.idTour}
                                    navigation={navigation}
                                    screen="DetailTour"
                                />
                            ))}
                            {loadingFooter2? <ActivityIndicator size="small" color={COLOR.primary} />:''}
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default Home;
