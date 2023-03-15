import React, { useEffect, useState, useContext } from 'react';
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
} from 'react-native';
import Find from '../../components/home/find';
import Header from '../../components/home/header';
import stylesHome from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import COLOR from '../../res/color';
import { CardCommingTour, CardNewTour } from '../../components/home/card';
import stylesFind from '../../components/home/find/styles';
import { AppContext } from '../../../App';
import request from '../../services/untils';
import API from '../../res/string';

function Home({ navigation }) {
    const { toursOutStanding, setToursOutStanding, toursComing, setToursComming } = useContext(AppContext);
    const [isLoading1, setIsLoading1] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    useEffect(() => {
        request
            .get(API.toursOutStanding + '?key=featured')
            .then((response) => {
                console.log(response.data);
                setIsLoading1(false);
                if (response.data.status == true) {
                    setToursOutStanding(response.data.data);
                } else {
                    Alert.alert('Thông báo!', response.data.message + '', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            })
            .catch((err) => {
                console.log(err);
            });

        request
            .get(API.toursOutStanding)
            .then((response) => {
                console.log(response.data);
                setIsLoading2(false);
                if (response.data.status == true) {
                    setToursComming(response.data.data);
                } else {
                    Alert.alert('Thông báo!', response.data.message + '', [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <ScrollView>
            <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <StatusBar translucent={false} backgroundColor={COLOR.primary} />
                <Header />
                {/* find */}
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('AllTour', { isFind: true });
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
                            navigation.navigate('AllTour', { isFind: false });
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
                    {isLoading1 ? (
                        <ActivityIndicator size="small" color={COLOR.primary} />
                    ) : (
                        <FlatList
                            horizontal
                            // style={{flex: 1}}
                            data={toursOutStanding}
                            renderItem={({ item }) => <CardNewTour props={item} navigation={navigation} />}
                            keyExtractor={(item) => item.idTour}
                        />
                    )}

                    <View style={{ marginTop: 50 }}>
                        <Text style={stylesHome.txt2}>Các tour sắp diễn ra</Text>
                    </View>
                    {isLoading2 ? (
                        <ActivityIndicator size="small" color={COLOR.primary} />
                    ) : (
                        <View>
                            {toursComing.map((item) => (
                                <CardCommingTour
                                    tour={item}
                                    key={item.idTour}
                                    navigation={navigation}
                                    screen="DetailTour"
                                />
                            ))}
                        </View>
                    )}
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

export default Home;
