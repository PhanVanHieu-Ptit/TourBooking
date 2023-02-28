import React from 'react';
import { FlatList, SafeAreaView, ScrollView, Text, View, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import stylesButton from '../../components/general/actionButton/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import stylesAllTour from '../allTour/style';
import TopTabOrderNavigation from '../../navigation/TopTabOrderNavigation';
import COLOR from '../../res/color';

function DetailOrderFollowTour({ navigation }) {
    return (
        // <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        //     <StatusBar translucent={false} backgroundColor={COLOR.primary} />
        //     <View
        //         style={{
        //             flexDirection: 'row',
        //             justifyContent: 'flex-start',
        //             marginLeft: -50,
        //         }}
        //     >
        //         <TouchableOpacity onPress={() => navigation.goBack()}>
        //             <View style={stylesButton.btn_back}>
        //                 <Icon name="chevron-back" size={25} color="#021A5A" />
        //             </View>
        //         </TouchableOpacity>
        //         <Text style={[stylesAllTour.title, { marginLeft: 10 }]}>Quản lý đơn đặt theo tour</Text>
        //     </View>

        //     <TopTabOrderNavigation />
        // </SafeAreaView>

        <TopTabOrderNavigation />
    );
}

export default DetailOrderFollowTour;
